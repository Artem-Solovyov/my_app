import React from "react";
import styles from './Users.module.css'
import * as axios from "axios";
import userPhoto from '../../../src/assets/images/Morty1.png'

class Users extends React.Component {

    componentDidMount() {
      axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`).then(response => {
        this.props.setUsers(response.data.items)
        this.props.setTotalUsersCount(response.data.totalCount)
      })
    }

    onPageChanged = (pageNumber) => {
      this.props.setCurrentPage(pageNumber)
      axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.pageSize}`)
          .then(response => {this.props.setUsers(response.data.items)})
    }

  render() {
      let pagesCount = Math.ceil(this.props.totalUserCount/this.props.pageSize)
    let pages = []
    for ( let i=1; i<= 20; i++) { //pagesCount (вместо 20)
      pages.push(i)
    }
    return <div>
      <div className={styles.number}>
        {pages.map(p => <span onClick={(e) => {this.onPageChanged(p)}}
                              className={this.props.currentPage === p && styles.pageSelected}> {p} </span>)}
      </div>
      {this.props.users.map(u =>
          <div key={u.id} className={styles.container}>
            <div className={styles.item}>
              <div>
                <img src={u.photos.small != null ? u.photos.small : userPhoto} alt="user photo"
                     className={styles.userPhoto}/>
              </div>
              <div>
                {u.followed
                    ? <button className={styles.buttonFollow} onClick={() => {
                      this.props.unfollow(u.id)
                    }}>Unfollow</button>
                    : <button className={styles.buttonFollow} onClick={() => {
                      this.props.follow(u.id)
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
  }
}

export default Users