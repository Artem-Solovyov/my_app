import React from "react";
import {actionCreatorAddPost, actionCreatorAddPostText} from "../../../redux/profile_reducer";
import MyPosts from "./MyPosts";
import {StoreContext} from "../../../StoreContext";


const MyPostsContainer = (props) => {

  return (<StoreContext.Consumer>
        {store => {
          let state = store.getState()

          let addPost = () => {
            store.dispatch(actionCreatorAddPost())
          }
          let onPostChang = (text) => {
            store.dispatch(actionCreatorAddPostText(text))
          }
          return <MyPosts updateNewPostText={onPostChang}
                          addPost={addPost}
                          posts={state.profilePage.posts}
                          newPostText={state.profilePage.newPostText}/>
        }}
      </StoreContext.Consumer>
  )

}

export default MyPostsContainer