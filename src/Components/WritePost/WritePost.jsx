import axios from 'axios';
import { useState } from 'react';

import UploadButton from './Components/UploadImages/UploadImages';

import './WritePost.css';
import loader from '../../Assets/loader.svg'

const WritePost = ({ getFromDb }) => {
    const [inputValues, setInputValues] = useState({ title: "", content: "", img: "" });
    const [displayLoader, setDisplayLoader] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setInputValues({ ...inputValues, [e.target.name]: e.target.value });
    }

    const closeLoading = () => {
        let secs = 0;
        const newInterval = setInterval(() => {
            if (secs === 1) {
                setLoading(false);
                clearInterval(newInterval);
                setInputValues({ title: "", content: "", img: "" });
                setDisplayLoader(false);
            }
            secs++
        }, 300);
    }

    const sendToDB = () => {
        setLoading(true);
        axios.post('https://tapio-exercise-api.herokuapp.com/api/posts', {
            title: inputValues.title,
            content: inputValues.content,
            img: inputValues.img
        })
            .then(() => {
                getFromDb();
                closeLoading();
            })
            .catch(err => console.log(err));
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        sendToDB();
    }

    return (<div className="write-post">
        <div className="seb-box" style={{ width: '98%' }}>
            <div className="inner-box">
                <div className="left-container">
                    <div className="picture" style={{ backgroundImage: `url(${inputValues.img})` }}>

                        {<UploadButton setInfo={setInputValues} id={0} displayLoader={displayLoader} setDisplayLoader={setDisplayLoader} />}
                    </div>
                </div>
                <div className="right-container">
                    <form action="" onSubmit={handleSubmit}>
                        <div className="right-top-container">
                            <input type="text" name='title' value={inputValues.title} placeholder="Write a title..." onChange={handleChange} />
                        </div>
                        <div className="right-middle-container">
                            <textarea name='content' value={inputValues.content} placeholder="Write the content..." onChange={handleChange}></textarea>
                        </div>
                        <div className="right-bottom-container">
                            {loading ? <img src={loader} alt="loader" /> : <button className='btn' type="submit">Post</button>}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>);
}

export default WritePost;