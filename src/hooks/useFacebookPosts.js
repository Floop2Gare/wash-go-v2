import { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'https://backendtrue-5an1.vercel.app/api/facebook-posts';

export const useFacebookPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await axios.get(API_URL);
      
      if (response.data && Array.isArray(response.data)) {
        setPosts(response.data);
      } else {
        throw new Error('Format de données invalide');
      }
    } catch (err) {
      console.error('Erreur lors du chargement des posts Facebook:', err);
      setError(err.message || 'Erreur lors du chargement des posts');
    } finally {
      setLoading(false);
    }
  };

  const refreshPosts = () => {
    fetchPosts();
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return {
    posts,
    loading,
    error,
    refreshPosts
  };
}; 