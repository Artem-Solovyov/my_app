import React from "react";
import {connect} from "react-redux";
import {
  follow,
  setCurrentPage,
  setTotalUsersCount,
  setUsers, toggleFollowingProgress,
  toggleIsFetching,
  unfollow
} from "../../redux/users_reducer";
import Users from "./Users";
import Preloader from "../common/Preloader/Preloader";
import {usersAPI} from "../../api/api";


class UsersContainer extends React.Component {

  componentDidMount() {
    this.props.toggleIsFetching(true)
    usersAPI.getUser(this.props.currentPage, this.props.pageSize).then(data => {
          this.props.toggleIsFetching(false)
          this.props.setUsers(data.items)
          this.props.setTotalUsersCount(data.totalCount)
        })
  }

  onPageChanged = (pageNumber) => {
    this.props.setCurrentPage(pageNumber)
    this.props.toggleIsFetching(true)
    usersAPI.getUser(pageNumber, this.props.pageSize).then(data => {
          this.props.toggleIsFetching(false)
          this.props.setUsers(data.items)
        })
  }

  render() {
    return <>
      {this.props.isFetching ? <Preloader/> : null}
      <Users totalUserCount={this.props.totalUserCount}
             pageSize={this.props.pageSize}
             currentPage={this.props.currentPage}
             users={this.props.users}
             follow={this.props.follow}
             unfollow={this.props.unfollow}
             onPageChanged={this.onPageChanged}
             toggleFollowingProgress={this.props.toggleFollowingProgress}
             followingInProgress={this.props.followingInProgress}
      />
    </>
  }
}

let mapStateToProps = (state) => {
  return {
    users: state.usersPage.users,
    pageSize: state.usersPage.pageSize,
    totalUserCount: state.usersPage.totalUserCount,
    currentPage: state.usersPage.currentPage,
    isFetching: state.usersPage.isFetching,
    followingInProgress: state.usersPage.followingInProgress,
  }
}
let mapDispatchToProps = {
  follow,
  unfollow,
  setUsers,
  setCurrentPage,
  setTotalUsersCount,
  toggleIsFetching,
  toggleFollowingProgress,
}


export default connect(mapStateToProps, mapDispatchToProps)(UsersContainer)