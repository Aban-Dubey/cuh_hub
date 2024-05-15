import React, { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import MyBlogCard from './MyBlogCard';
import toast, { Toaster } from 'react-hot-toast';
import { fetchUserBlogs } from '../helper/blogHelper';

function MyBlogs() {
  const [userBlogs, setUserBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }
    const fetchData = async () => {
      try {
        const userBlogsData = await fetchUserBlogs(userId);
        setUserBlogs(userBlogsData);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  const handleUpdate = async () => {
    try {
      // Fetch user blogs after an update (e.g., deletion)
      const updatedUserBlogs = await fetchUserBlogs(userId);
      setUserBlogs(updatedUserBlogs);

      toast.success('Blog deleted successfully!', {
        duration: 3000,
      });
    } catch (error) {
      setError(error);
    }
  };

  if (loading) {
    return <h1 className='text-2xl font-bold h-screen w-screen '>is loading</h1>;
  }

  if (error) {
    return <h1 className='text-2xl font-bold h-screen w-screen '>Error fetching blogs</h1>;
  }

  return (
    <section className="mb-8 blog-background">
    <Toaster position='top-center' reverseOrder={false} />
    <header>
      <Header />
    </header>
    <div className="mx-auto container blog-container">
      <div className="main h-screen">
      <div className="flex justify-center mt-7">
    <div className="inline-block border border-gray-400 rounded-md px-2 py-1">
        <h1 className="text-4xl font-bold mb-6 text-center text-white">My Blogs</h1>
    </div>
</div>

        {userBlogs.length === 0 ? (
          <p className="text-center text-white">No blogs found for this user.</p>
        ) : (
          <div className="flex flex-wrap justify-center gap-4">
            {userBlogs.map((blog) => (
              <MyBlogCard key={blog._id} blog={blog} onUpdate={handleUpdate} />
            ))}
          </div>
        )}
      </div>
    </div>
    <footer>
      <Footer />
    </footer>
  </section>
  

  );
}

export default MyBlogs;
