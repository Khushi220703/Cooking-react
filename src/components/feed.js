import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../style/feed.css';
import Loader from './loader';
const Feed = () => {
  const [userName, setUsername] = useState('');
  const [userId, setUserId] = useState('');
  const [title, setTitle] = useState('');
  const [video, setVideo] = useState(null);
  const [receipes, setRecipes] = useState([]);
  const [toggleLike, setToggleLike] = useState({});
  const [toggleDislike, setToggleDislike] = useState({});
  const [comment, setComment] = useState('');
  const [activeComments, setActiveComments] = useState(null);
  const [loader, setLoader] = useState(false);
  const [likeCount, setLikeCount] = useState(toggleLike.length);
  


  //sends reuquets for uploading reels on dp.
  const uploadVideo = async () => {
    setUserId(sessionStorage.getItem('userId'));
    setUsername(sessionStorage.getItem('userName'));
    console.log(userName,sessionStorage.getItem('userName'));
    
    const formData = new FormData();
    
    formData.append('userId', userId);
    formData.append('userName', userName);
    formData.append('video', video);
    formData.append('title', title);
    formData.append('like', JSON.stringify([]));
    formData.append('comment', JSON.stringify([]));// Initialize with empty array

    if (title && video) {
      setLoader(true);
      try {
        await axios.post('https://cooking-api-uwid.onrender.com/api/feed/feeds', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        setVideo(null);
        setTitle('');
      } catch (error) {
        console.error(error);
      }
      finally{
         setLoader(false);
      }
    } else {
      alert('Missing video or title!');
    }
  };

  // handle all teh requets for display all the reels.
  const getVideos = async () => {
    try {
      const response = await fetch('https://cooking-api-uwid.onrender.com/api/feed/receipess');
      const data = await response.json();
      setRecipes(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getVideos();
  }, []);

  // send requets for liking on the reel.
  const handleLike = async (id) => {
    const likeData = { id, userId };

    try {
      const response = await axios.post('https://cooking-api-uwid.onrender.com/api/feed/like', likeData);
      const updatedRecipe = response.data.recipe;

      // Update like state
      setToggleLike(prevState => {
        const newState = { ...prevState, [id]: updatedRecipe.like.includes(userId) };
        localStorage.setItem('likes', JSON.stringify(newState));
        return newState;
      });
     setLikeCount(updatedRecipe.like.length)
     
      
    } catch (error) {
      console.error(error);
    }
    finally{
      setLoader(false);
    }
  };
 
  // send requets for commenting on the reel.
  const addComment = async (id) => {
    const userName = sessionStorage.getItem('userName');
    const userId = sessionStorage.getItem('userId');

    try {
      const response = await axios.post('https://cooking-api-uwid.onrender.com/api/feed/comment', { comment, id, userName, userId });
      console.log(response.data);
      setComment('');
      // Optionally, update comments in state if needed
    } catch (error) {
      console.log(error);
    }
    finally{
      setLoader(false);
    }
  };

  // hide and show comments box.
  const toggleComments = (id) => {
    setActiveComments(prevId => (prevId === id ? null : id));
  };

  if(loader){
   return <Loader/>;
  }

  return (
    <div className='shorts'>
      <div className='upload'>
        <p>Upload recipe</p>
        <label htmlFor='title'>Title</label>
        <input type='text' name='title' id='title' placeholder='Enter video title' onChange={(e) => setTitle(e.target.value)} value={title} />
        <br />
        <input type='file' name='video' id='video' accept='video/*' onChange={(e) => setVideo(e.target.files[0])} />
        <button onClick={uploadVideo}>Upload</button>
      </div>

      {receipes.map((receipe) => (
        <div key={receipe._id} className='short'>
          <video controls autoPlay muted className='video'>
            <source src={receipe.video} type='video/mp4' />
          </video>
          <div className='name-title'>
            <p className='title'>{receipe.title}</p>
            <p className='name'>by {receipe.userName}</p>
          </div>

          <div className='like-comment'>
          <p onClick={() => handleLike(receipe._id)}>
              
                <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' className='bi bi-heart-fill' viewBox='0 0 16 16'>
                  <path d='M8 2.748-.717.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15' />
                </svg>{likeCount}
              
            </p>
            
            <p onClick={() => toggleComments(receipe._id)}>
              <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' className='bi bi-chat-left-text' viewBox='0 0 16 16'>
                <path d='M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H4.414A2 2 0 0 0 3 11.586l-2 2V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2h-2.5a.5.5 0 0 1 0 1z' />
                <path d='M3 3.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5M3 6a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 6m0 2.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5' />
              </svg>
            </p>
            <p>
              <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' className='bi bi-save2' viewBox='0 0 16 16'>
                <path d='M2 1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H9.5a1 1 0 0 0-1 1v4.5h2a.5.5 0 0 1 .354.854l-2.5 2.5a.5.5 0 0 1-.708 0l-2.5-2.5A.5.5 0 0 1 5.5 6.5h2V2a2 2 0 0 1 2-2H14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h2.5a.5.5 0 0 1 0 1z' />
              </svg>
            </p>
          </div>

          {activeComments === receipe._id && (
            <div className='comments'>
              <p>{receipe.comment.length} Comments</p>
              <div className='commentAll'>
                {receipe.comment.map((c, index) => (
                  <dl key={index}>
                    <dt>{c.userName}</dt>
                    <dd>{c.text}</dd>
                  </dl>
                ))}
              </div>
              <form className='commentForm' onSubmit={(e) => { e.preventDefault(); addComment(receipe._id); }}>
                <input type='text' name='comment' id='comment' placeholder='Add Comment' value={comment} onChange={(e) => setComment(e.target.value)} />
                <button type='submit'>Comment</button>
              </form>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Feed;
