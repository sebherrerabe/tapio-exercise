import { useState, useEffect } from 'react';

import axios from 'axios';

import Header from './Components/Header/Header';
import WritePost from './Components/WritePost/WritePost';
import Content from './Components/Content/Content';


import './App.css';

function App() {
  const [posts, setPosts] = useState([]);

  const getFromDb = () => {
    axios.get('https://tapio-exercise-api.herokuapp.com/api/posts')
      .then(res => {
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
          <Content posts={posts} setPosts={setPosts} />
        </div>
      </div>
    </div>
  );
}

export default App;
