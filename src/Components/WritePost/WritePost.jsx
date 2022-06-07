import { useState } from 'react';

import './WritePost.css';

const WritePost = () => {
    const [inputValues, setInputValues] = useState({ title: "", content: "", img: "" });

    const handleChange = (e) => {
        setInputValues({ ...inputValues, [e.target.name]: e.target.value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(inputValues);
        setInputValues({ title: "", content: "", img: "" });
    }

    return (<div className="write-post">
        <div className="seb-box">
            <div className="inner-box">
                <div className="left-container">
                    <div className="picture"></div>
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