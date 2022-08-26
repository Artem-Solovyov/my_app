import React from "react";
import s from './MyPosts.module.css'
import Post from './Post/Post'
import {InjectedFormProps, reduxForm} from "redux-form";
import {required} from "../../../utils/validators/validators";
import {createField, GetStringKeys, Textarea} from "../../common/FormsControls/FormsControls";
import {postsType} from "../../../types/types";

type AddPostValuesType = {
  newPostText: string
}
export type StatePropsType = {
  posts: Array<postsType>
}
export type DispatchPropsType = {
  addPost: (newPostText: string) => void
}
const MyPosts: React.FC<StatePropsType & DispatchPropsType> = props => {
  console.log("Render")
  let postElements = props.posts.map(p => <Post text={p.post} key={p.id} like={p.likesCount}/>)

  let addNewPost = (values:AddPostValuesType) => {
    props.addPost(values.newPostText)
  }

  return (
      <div className={s.postsBlock}>
        {/* new post */}
        <h3>My posts </h3>
        <div>
          <NewPostFormRedux onSubmit={addNewPost}/>
          <div className={s.posts}>
            {postElements}
          </div>
        </div>
      </div>
  )
};
type PropsTypeForm = {
}
type AddPostValuesTypeKeys = GetStringKeys<AddPostValuesType>

const AddNewPostForm: React.FC<InjectedFormProps<AddPostValuesType, PropsTypeForm> & PropsTypeForm> = (props) => {
  return (
      <form onSubmit={props.handleSubmit}>
        <div>
          {createField<AddPostValuesTypeKeys>("Enter your post...", 'newPostText',
            [required], Textarea)}
        </div>
        <div>
          <button>Add post</button>
        </div>
      </form>
  )
}
const NewPostFormRedux = reduxForm<AddPostValuesType, PropsTypeForm>({form: 'ProfileAddNewPost'})(AddNewPostForm)
export default MyPosts