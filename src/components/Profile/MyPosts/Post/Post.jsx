import React from "react";
import s from './Post.module.css'

const Post = (props) => {
  return (
      <div className={s.item}>
        <img
            src="https://images.pexels.com/photos/1043473/pexels-photo-1043473.jpeg?auto=compress&cs=tinysrgb&w=600"></img>
        <span> {props.text} </span>
        <div>
          <button>Like {props.like} </button>
        </div>
      </div>
  )
}

export default Post