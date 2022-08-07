import React from "react";
import s from './MyPosts.module.css'
import Post from './Post/Post'
import {actionCreatorAddPost, actionCreatorAddPostText} from "../../../redux/state";



const MyPosts = (props) => {


  let postElements = props.state.posts.map(p => <Post text={p.post} like={p.likesCount}/>)

  let addPost = () => {
    props.dispatch(actionCreatorAddPost())
  }
  let onPostChang = (event) => {
    let text = event.target.value;
    props.dispatch(actionCreatorAddPostText(text))
  }

  return (
      <div className={s.postsBlock}>
        {/* new post */}
        <h3>My posts </h3>
        <div>
          <div>
            <textarea name="" onChange={onPostChang}
                      cols="100" rows="2"
                      value={props.state.newPostText}/>
          </div>
          <div>
            <button onClick={addPost}>Add post</button>
          </div>
          <div className={s.posts}>
            {postElements}
          </div>
        </div>
      </div>
  )
}

export default MyPosts