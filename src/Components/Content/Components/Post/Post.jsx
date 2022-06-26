import { useState, useRef, useEffect } from "react";
import axios from "axios";

import UploadButton from "../../../WritePost/Components/UploadImages/UploadImages";

import Toggle from 'react-styled-toggle';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import loader from '../../../../Assets/loader.svg'

import './Post.css';



const Post = ({ post, setPosts }) => {

    const [inputValues, setInputValues] = useState({ title: post.title, content: post.content, img: post.img });

    const [displayLoader, setDisplayLoader] = useState(false);

    const [loading, setLoading] = useState(false);

    const [isDisabled, setIsDisabled] = useState(true);
    const [hasEdited, setHasEdited] = useState(false);

    const inputRef = useRef(null);

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, [isDisabled])

    const handleChange = (e) => {
        setInputValues({ ...inputValues, [e.target.name]: e.target.value });
    }


    const deletePost = () => {
        axios.delete(`https://tapio-exercise-api.herokuapp.com/api/posts/${post._id}`)
            .then(() => {
                setPosts(prevposts => {
                    const newposts = prevposts.filter(p => p._id !== post._id);
                    return newposts;
                });
            })
            .catch(err => console.log(err));
    }

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

    const updatePost = () => {
        setLoading(true);
        axios.put(`https://tapio-exercise-api.herokuapp.com/api/posts/${post._id}`, {
            title: inputValues.title,
            content: inputValues.content,
            img: inputValues.img
        })
            .then(() => {
                closeLoading()
            })
            .catch(err => console.log(err));
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
            updatePost()
            setHasEdited(false)
        }
    }

    const capitalise = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    return (
        <div className="seb-box post">
            <div className={`inner-box ${!isDisabled && 'edit-mode'}`}>
                <div className="left-container">
                    <div className="picture" style={{ backgroundImage: `url(${inputValues.img})` }}>
                        {!isDisabled && <UploadButton setInfo={setInputValues} id={post._id} displayLoader={displayLoader} setDisplayLoader={setDisplayLoader} />}
                    </div>
                    <div className="tools">
                        {loading ? <div className="loader"><img src={loader} alt="loader" className="loader" /></div> : <Toggle width="40" height="25" sliderWidth={"16"} sliderHeight={"16"} translate={"16"} backgroundColorChecked={"teal"} onChange={editMode} />}
                    </div>
                </div>
                <div className="right-container">
                    <form action="" onSubmit={handleSubmit}>
                        <div className="right-top-container">
                            <input type="text" ref={inputRef} name='title' value={capitalise(inputValues.title)} disabled={isDisabled} onChange={handleChange} />
                        </div>
                        <div className="right-middle-container post-content">
                            <textarea style={{ height: "90%" }} name='content' value={inputValues.content} disabled={isDisabled} onChange={handleChange}></textarea>
                        </div>
                    </form>
                </div>
                <div className="x-container">
                    <FontAwesomeIcon icon={faXmark} onClick={deletePost} />
                </div>
            </div>
        </div>);
}

export default Post;