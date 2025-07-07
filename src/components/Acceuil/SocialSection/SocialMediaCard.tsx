// src/components/Acceuil/SocialSection/SocialMediaCard.tsx
import React from 'react';
import { Facebook } from 'lucide-react';

interface Post {
  id: string;
  platform: 'facebook';
  imageUrl: string;
  caption: string;
  date: string;
  url: string;
}

interface Props {
  post: Post;
}

const SocialMediaCard: React.FC<Props> = ({ post }) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden transition-transform transform hover:-translate-y-1 hover:shadow-lg">
      <a href={post.url} target="_blank" rel="noopener noreferrer">
        <img src={post.imageUrl} alt={post.caption} className="w-full h-64 object-cover" />
      </a>
      <div className="p-4">
        <div className="flex items-center mb-2 text-blue-600">
          <Facebook className="mr-2" size={20} />
          <span className="font-semibold text-sm">Facebook</span>
        </div>
        <p className="text-gray-800 text-sm mb-2 line-clamp-3">{post.caption}</p>
        <p className="text-xs text-gray-500">Publié le {post.date}</p>
      </div>
    </div>
  );
};

export default SocialMediaCard;
