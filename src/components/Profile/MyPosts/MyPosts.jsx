import React from "react";
import s from './MyPosts.module.css'
import Post from './Post/Post'
import {Field, reduxForm} from "redux-form";
import {maxLengthCreator, required} from "../../../utils/validators/validators";
import {Textarea} from "../../common/FormsControls/FormsControls";


const MyPosts = (props) => {


  let postElements = props.posts.map(p => <Post text={p.post} key={p.id} like={p.likesCount}/>)

  let addNewPost = (values) => {
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
}
const AddNewPostForm = (props) => {
  return (
      <form onSubmit={props.handleSubmit}>
        <div>
          <Field name="newPostText" placeholder={'Enter your post...'}
                 component={Textarea}
                 validate={[required, maxLengthCreator(10)]}/>
        </div>
        <div>
          <button>Add post</button>
        </div>
      </form>
  )
}
const NewPostFormRedux = reduxForm({form: 'ProfileAddNewPost'})(AddNewPostForm)
export default MyPosts