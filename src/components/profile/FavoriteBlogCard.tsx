
import React from 'react';
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

interface FavoriteBlogCardProps {
  blog: FavoriteBlog;
  onClick: (blog: FavoriteBlog) => void;
}

export const FavoriteBlogCard = ({ blog, onClick }: FavoriteBlogCardProps) => {
  return (
    <div 
      className="border rounded-md p-4 space-y-3 cursor-pointer hover:shadow-md transition-shadow"
      onClick={() => onClick(blog)}
    >
      {/* Blog Image */}
      <div className="aspect-video w-full bg-gray-100 rounded overflow-hidden relative group">
        <img
          src={blog.blog_image_url}
          alt={blog.blog_title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = '/placeholder.svg';
          }}
        />
        {/* External link overlay */}
        {blog.is_external && (
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all flex items-center justify-center">
            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <ExternalLink className="h-8 w-8 text-white" />
            </div>
          </div>
        )}
      </div>
      
      {/* Blog Title */}
      <h4 className="font-medium text-base text-center line-clamp-2">
        {blog.blog_title}
      </h4>
    </div>
  );
};
