import axios from 'axios';
import { useState } from 'react';

import UploadButton from './Components/UploadImages/UploadImages';

import './WritePost.css';

const WritePost = ({ getFromDb }) => {
    const [inputValues, setInputValues] = useState({ title: "", content: "", img: "" });
    const [displayLoader, setDisplayLoader] = useState(false);

    const handleChange = (e) => {
        setInputValues({ ...inputValues, [e.target.name]: e.target.value });
    }


    const sendToDB = () => {
        axios.post('https://tapio-exercise-api.herokuapp.com/api/createpost', {
            title: inputValues.title,
            content: inputValues.content,
            img: inputValues.img
        })
            .then(() => {
                getFromDb();
            })
            .catch(err => console.log(err));
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        sendToDB();
        setInputValues({ title: "", content: "", img: "" });
        setDisplayLoader(false);
    }

    return (<div className="write-post">
        <div className="seb-box">
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
                            <button className='btn' type='submit'>Post!</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>);
}

export default WritePost;