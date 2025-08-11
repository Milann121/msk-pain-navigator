import React, { useEffect, useMemo, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { Trash2 } from "lucide-react";

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

  const me = user?.id ?? null;
  const myPost = posts.find((p) => p.user_id === me);
  const [postDraft, setPostDraft] = useState("");

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
    document.title = "Community Leaderboard | Pebee";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", "Community leaderboard across companies with weekly posts");
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

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-2xl font-semibold mb-4">Community</h1>
        <p className="text-muted-foreground mb-6">Global leaderboard across all companies. Share your weekly status with everyone.</p>

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
                  <TableHead>Week post</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rows.map((r) => {
                  const post = posts.find((p) => p.user_id === r.user_id) || null;
                  return (
                    <React.Fragment key={r.user_id}>
                      <TableRow>
                        <TableCell>{r.rank}</TableCell>
                        <TableCell>{r.first_name || "–"}</TableCell>
                        <TableCell>{r.company_name || "–"}</TableCell>
                        <TableCell>{r.job_type || "–"}</TableCell>
                        <TableCell className="text-right">{r.exercises_completed_count}</TableCell>
                        <TableCell className="text-right">{r.programs_completed_count}</TableCell>
                        <TableCell>—</TableCell>
                      </TableRow>
                      {post?.content ? (
                        <TableRow>
                          <TableCell colSpan={7}>
                            <div className={`rounded-md border p-3 ${colorFor(r.rank)}`}>
                              <p className="text-sm whitespace-pre-wrap">{post.content}</p>
                            </div>
                          </TableCell>
                        </TableRow>
                      ) : null}
                    </React.Fragment>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Community;
