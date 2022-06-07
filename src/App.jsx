import { useState, useEffect } from 'react';

import axios from 'axios';

import Header from './Components/Header/Header';
import WritePost from './Components/WritePost/WritePost';
import Content from './Components/Content/Content';

import loader from './Assets/loader.svg'


import './App.css';

function App() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  const closeLoading = () => {
    let secs = 0;
    const newInterval = setInterval(() => {
      if (secs === 1) {
        clearInterval(newInterval);
        setLoading(false);
      }
      secs++
    }, 300);
  }

  const getFromDb = () => {
    setLoading(true);
    axios.get('https://tapio-exercise-api.herokuapp.com/api/posts')
      .then(res => {
        closeLoading()
        setPosts(res.data);
      })
      .catch(err => console.log(err));
  }



  useEffect(() => {
    getFromDb();
  }, []);

  return (
    <div className="App">
      <div className="main-container">
        <Header />
        <div className="inner-container">
          <WritePost getFromDb={getFromDb} />
          <Content posts={posts} setPosts={setPosts} getFromDb={getFromDb} loading={loading}/>
        </div>
      </div>
    </div>
  );
}

export default App;
