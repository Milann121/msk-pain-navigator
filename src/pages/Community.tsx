import React, { useEffect, useMemo, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { Trash2, ArrowUp, ArrowDown } from "lucide-react";
import ReactionsBar, { ReactionType } from "@/components/community/ReactionsBar";
import { useIsMobile } from "@/hooks/use-mobile";

interface LeaderboardRow {
  user_id: string;
  first_name: string | null;
  company_name: string | null;
  job_type: string | null;
  exercises_completed_count: number;
  programs_completed_count: number;
  rank: number;
}

interface CommunityPost {
  id: string;
  user_id: string;
  content: string;
  week_start_date: string; // YYYY-MM-DD
  updated_at: string;
}

function getWeekStartISO(): string {
  const now = new Date();
  const day = now.getDay(); // 0 Sun .. 6 Sat
  const diff = (day + 6) % 7; // Monday start
  const monday = new Date(now);
  monday.setHours(0, 0, 0, 0);
  monday.setDate(now.getDate() - diff);
  return monday.toISOString().slice(0, 10);
}

const Community: React.FC = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [rows, setRows] = useState<LeaderboardRow[]>([]);
  const [posts, setPosts] = useState<CommunityPost[]>([]);
  const [editMode, setEditMode] = useState(false);
  const weekStart = useMemo(() => getWeekStartISO(), []);
  const isMobile = useIsMobile();

  const me = user?.id ?? null;
  const myPost = posts.find((p) => p.user_id === me);
  const [postDraft, setPostDraft] = useState("");

  // Reactions state
  const [reactionCounts, setReactionCounts] = useState<Record<string, { like: number; feel: number; angry: number }>>({});
  const [myReactions, setMyReactions] = useState<Record<string, ReactionType | null>>({});
  const [showAbout, setShowAbout] = useState(false);
  const [myRank, setMyRank] = useState<number | null>(null);
  const [rankTrend, setRankTrend] = useState<"up" | "down" | null>(null);

  // Color variants for week posts using design tokens
  const colorVariants = [
    "bg-primary/10 border-primary/20",
    "bg-secondary/10 border-secondary/20",
    "bg-accent/10 border-accent/20",
  ];
  const colorFor = (seed: number | string) => {
    const idx = typeof seed === 'number' ? seed : seed.length;
    return colorVariants[idx % colorVariants.length];
  };

  useEffect(() => {
    document.title = "Community | Pebee";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", "Share how you feel, achievements, and support the community with your weekly status.");
  }, []);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        setLoading(true);
        // Leaderboard via RPC (cast to any to avoid strict typing on new function)
        const { data: lbData, error: lbErr } = await (supabase as any).rpc(
          "get_community_leaderboard",
          { limit_param: 100, offset_param: 0 }
        );
        if (lbErr) throw lbErr;
        setRows(lbData || []);

        // Posts for current week
        const { data: postData, error: postErr } = await (supabase as any)
          .from("community_posts")
          .select("id,user_id,content,week_start_date,updated_at")
          .eq("week_start_date", weekStart)
          .order("updated_at", { ascending: false });
        if (postErr) throw postErr;
        setPosts(postData || []);

        // Initialize draft
        if (!myPost) setPostDraft("");
      } catch (e: any) {
        console.error(e);
        toast.error(e.message || "Failed loading community data");
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [weekStart]);

  useEffect(() => {
    if (myPost) setPostDraft(myPost.content);
  }, [myPost?.id]);

  const refreshPosts = async () => {
    const { data: postData, error } = await (supabase as any)
      .from("community_posts")
      .select("id,user_id,content,week_start_date,updated_at")
      .eq("week_start_date", weekStart)
      .order("updated_at", { ascending: false });
    if (!error) setPosts(postData || []);
  };

  const handlePost = async () => {
    if (!me) {
      toast.error("Please sign in to post");
      return;
    }
    const content = postDraft.trim();
    if (!content) {
      toast.error("Post cannot be empty");
      return;
    }

    const payload = { user_id: me, content, week_start_date: weekStart };
    const { error } = await (supabase as any)
      .from("community_posts")
      .upsert(payload, { onConflict: "user_id,week_start_date" });
    if (error) {
      toast.error(error.message);
      return;
    }
  toast.success("Posted");
  setEditMode(false);
  await refreshPosts();
};

const handleDelete = async () => {
  if (!me || !myPost) return;
  const { error } = await (supabase as any)
    .from("community_posts")
    .delete()
    .eq("id", myPost.id);
  if (error) {
    toast.error(error.message);
    return;
  }
  toast.success("Post deleted");
  setPostDraft("");
  setEditMode(false);
  await refreshPosts();
};

