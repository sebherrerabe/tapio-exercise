import Header from './Components/Header/Header';
import WritePost from './Components/WritePost/WritePost';
import Content from './Components/Content/Content';


import './App.css';

function App() {
  return (
    <div className="App">
      <div className="main-container">
        <Header />
        <div className="inner-container">
          <WritePost />
          <Content />
        </div>
      </div>
    </div>
  );
}

export default App;
