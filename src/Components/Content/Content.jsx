import Post from './Components/Post/Post';

import './Content.css'



const Content = ({posts, getFromDb}) => {

    return (
        <div className="content">
            {posts.reverse().map(post => {
                return <Post key={post._id} post={post} getFromDb={getFromDb} />
            })}

        </div>);
}

export default Content;