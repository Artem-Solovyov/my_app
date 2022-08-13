import React from "react";
import styles from './Users.module.css'
import userPhoto from '../../../src/assets/images/Morty1.png'
import {NavLink} from "react-router-dom";
import * as axios from "axios";


let Users = (props) => {
  let pagesCount = Math.ceil(props.totalUserCount / props.pageSize)
  let pages = []
  for (let i = 1; i <= 20; i++) { //pagesCount (вместо 20)
    pages.push(i)
  }
  return (
      <div>
        <div className={styles.number}>
          {pages.map(p => <span onClick={(e) => {props.onPageChanged(p)}}
                                className={props.currentPage === p && styles.pageSelected}> {p} </span>)}
        </div>
        {props.users.map(u =>
            <div key={u.id} className={styles.container}>
              <div className={styles.item}>
                <div>
                  <NavLink to={'/profile/' + u.id}>
                    <img src={u.photos.small != null ? u.photos.small : userPhoto} alt="user photo"
                         className={styles.userPhoto}/>
                  </NavLink>
                </div>
                <div>
                  {u.followed
                      ? <button disabled={props.followingInProgress.some(id => id === u.id)} className={styles.buttonFollow} onClick={() => {
                        props.toggleFollowingProgress(true, u.id)
                        axios.delete(`https://social-network.samuraijs.com/api/1.0/follow/${u.id}`,
                            {withCredentials: true,
                            headers: {
                              "API-KEY": "162f073c-e76a-463d-97c0-1a9822020c8c"
                            }})
                            .then(response => {
                              if (response.data.resultCode === 0) {
                                props.unfollow(u.id)
                              }
                              props.toggleFollowingProgress(false, u.id)
                            })
                        props.unfollow(u.id)
                      }}>Unfollow</button>
                      : <button disabled={props.followingInProgress.some(id => id === u.id)} className={styles.buttonFollow} onClick={() => {
                        props.toggleFollowingProgress(true, u.id)
                        axios.post(`https://social-network.samuraijs.com/api/1.0/follow/${u.id}`,
                            {},
                            {withCredentials: true,
                              headers: {
                                "API-KEY": "162f073c-e76a-463d-97c0-1a9822020c8c"
                              }})
                            .then(response => {
                              if (response.data.resultCode === 0) {
                                props.follow(u.id)
                              }
                              props.toggleFollowingProgress(false, u.id)
                            })
                      }}>Follow</button>}
                </div>
              </div>
              <div className={styles.containerInfo}>
                <div>
                  <div>{u.name}</div>
                  <div>{u.status}</div>
                </div>
                <div className={styles.item}>
                  <div>{'u.location.country'}</div>
                  <div>{'u.location.city'}</div>
                </div>
              </div>
            </div>
        )}
      </div>
  )
}


export default Users