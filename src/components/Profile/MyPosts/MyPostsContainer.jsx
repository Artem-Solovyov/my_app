import React from "react";
import {actionCreatorAddPost, actionCreatorAddPostText} from "../../../redux/profile_reducer";
import MyPosts from "./MyPosts";


const MyPostsContainer = (props) => {
  let state = props.store.getState()

  let addPost = () => {
    props.store.dispatch(actionCreatorAddPost())
  }
  let onPostChang = (text) => {
    props.store.dispatch(actionCreatorAddPostText(text))
  }

  return <MyPosts updateNewPostText={onPostChang}
                  addPost={addPost}
                  posts={state.profilePage.posts}
                  newPostText={state.profilePage.newPostText}
  />

}

export default MyPostsContainer