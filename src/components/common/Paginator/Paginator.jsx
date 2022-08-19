import React from "react";
import styles from './Paginator.module.css'

let Paginator = (props) => {
  let pagesCount = Math.ceil(props.totalUserCount / props.pageSize)
  let pages = []
  for (let i = 1; i <= 20; i++) { //pagesCount (вместо 20)
    pages.push(i)
  }
  return (
      <div className={styles.number}>
        {pages.map(p => <span onClick={(e) => {
          props.onPageChanged(p)
        }}
                              className={props.currentPage === p && styles.pageSelected}> {p} </span>)}
      </div>
  )
}


export default Paginator