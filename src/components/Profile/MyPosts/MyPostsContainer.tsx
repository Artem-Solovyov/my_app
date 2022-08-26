import React from "react";
import {actions} from "../../../redux/profile_reducer";
import MyPosts, {DispatchPropsType, StatePropsType} from "./MyPosts";
import {connect} from "react-redux";
import {AppStateType} from "../../../redux/redux_store";


const mapStateToProps = (state: AppStateType) => ({
  posts: state.profilePage.posts
})
const mapDispatchToProps = {
  addPost: actions.actionCreatorAddPost
}

const MyPostsContainer = connect<StatePropsType, DispatchPropsType, {}, AppStateType>(mapStateToProps, mapDispatchToProps)(MyPosts)

export default MyPostsContainer