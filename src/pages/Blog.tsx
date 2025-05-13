
import React from 'react';
import Header from '@/components/Header';
import { Card, CardContent, CardDescription, CardFooter, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { ExternalLink } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

// Blog data structure
interface BlogPost {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  link: string;
  isExternal: boolean;
}

// Sample blog data
const sampleBlogs: BlogPost[] = [
  {
    id: '1',
    title: 'Neurodynamické cvičenia: čo? prečo? kedy?',
    description: 'Už ste niekedy počuli o „flossingu“ nervov? Ak máte bolesť spôsobenú podráždením alebo útlakom nervu (napríklad pri ischiase alebo syndróme karpálneho tunela), nervový flossing — typ cvičenia, ktorý znižuje bolestivosť nervu — je niečo, čo by ste mali vyskúšať.',
    imageUrl: '/placeholder.svg',
    link: 'https://www.alphafyzio.sk/blog/jef2w0ea7mgks0kmvb3zqmylbhibwq',
    isExternal: true
  },
  {
    id: '2',
    title: 'Prevencia bolestí chrbtice v práci',
    description: 'Tipy na správne sedenie, ergonomické nastavenie pracoviska a cviky, ktoré môžete vykonávať počas pracovného dňa.',
    imageUrl: '/placeholder.svg',
    link: '/assessment',
    isExternal: false
  },
  {
    id: '3',
    title: 'Strečing pre zdravú chrbticu',
    description: 'Jednoduchý strečingový program, ktorý vám pomôže udržať chrbticu zdravú a flexibilnú.',
    imageUrl: '/placeholder.svg',
    link: 'https://example.com/blog/stretching',
    isExternal: true
  },
  {
    id: '4',
    title: 'Cvičenie a výživa',
    description: 'Ako správna výživa prispieva k lepšej regenerácii a posilneniu chrbtového svalstva.',
    imageUrl: '/placeholder.svg',
    link: 'https://example.com/blog/nutrition-exercise',
    isExternal: true
  },
  {
    id: '5',
    title: 'Najčastejšie chyby pri cvičení',
    description: 'Vyvarujte sa týmto bežným chybám, ktoré môžu zhoršiť bolesti chrbta namiesto ich zmiernenia.',
    imageUrl: '/placeholder.svg',
    link: 'https://example.com/blog/exercise-mistakes',
    isExternal: true
  },
  {
    id: '6',
    title: 'Rehabilitačné cvičenia po zranení',
    description: 'Odporúčané postupy a cviky pre rehabilitáciu po zranení chrbtice alebo operácii.',
    imageUrl: '/placeholder.svg',
    link: '/my-exercises',
    isExternal: false
  }
];

const BlogCard: React.FC<{ blog: BlogPost }> = ({ blog }) => {
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
      <CardFooter className="pt-0">
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
          Čítať viac
          {blog.isExternal && <ExternalLink className="ml-2 h-4 w-4" />}
        </Button>
      </CardFooter>
    </Card>
  );
};

const Blog = () => {
  const { isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 bg-gradient-to-b from-blue-50 to-white py-10 px-4 flex items-center justify-center">
          <div className="text-blue-600">Načítava sa...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1 bg-gradient-to-b from-blue-50 to-white py-10 px-4">
        <div className="container mx-auto max-w-6xl">
          <h1 className="text-3xl font-bold text-blue-800 mb-6">Blog</h1>
          
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
