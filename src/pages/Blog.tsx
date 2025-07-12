
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import { Card, CardContent, CardDescription, CardFooter, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { ExternalLink, ArrowLeft } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { FavoriteBlogButton } from '@/components/FavoriteBlogButton';
import { ReadBlogButton } from '@/components/ReadBlogButton';

// Blog data structure
interface BlogPost {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  link: string;
  isExternal: boolean;
}

const BlogCard: React.FC<{ blog: BlogPost }> = ({ blog }) => {
  const { t } = useTranslation();
  return (
    <Card className="h-full flex flex-col">
      <AspectRatio ratio={16/9} className="bg-muted">
        <img 
          src={blog.imageUrl} 
          alt={blog.title}
          className="rounded-t-lg object-cover w-full h-full"
        />
      </AspectRatio>
      <CardContent className="pt-6 flex-grow">
        <CardTitle className="text-xl mb-2">{blog.title}</CardTitle>
        <CardDescription className="text-sm">{blog.description}</CardDescription>
      </CardContent>
      <CardFooter className="pt-0 flex flex-col gap-2">
        <Button
          className="w-full"
          variant="outline"
          onClick={() => {
            if (blog.isExternal) {
              window.open(blog.link, '_blank');
            } else {
              window.location.href = blog.link;
            }
          }}
        >
          {t('blog.readMore')}
          {blog.isExternal && <ExternalLink className="ml-2 h-4 w-4" />}
        </Button>
        
        <div className="flex gap-2 w-full">
          <div className="flex-1">
            <FavoriteBlogButton
              blogId={blog.id}
              blogTitle={blog.title}
              blogDescription={blog.description}
              blogImageUrl={blog.imageUrl}
              blogLink={blog.link}
              isExternal={blog.isExternal}
            />
          </div>
          
          <div className="flex-1">
            <ReadBlogButton
              blogId={blog.id}
              blogTitle={blog.title}
              blogLink={blog.link}
            />
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

const Blog = () => {
  const { isLoading } = useAuth();
  const { t } = useTranslation();

  const sampleBlogs: BlogPost[] = [
    {
      id: '1',
      title: t('blog.posts.1.title'),
      description: t('blog.posts.1.description'),
      imageUrl: 'https://images.squarespace-cdn.com/content/v1/60b7c37ac6320a77cc078aaf/1716065389319-CSTLSEJRJFAUQDN3VF3O/dwexs.png?format=2500w',
      link: 'https://www.alphafyzio.sk/blog/jef2w0ea7mgks0kmvb3zqmylbhibwq',
      isExternal: true
    },
    {
      id: '2',
      title: t('blog.posts.2.title'),
      description: t('blog.posts.2.description'),
      imageUrl: '/placeholder.svg',
      link: '/assessment',
      isExternal: false
    },
    {
      id: '3',
      title: t('blog.posts.3.title'),
      description: t('blog.posts.3.description'),
      imageUrl: '/placeholder.svg',
      link: 'https://example.com/blog/stretching',
      isExternal: true
    },
    {
      id: '4',
      title: t('blog.posts.4.title'),
      description: t('blog.posts.4.description'),
      imageUrl: '/placeholder.svg',
      link: 'https://example.com/blog/nutrition-exercise',
      isExternal: true
    },
    {
      id: '5',
      title: t('blog.posts.5.title'),
      description: t('blog.posts.5.description'),
      imageUrl: '/placeholder.svg',
      link: 'https://example.com/blog/exercise-mistakes',
      isExternal: true
    },
    {
      id: '6',
      title: t('blog.posts.6.title'),
      description: t('blog.posts.6.description'),
      imageUrl: '/placeholder.svg',
      link: '/my-exercises',
      isExternal: false
    }
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 bg-gradient-to-b from-blue-50 to-white py-10 px-4 flex items-center justify-center">
          <div className="text-blue-600">{t('loading')}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1 bg-gradient-to-b from-blue-50 to-white py-10 px-2 md:px-4">
        <div className="container mx-auto w-full max-w-full md:max-w-4xl px-2 md:px-0">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold text-blue-800">{t('blog.title')}</h1>
            <Link to="/my-exercises" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
              <ArrowLeft className="w-4 h-4" />
              {t('common.back')}
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sampleBlogs.map((blog) => (
              <BlogCard key={blog.id} blog={blog} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
