import { useState } from "react";

import Toggle from 'react-styled-toggle';

import './Post.css';



const Post = ({ img, title, content }) => {

    const [inputValues, setInputValues] = useState({ title: "", content: "", img: "" });

    const [isDisabled, setIsDisabled] = useState(true);

    const handleChange = (e) => {
        setInputValues({ ...inputValues, [e.target.name]: e.target.value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(inputValues);
        setInputValues({ title: "", content: "", img: "" });
    }
    return (
        <div className="seb-box post">
            <div className="inner-box">
                <div className="left-container">
                    <div className="picture"></div>
                    <div className="tools">
                        <Toggle width="40" height="25" sliderWidth={"16"} sliderHeight={"16"} translate={"16"} backgroundColorChecked={"teal"} />
                    </div>
                </div>
                <div className="right-container">
                    <form action="" onSubmit={handleSubmit}>
                        <div className="right-top-container">
                            <input type="text" name='title' value={inputValues.title} disabled={isDisabled} onChange={handleChange} />
                        </div>
                        <div className="right-middle-container">
                            <textarea name='content' value={inputValues.content} disabled={isDisabled} onChange={handleChange}></textarea>
                        </div>
                        <div className="right-bottom-container">
                        </div>
                    </form>
                </div>
            </div>
        </div>);
}

export default Post;