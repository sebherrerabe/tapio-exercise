import { useState } from "react";

import UploadButton from "../../../WritePost/Components/UploadImages/UploadImages";

import Toggle from 'react-styled-toggle';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

import './Post.css';



const Post = ({ post }) => {

    const [inputValues, setInputValues] = useState({ title: post.title, content: post.content, img: post.img });

    const [displayLoader, setDisplayLoader] = useState(false);

    const [isDisabled, setIsDisabled] = useState(true);
    const [hasEdited, setHasEdited] = useState(false);

    const handleChange = (e) => {
        setInputValues({ ...inputValues, [e.target.name]: e.target.value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(inputValues);
        setInputValues({ title: "", content: "", img: "" });
    }

    const editMode = () => {
        if (!hasEdited) {
            setIsDisabled(!isDisabled);
            setHasEdited(true)
        } else {
            setIsDisabled(!isDisabled);
            // send to db
            setHasEdited(false)
        }
    }
    return (
        <div className="seb-box post">
            <div className={`inner-box ${!isDisabled && 'edit-mode'}`}>
                <div className="left-container">
                    <div className="picture" style={{ backgroundImage: `url(${inputValues.img})` }}>
                        {!isDisabled && <UploadButton setInfo={setInputValues} id={post._id} displayLoader={displayLoader} setDisplayLoader={setDisplayLoader} />}
                    </div>
                    <div className="tools">
                        <Toggle width="40" height="25" sliderWidth={"16"} sliderHeight={"16"} translate={"16"} backgroundColorChecked={"teal"} onChange={editMode} />
                        <FontAwesomeIcon icon={faXmark} />
                    </div>
                </div>
                <div className="right-container">
                    <form action="" onSubmit={handleSubmit}>
                        <div className="right-top-container">
                            <input type="text" name='title' value={inputValues.title} disabled={isDisabled} onChange={handleChange} />
                        </div>
                        <div className="right-middle-container post-content">
                            <textarea style={{height: "90%"}} name='content' value={inputValues.content} disabled={isDisabled} onChange={handleChange}></textarea>
                        </div>
                    </form>
                </div>
            </div>
        </div>);
}

export default Post;