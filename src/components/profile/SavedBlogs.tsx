import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { BlogNavigation } from './BlogNavigation';
import { FavoriteBlogCard } from './FavoriteBlogCard';
import { BlogPaginationIndicator } from './BlogPaginationIndicator';

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
  const [currentIndex, setCurrentIndex] = useState(0);
  const { user } = useAuth();

  const blogsPerPage = 3;

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

  const canScrollLeft = currentIndex > 0;
  const canScrollRight = currentIndex + blogsPerPage < favoriteBlogs.length;

  const scrollLeft = () => {
    if (canScrollLeft) {
      setCurrentIndex(Math.max(0, currentIndex - blogsPerPage));
    }
  };

  const scrollRight = () => {
    if (canScrollRight) {
      setCurrentIndex(Math.min(favoriteBlogs.length - blogsPerPage, currentIndex + blogsPerPage));
    }
  };

  const handleBlogClick = (blog: FavoriteBlog) => {
    if (blog.is_external) {
      window.open(blog.blog_link, '_blank');
    } else {
      window.location.href = blog.blog_link;
    }
  };

  const visibleBlogs = favoriteBlogs.slice(currentIndex, currentIndex + blogsPerPage);
  const totalPages = Math.ceil(favoriteBlogs.length / blogsPerPage);
  const currentPage = Math.floor(currentIndex / blogsPerPage);

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
          <div className="relative">
            {/* Navigation arrows */}
            {favoriteBlogs.length > blogsPerPage && (
              <BlogNavigation
                canScrollLeft={canScrollLeft}
                canScrollRight={canScrollRight}
                onScrollLeft={scrollLeft}
                onScrollRight={scrollRight}
              />
            )}
            
            {/* Blogs grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mx-8">
              {visibleBlogs.map((blog) => (
                <FavoriteBlogCard 
                  key={blog.id} 
                  blog={blog}
                  onClick={handleBlogClick}
                />
              ))}
            </div>
            
            {/* Page indicator */}
            {favoriteBlogs.length > blogsPerPage && (
              <BlogPaginationIndicator
                totalPages={totalPages}
                currentPage={currentPage}
              />
            )}
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
