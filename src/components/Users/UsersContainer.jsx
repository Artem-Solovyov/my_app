import React from "react";
import {connect} from "react-redux";
import {
  follow,
  getUsers,
  setCurrentPage,
  setTotalUsersCount,
  toggleFollowingProgress, unfollow,
} from "../../redux/users_reducer";
import Users from "./Users";
import Preloader from "../common/Preloader/Preloader";


class UsersContainer extends React.Component {

  componentDidMount() {
    this.props.getUsers(this.props.currentPage, this.props.pageSize)
  }

  onPageChanged = (pageNumber) => {
    this.props.getUsers(pageNumber, this.props.pageSize)
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
  setCurrentPage,
  setTotalUsersCount,
  toggleFollowingProgress,
  getUsers,
}


export default connect(mapStateToProps, mapDispatchToProps)(UsersContainer)