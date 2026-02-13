import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { db, Post, Employee } from '../utils/db';
import Modal from '../components/Modal';

const SocialFeed: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newPostContent, setNewPostContent] = useState('');
  const [newPostType, setNewPostType] = useState('General');
  const navigate = useNavigate();

  useEffect(() => {
    setPosts(db.posts.getAll());
    setEmployees(db.employees.getAll());
  }, [isModalOpen]);

  const handlePost = (e: React.FormEvent) => {
      e.preventDefault();
      // Simulate current user
      const currentUser = { id: 'me', name: 'Me', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD3ArRu2R3vywdS3aeEMrtEo_BQqowScYWF2cMLzPVK9wD3ocT7QOvHecAjd4IwJL4RE8UDbRXsTtozhYvprTPIQmS3weD2-UUOGpTs-EbRV8fDVFL3zDx6W6NEYonrl5_aaNloMH8LjHUBE2jWzynFrTkLISryqMVxrDJorkJLsPgsies5FfPosn-jNe4GNy8_3knEAH4SDITLc83FjH-wNy33MD3U1MfRsS860P-44MfjT7BLtKP6Q8WxJDvHg2E8Rwp-BjzRjX12' };
      
      db.posts.add({
          authorId: currentUser.id,
          authorName: currentUser.name,
          authorAvatar: currentUser.avatar,
          content: newPostContent,
          type: newPostType as any
      });
      setIsModalOpen(false);
      setNewPostContent('');
  };

  const handleMentionClick = (mention: string) => {
      const name = mention.substring(1).replace(/([A-Z])/g, ' $1').trim(); // Basic un-camelCase if needed, or exact match
      // Try to find by partial name since mentions might be @AlexRivera matching "Alex Rivera"
      const emp = employees.find(e => e.name.replace(/\s/g, '').toLowerCase() === mention.substring(1).toLowerCase());
      
      if (emp) {
          navigate(`/employees/${emp.id}`);
      } else {
          // If not found, just go to list or do nothing
          navigate('/employees');
      }
  };

  const renderContentWithMentions = (content: string) => {
      const parts = content.split(/(@\w+)/g);
      return parts.map((part, index) => {
          if (part.startsWith('@')) {
              return (
                <span 
                    key={index} 
                    onClick={() => handleMentionClick(part)}
                    className="text-primary font-bold cursor-pointer hover:underline bg-primary/10 px-1 rounded transition-colors"
                >
                    {part}
                </span>
              );
          }
          return part;
      });
  };

  return (
    <div className="flex flex-col h-full bg-[#f8fbfc]">
       <header className="h-16 flex items-center justify-between px-6 border-b border-[#e7f1f3] bg-white sticky top-0 z-10">
         <h2 className="text-xl font-bold tracking-tight text-text-main">Company Feed</h2>
         <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary-hover text-white text-sm font-bold rounded-lg shadow-sm transition-all">
            <span className="material-symbols-outlined text-[20px]">edit_note</span>
            Create Post
        </button>
      </header>

      <div className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="max-w-2xl mx-auto space-y-6">
              {posts.map(post => (
                  <div key={post.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                      <div className="flex items-center gap-3 mb-4">
                          <img src={post.authorAvatar} alt={post.authorName} className="size-10 rounded-full" />
                          <div>
                              <div className="flex items-center gap-2">
                                <h3 className="font-bold text-text-main text-sm">{post.authorName}</h3>
                                {post.type === 'Announcement' && <span className="bg-blue-100 text-blue-700 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">Announcement</span>}
                                {post.type === 'Celebration' && <span className="bg-pink-100 text-pink-700 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">Celebration</span>}
                              </div>
                              <p className="text-xs text-gray-400">{post.timestamp}</p>
                          </div>
                      </div>
                      <p className="text-text-main text-sm leading-relaxed whitespace-pre-wrap">
                          {renderContentWithMentions(post.content)}
                      </p>
                      
                      <div className="flex items-center gap-6 mt-6 border-t border-gray-50 pt-4">
                          <button className="flex items-center gap-2 text-gray-400 hover:text-red-500 transition-colors text-sm font-bold">
                              <span className="material-symbols-outlined text-[18px]">favorite</span>
                              {post.likes}
                          </button>
                          <button className="flex items-center gap-2 text-gray-400 hover:text-primary transition-colors text-sm font-bold">
                              <span className="material-symbols-outlined text-[18px]">chat_bubble</span>
                              {post.comments}
                          </button>
                      </div>
                  </div>
              ))}
          </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Create Post">
          <form onSubmit={handlePost} className="space-y-4">
              <div>
                  <textarea required className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-3 resize-none" rows={4} placeholder="What's happening? Use @name to mention colleagues." value={newPostContent} onChange={e => setNewPostContent(e.target.value)} />
              </div>
              <div className="flex items-center justify-between">
                   <select className="rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm" value={newPostType} onChange={e => setNewPostType(e.target.value)}>
                       <option value="General">General</option>
                       <option value="Announcement">Announcement</option>
                       <option value="Celebration">Celebration</option>
                   </select>
                   <button type="submit" className="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-hover">Post</button>
              </div>
          </form>
      </Modal>
    </div>
  );
};

export default SocialFeed;