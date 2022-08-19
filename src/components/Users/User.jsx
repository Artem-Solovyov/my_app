import React from "react";
import styles from './Users.module.css'
import userPhoto from '../../../src/assets/images/Morty1.png'
import {NavLink} from "react-router-dom";

let User = ({user, followingInProgress, unfollow, follow}) => {
  return (
      <div className={styles.container}>
        <div className={styles.item}>
          <div>
            <NavLink to={'/profile/' + user.id}>
              <img src={user.photos.small != null ? user.photos.small : userPhoto} alt="user photo"
                   className={styles.userPhoto}/>
            </NavLink>
          </div>
          <div>
            {user.followed
                ? <button disabled={followingInProgress.some(id => id === user.id)}
                          className={styles.buttonFollow} onClick={() => {
                  unfollow(user.id)
                }}>Unfollow</button>
                : <button disabled={followingInProgress.some(id => id === user.id)}
                          className={styles.buttonFollow} onClick={() => {
                  follow(user.id)
                }}>Follow</button>}
          </div>
        </div>
        <div className={styles.containerInfo}>
          <div>
            <div>{user.name}</div>
            <div>{user.status}</div>
          </div>
          <div className={styles.item}>
            <div>{'user.location.country'}</div>
            <div>{'user.location.city'}</div>
          </div>
        </div>
      </div>
  )
}


export default User