import Post from './Components/Post/Post';

import './Content.css'
import loader from '../../Assets/loader.svg'


const Content = ({ posts, setPosts, loading }) => {

    return (
        <div className="content">
            {loading ? <div className="content-loader"><img src={loader} alt="loader" className="loader" /></div> : posts.map(post => {
                return <Post key={post._id} post={post} setPosts={setPosts} />
            })}

        </div>);
}

export default Content;