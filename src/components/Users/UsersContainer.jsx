import React from "react";
import {connect} from "react-redux";
import {
  follow,
  requestUsers,
  setCurrentPage,
  setTotalUsersCount,
  toggleFollowingProgress, unfollow,
} from "../../redux/users_reducer";
import Users from "./Users";
import Preloader from "../common/Preloader/Preloader";
import {
  getCurrentPage,
  getFollowingInProgress,
  getIsFetching,
  getPageSize,
  getTotalUserCount,
  getUsers
} from "../../redux/users_selectors";

class UsersContainer extends React.Component {

  componentDidMount() {
    const {currentPage,pageSize} = this.props
    this.props.getUsers(currentPage, pageSize)
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

let mapStateToProps = (state) => ({
  users: getUsers(state),
  pageSize: getPageSize(state),
  totalUserCount: getTotalUserCount(state),
  currentPage: getCurrentPage(state),
  isFetching: getIsFetching(state),
  followingInProgress: getFollowingInProgress(state),
})

let mapDispatchToProps = {
  follow,
  unfollow,
  setCurrentPage,
  setTotalUsersCount,
  toggleFollowingProgress,
  getUsers: requestUsers,
}


export default connect(mapStateToProps, mapDispatchToProps)(UsersContainer)