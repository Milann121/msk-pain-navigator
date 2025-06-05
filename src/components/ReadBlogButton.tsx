
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { BookOpen, BookOpenCheck } from 'lucide-react';

interface ReadBlogButtonProps {
  blogId: string;
  blogTitle: string;
  blogLink: string;
}

export const ReadBlogButton = ({ 
  blogId, 
  blogTitle, 
  blogLink 
}: ReadBlogButtonProps) => {
  const [isRead, setIsRead] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    const checkReadStatus = async () => {
      if (!user) {
        setLoading(false);
        return;
      }
      
      try {
        console.log('Checking read status for:', { blogId, blogTitle, userId: user.id });
        
        const { data, error } = await supabase
          .from('blog_read_activity')
          .select('id')
          .eq('user_id', user.id)
          .eq('blog_id', blogId)
          .maybeSingle();
          
        if (error) {
          console.error('Error checking read status:', error);
        }
        
        setIsRead(!!data);
        console.log('Read status checked:', !!data);
      } catch (error) {
        console.error('Error checking read status:', error);
      } finally {
        setLoading(false);
      }
    };
    
    checkReadStatus();
  }, [user, blogId, blogTitle]);

  const handleToggleRead = async () => {
    console.log('Read button clicked, user:', user);
    
    if (!user) {
      toast({
        title: "Chyba",
        description: "Musíte sa prihlásiť, aby ste mohli označovať články ako prečítané.",
        variant: "destructive"
      });
      return;
    }

    if (isProcessing) {
      console.log('Already processing, ignoring click');
      return;
    }
    
    setIsProcessing(true);
    
    try {
      console.log('Processing read status toggle:', { isRead, blogId, blogTitle });
      
      if (isRead) {
        // Mark as unread - remove from read activity
        console.log('Marking blog as unread...');
        const { error } = await supabase
          .from('blog_read_activity')
          .delete()
          .eq('user_id', user.id)
          .eq('blog_id', blogId);
          
        if (error) {
          console.error('Error marking blog as unread:', error);
          throw error;
        }
        
        setIsRead(false);
        toast({
          title: "Označené ako neprečítané",
          description: "Článok bol označený ako neprečítaný.",
        });
        console.log('Successfully marked blog as unread');
      } else {
        // Mark as read - add to read activity
        console.log('Marking blog as read...');
        const { error } = await supabase
          .from('blog_read_activity')
          .insert({
            user_id: user.id,
            blog_id: blogId,
            blog_title: blogTitle,
            blog_link: blogLink
          });
          
        if (error) {
          console.error('Error marking blog as read:', error);
          throw error;
        }
        
        setIsRead(true);
        toast({
          title: "Označené ako prečítané",
          description: "Článok bol označený ako prečítaný.",
        });
        console.log('Successfully marked blog as read');
      }
    } catch (error: any) {
      console.error('Error toggling read status:', error);
      toast({
        title: "Chyba",
        description: "Nepodarilo sa zmeniť stav prečítania článku.",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  if (loading) {
    return <div className="h-10 w-48 animate-pulse bg-gray-200 rounded" />;
  }

  return (
    <Button 
      onClick={handleToggleRead}
      disabled={isProcessing}
      variant="outline"
      className="flex items-center gap-2"
    >
      {isRead ? (
        <BookOpenCheck className="h-4 w-4 text-green-500" />
      ) : (
        <BookOpen className="h-4 w-4 text-blue-500" />
      )}
      {isProcessing 
        ? 'Spracováva sa...' 
        : 'Prečítané'
      }
    </Button>
  );
};
