import React from "react";
import s from './Post.module.css'

const Post = (props) => {
  return (
      <div className={s.item}>
        <img
            src="http://pngimg.com/uploads/rick_morty/rick_morty_PNG34.png"/>
        <span> {props.text} </span>
        <div>
          <button>Like {props.like} </button>
        </div>
      </div>
  )
}

export default Post