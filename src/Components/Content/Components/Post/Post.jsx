const Post = ({ img, title, content }) => {
    return (
        <div className="seb-box">
            <div className="inner-box">
                <div className="left-container">
                    <div className="picture"></div>
                </div>
                <div className="right-container">
                    <form action="" onSubmit={handleSubmit}>
                        <div className="right-top-container">
                            <input type="text" name='title' value={inputValues.title} disabled onChange={handleChange} />
                        </div>
                        <div className="right-middle-container">
                            <textarea name='content' value={inputValues.content} disabled onChange={handleChange}></textarea>
                        </div>
                    </form>
                </div>
            </div>
        </div>);
}

export default Post;