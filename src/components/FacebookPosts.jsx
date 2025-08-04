import React from 'react';
import { useFacebookPosts } from '../hooks/useFacebookPosts';
import { ExternalLink, RefreshCw } from 'lucide-react';

const FacebookPosts = () => {
  const { posts, loading, error, refreshPosts } = useFacebookPosts();

  // Fonction pour formater la date en français
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Fonction pour tronquer le texte
  const truncateText = (text, maxLength = 150) => {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  if (loading) {
    return (
      <section className="facebook-posts">
        <div className="posts-container">
          <h2>Nos Actualités Facebook</h2>
          <p className="subtitle">
            Découvrez nos dernières interventions et conseils d'entretien
          </p>
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Chargement des publications...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="facebook-posts">
        <div className="posts-container">
          <h2>Nos Actualités Facebook</h2>
          <p className="subtitle">
            Découvrez nos dernières interventions et conseils d'entretien
          </p>
          <div className="error-container">
            <div className="error-message">
              {error}
            </div>
            <button onClick={refreshPosts} className="refresh-btn">
              <RefreshCw />
              Réessayer
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="facebook-posts">
      <div className="posts-container">
        <h2>Nos Actualités Facebook</h2>
        <p className="subtitle">
          Découvrez nos dernières interventions et conseils d'entretien
        </p>
        
        {posts.length === 0 ? (
          <div className="loading-container">
            <p>Aucune publication disponible pour le moment.</p>
            <button onClick={refreshPosts} className="refresh-btn">
              <RefreshCw />
              Actualiser
            </button>
          </div>
        ) : (
          <>
            <div className="posts-grid">
              {posts.map((post, index) => (
                <div key={index} className="post-card">
                  {post.image && (
                    <img 
                      src={post.image} 
                      alt="Publication Facebook"
                      className="post-image"
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                  )}
                  <div className="post-content">
                    <p className="post-text">
                      {truncateText(post.message || post.text || '')}
                    </p>
                    <div className="post-meta">
                      <span className="post-date">
                        {formatDate(post.created_time || post.date)}
                      </span>
                      {post.permalink_url && (
                        <a 
                          href={post.permalink_url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="post-link"
                        >
                          Voir sur Facebook
                          <ExternalLink />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div style={{ textAlign: 'center', marginTop: '2rem' }}>
              <button onClick={refreshPosts} className="refresh-btn">
                <RefreshCw />
                Actualiser les publications
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default FacebookPosts; 