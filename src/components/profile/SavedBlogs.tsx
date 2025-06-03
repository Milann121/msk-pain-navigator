
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { ExternalLink } from 'lucide-react';

interface FavoriteBlog {
  id: string;
  blog_id: string;
  blog_title: string;
  blog_description: string;
  blog_image_url: string;
  blog_link: string;
  is_external: boolean;
  created_at: string;
}

export const SavedBlogs = () => {
  const [favoriteBlogs, setFavoriteBlogs] = useState<FavoriteBlog[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchFavoriteBlogs = async () => {
      if (!user) {
        setLoading(false);
        return;
      }
      
      try {
        console.log('Fetching favorite blogs for user:', user.id);
        
        const { data, error } = await supabase
          .from('favorite_blogs')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });
          
        if (error) {
          console.error('Error fetching favorite blogs:', error);
          return;
        }
        
        console.log('Fetched favorite blogs:', data);
        setFavoriteBlogs(data || []);
      } catch (error) {
        console.error('Error fetching favorite blogs:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchFavoriteBlogs();

    // Listen for real-time updates
    const channel = supabase
      .channel('favorite-blogs-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'favorite_blogs',
          filter: `user_id=eq.${user?.id}`
        },
        (payload) => {
          console.log('Real-time update received for blogs:', payload);
          fetchFavoriteBlogs();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);

  const handleBlogClick = (blog: FavoriteBlog) => {
    if (blog.is_external) {
      window.open(blog.blog_link, '_blank');
    } else {
      window.location.href = blog.blog_link;
    }
  };

  if (loading) {
    return (
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Uložené články</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <p className="text-muted-foreground">Načítava sa...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Uložené články</CardTitle>
      </CardHeader>
      <CardContent>
        {favoriteBlogs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {favoriteBlogs.map((blog) => (
              <div 
                key={blog.id} 
                className="border rounded-md p-4 space-y-3 cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => handleBlogClick(blog)}
              >
                {/* Blog Image */}
                <div className="aspect-video w-full bg-gray-100 rounded overflow-hidden">
                  <img
                    src={blog.blog_image_url}
                    alt={blog.blog_title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = '/placeholder.svg';
                    }}
                  />
                </div>
                
                {/* Blog Title */}
                <h4 className="font-medium text-lg line-clamp-2">
                  {blog.blog_title}
                </h4>
                
                {/* Blog Description */}
                <p className="text-sm text-muted-foreground line-clamp-3">
                  {blog.blog_description}
                </p>
                
                {/* External Link Indicator */}
                {blog.is_external && (
                  <div className="flex items-center gap-1 text-xs text-blue-600">
                    <ExternalLink className="h-3 w-3" />
                    <span>Externý odkaz</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-muted-foreground">
              Zatiaľ nemáte žiadne uložené články. 
              Články si môžete uložiť v sekcii Blog pomocou tlačidla "Pridať medzi obľúbené".
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
