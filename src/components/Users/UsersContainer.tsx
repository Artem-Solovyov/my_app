import React from "react";
import {connect} from "react-redux";
import {
  FilterType,
  follow,
  requestUsers,
  unfollow,
} from "../../redux/users_reducer";
import Users from "./Users";
import Preloader from "../common/Preloader/Preloader";
import {
  getCurrentPage,
  getFollowingInProgress,
  getIsFetching,
  getPageSize,
  getTotalUserCount,
  getUsers, getUsersFilter
} from "../../redux/users_selectors";
import {userType} from "../../types/types";
import {AppStateType} from "../../redux/redux_store";

type mapStatePropsType = {
  users: Array<userType>,
  pageSize: number,
  totalUserCount: number,
  currentPage: number,
  isFetching: boolean,
  followingInProgress: Array<number>
  filter: FilterType
}
type mapDispatchPropsType = {
  follow: (userId: number) => void,
  unfollow: (userId: number) => void,
  getUsers: (currentPage: number, pageSize: number, filter: FilterType) => void
}
type propsType = mapStatePropsType & mapDispatchPropsType

class UsersContainer extends React.Component<propsType> {

  componentDidMount() {
    const {currentPage, pageSize, filter} = this.props
    this.props.getUsers(currentPage, pageSize, filter)
  }

  onPageChanged = (pageNumber: number) => {
    this.props.getUsers(pageNumber, this.props.pageSize, this.props.filter)
  }
  onFilterChanged = (filter: FilterType) => {
    this.props.getUsers(1, this.props.pageSize, filter)
  }

  render() {
    return <>
      {this.props.isFetching ? <Preloader/> : null}
      <Users totalItemsCount={this.props.totalUserCount}
             pageSize={this.props.pageSize}
             currentPage={this.props.currentPage}
             users={this.props.users}
             follow={this.props.follow}
             unfollow={this.props.unfollow}
             onPageChanged={this.onPageChanged}
             followingInProgress={this.props.followingInProgress}
             onFilterChanged={this.onFilterChanged}
      />
    </>
  }
}

let mapStateToProps = (state: AppStateType): mapStatePropsType => ({
  users: getUsers(state),
  pageSize: getPageSize(state),
  totalUserCount: getTotalUserCount(state),
  currentPage: getCurrentPage(state),
  isFetching: getIsFetching(state),
  followingInProgress: getFollowingInProgress(state),
  filter: getUsersFilter(state)
})

let mapDispatchToProps: mapDispatchPropsType = {
  follow,
  unfollow,
  getUsers: requestUsers,
}

//<TStateProps = {}, TDispatchProps = {}, TOwnProps = {}, State = DefaultState>
export default connect(mapStateToProps, mapDispatchToProps)(UsersContainer)