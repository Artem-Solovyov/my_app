import React from "react";
import {actionCreatorAddPost, actionCreatorAddPostText} from "../../../redux/profile_reducer";
import MyPosts from "./MyPosts";
import {connect} from "react-redux";


const mapStateToProps = (state) => ({
  posts: state.profilePage.posts,
  newPostText: state.profilePage.newPostText
})
const mapDispatchToProps = (dispatch) => ({
  updateNewPostText: (text) => {dispatch(actionCreatorAddPostText(text))},
  addPost: () => {dispatch(actionCreatorAddPost())},
})

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts)

export default MyPostsContainer