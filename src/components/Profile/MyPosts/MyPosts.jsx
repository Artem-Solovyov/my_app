import React from "react";
import s from './MyPosts.module.css'
import Post from './Post/Post'



const MyPosts = (props) => {


  let postElements = props.posts.map(p => <Post text={p.post} like={p.likesCount}/>)

  let onAddPost = () => {
    props.addPost()
  }
  let onPostChang = (event) => {
    let text = event.target.value;
    props.updateNewPostText(text)
  }

  return (
      <div className={s.postsBlock}>
        {/* new post */}
        <h3>My posts </h3>
        <div>
          <div>
            <textarea name="" onChange={onPostChang}
                      cols="100" rows="2"
                      value={props.newPostText}/>
          </div>
          <div>
            <button onClick={onAddPost}>Add post</button>
          </div>
          <div className={s.posts}>
            {postElements}
          </div>
        </div>
      </div>
  )
}

export default MyPosts