// Load reactions for current posts
  useEffect(() => {
    const load = async () => {
      const ids = posts.map((p) => p.id);
      if (!ids.length) {
        setReactionCounts({});
        setMyReactions({});
        return;
      }
      const { data, error } = await (supabase as any)
        .from("community_post_reactions")
        .select("post_id,user_id,reaction_type")
        .in("post_id", ids);
      if (error) return;
      const counts: Record<string, { like: number; feel: number; angry: number }> = {};
      const mine: Record<string, ReactionType | null> = {};
      for (const row of data as Array<{post_id:string; user_id:string; reaction_type:ReactionType}>) {
        if (!counts[row.post_id]) counts[row.post_id] = { like: 0, feel: 0, angry: 0 };
        counts[row.post_id][row.reaction_type] += 1;
        if (me && row.user_id === me) {
          mine[row.post_id] = row.reaction_type;
        }
      }
      setReactionCounts(counts);
      setMyReactions(mine);
    };
    load();
  }, [posts, me]);

  // Compute my rank and daily movement (from yesterday)
  useEffect(() => {
    if (!me) {
      setMyRank(null);
      setRankTrend(null);
      return;
    }
    const current = rows.find((r) => r.user_id === me)?.rank ?? null;
    setMyRank(current ?? null);
    try {
      const today = new Date();
      const yesterday = new Date(today);
      yesterday.setDate(today.getDate() - 1);
      const prevKey = `community_rank_${yesterday.toISOString().slice(0, 10)}`;
      const prevRankStr = typeof window !== 'undefined' ? localStorage.getItem(prevKey) : null;
      const prevRank = prevRankStr ? parseInt(prevRankStr, 10) : null;

      if (current && prevRank) {
        if (current < prevRank) setRankTrend("up");
        else if (current > prevRank) setRankTrend("down");
        else setRankTrend(null);
      } else {
        setRankTrend(null);
      }

      const todayKey = `community_rank_${today.toISOString().slice(0, 10)}`;
      if (current && typeof window !== 'undefined') localStorage.setItem(todayKey, String(current));
    } catch (e) {
      // ignore storage errors
    }
  }, [rows, me]);

  const handleReact = async (postId: string, type: ReactionType) => {
    if (!me) {
      toast.error("Please sign in to react");
      return;
    }
    const current = myReactions[postId] || null;
    if (current === type) {
      const { error } = await (supabase as any)
        .from("community_post_reactions")
        .delete()
        .eq("post_id", postId)
        .eq("user_id", me);
      if (error) { toast.error(error.message); return; }
      setMyReactions((prev) => ({ ...prev, [postId]: null }));
      setReactionCounts((prev) => {
        const base = prev[postId] || { like: 0, feel: 0, angry: 0 };
        const updated = { ...base, [type]: Math.max(0, base[type] - 1) };
        return { ...prev, [postId]: updated };
      });
    } else {
      const { error } = await (supabase as any)
        .from("community_post_reactions")
        .upsert({ post_id: postId, user_id: me, reaction_type: type }, { onConflict: "post_id,user_id" });
      if (error) { toast.error(error.message); return; }
      setReactionCounts((prev) => {
        const base = prev[postId] || { like: 0, feel: 0, angry: 0 };
        const updated = { ...base } as any;
        if (current) updated[current] = Math.max(0, updated[current] - 1);
        updated[type] = (updated[type] || 0) + 1;
        return { ...prev, [postId]: updated };
      });
      setMyReactions((prev) => ({ ...prev, [postId]: type }));
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-2xl font-semibold mb-4">Community</h1>
        <div className="mb-4 md:mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <p className="text-muted-foreground">
            Share how do you feel, your achievements or support the community with your weekly status.
          </p>
          <div className="flex items-center gap-3">
            <div className="w-20 h-20 rounded-md border bg-muted/30 flex items-center justify-center">
              <span className="text-3xl font-bold leading-none">{myRank ?? "–"}</span>
            </div>
            {rankTrend === "up" && <ArrowUp className="h-6 w-6 text-primary" aria-label="Rank up" />}
            {rankTrend === "down" && <ArrowDown className="h-6 w-6 text-destructive" aria-label="Rank down" />}
          </div>
        </div>
        <div className="mb-6">
          <Button size="sm" variant="outline" onClick={() => setShowAbout((v) => !v)}>
            About Community
          </Button>
          {showAbout && (
            <div className="mt-2 rounded-md border bg-muted/30 p-3 text-sm space-y-3">
              <div>
                <h3 className="font-medium">What is the purpose of the Community?</h3>
                <p>Healthcare is hard, to receive a good care even harder and to get what you deserve: unattainable! But we have each other, so let's support each other with posts, reactions to each others ideas and feelings. The purpose is to support each other.</p>
              </div>
              <div>
                <h3 className="font-medium">How to rank higher?</h3>
                <p>Engage with our fitness programs or your therapeutic programs. This engagement will creates records which sums together and ranks you higher!</p>
              </div>
            </div>
          )}
        </div>

        {loading ? (
          <div className="py-10">Loading...</div>
        ) : (
          <div className="space-y-6">
            <section className="rounded-lg border bg-muted/30 p-4">
              <h2 className="text-sm font-medium mb-2">This week’s post</h2>
              {!user ? (
                <p className="text-muted-foreground text-sm">Sign in to share your weekly update.</p>
              ) : (
                editMode || !myPost ? (
                  isMobile ? (
                    <div className="space-y-2">
                      <Input
                        placeholder="Share your weekly update (max 280)"
                        value={postDraft}
                        onChange={(e) => setPostDraft(e.target.value.slice(0, 280))}
                      />
                      <div className="flex items-center gap-2">
                        <Button size="sm" onClick={handlePost}>Post</Button>
                        <Button size="sm" variant="secondary" onClick={() => { setEditMode(false); setPostDraft(myPost?.content || ""); }}>Cancel</Button>
                        {myPost ? (
                          <Button size="icon" variant="ghost" onClick={handleDelete} aria-label="Delete post">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        ) : null}
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Input
                        placeholder="Share your weekly update (max 280)"
                        value={postDraft}
                        onChange={(e) => setPostDraft(e.target.value.slice(0, 280))}
                      />
                      <Button size="sm" onClick={handlePost}>Post</Button>
                      <Button size="sm" variant="secondary" onClick={() => { setEditMode(false); setPostDraft(myPost?.content || ""); }}>Cancel</Button>
                      {myPost ? (
                        <Button size="icon" variant="ghost" onClick={handleDelete} aria-label="Delete post">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      ) : null}
                    </div>
                  )
                ) : (
                  isMobile ? (
                    <div className="space-y-2">
                      <div className={`px-3 py-2 rounded-md border ${colorFor(myPost.user_id)}`}>
                        <span className="text-sm">{myPost.content}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="outline" onClick={() => setEditMode(true)}>Edit</Button>
                        <Button size="icon" variant="ghost" onClick={handleDelete} aria-label="Delete post">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <div className={`px-3 py-2 rounded-md border ${colorFor(myPost.user_id)}`}>
                        <span className="text-sm">{myPost.content}</span>
                      </div>
                      <Button size="sm" variant="outline" onClick={() => setEditMode(true)}>Edit</Button>
                      <Button size="icon" variant="ghost" onClick={handleDelete} aria-label="Delete post">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  )
                )
              )}
            </section>
            <div className="w-full overflow-x-auto">
              <Table>
              <TableCaption>This week’s community board</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-20">Rank</TableHead>
                  <TableHead>First name</TableHead>
                  <TableHead>Company</TableHead>
                  <TableHead>Job type</TableHead>
                  <TableHead className="text-right">Exercises</TableHead>
                  <TableHead className="text-right">Programs</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rows.map((r) => {
                  const post = posts.find((p) => p.user_id === r.user_id) || null;
                  return (
                    <React.Fragment key={r.user_id}>
                      <TableRow className="border-b-0">
                        <TableCell>{r.rank}</TableCell>
                        <TableCell>{r.first_name || "–"}</TableCell>
                        <TableCell>{r.company_name || "–"}</TableCell>
                        <TableCell>{r.job_type || "–"}</TableCell>
                        <TableCell className="text-right">{r.exercises_completed_count}</TableCell>
                        <TableCell className="text-right">{r.programs_completed_count}</TableCell>
                      </TableRow>
                      {post?.content ? (
                        <TableRow>
                          <TableCell colSpan={6}>
                            <div
                              className={`rounded-md border p-3 ${colorFor(r.rank)}`}
                            >
                              <p className="text-sm whitespace-pre-wrap">{post.content}</p>
                            </div>
                            <ReactionsBar
                              counts={reactionCounts[post.id] || { like: 0, feel: 0, angry: 0 }}
                              myReaction={myReactions[post.id] || null}
                              onReact={(t) => handleReact(post.id, t)}
                            />
                          </TableCell>
                        </TableRow>
                      ) : null}
                    </React.Fragment>
                  );
                })}
              </TableBody>
              </Table>
            </div>
            </div>
          )}
        </main>
      <Footer />
    </div>
  );
};

export default Community;
