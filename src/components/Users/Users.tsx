import React, {FC, useEffect} from "react";
import Paginator from "../common/Paginator/Paginator";
import User from "./User";
import {UsersSearchForm} from "./UsersSearchForm/UsersSearchForm";
import {actions, FilterType, requestUsers} from "../../redux/users_reducer";
import {
  getCurrentPage,
  getFollowingInProgress,
  getPageSize,
  getTotalUserCount,
  getUsers,
  getUsersFilter
} from "../../redux/users_selectors";
import {useDispatch, useSelector} from "react-redux";
import {AnyAction} from "redux";

type propsType = {}

export const Users: FC<propsType> = (props) => {

  const totalItemsCount = useSelector(getTotalUserCount)
  const pageSize = useSelector(getPageSize)
  const currentPage = useSelector(getCurrentPage)
  const users = useSelector(getUsers)
  const filter = useSelector(getUsersFilter)
  const followingInProgress = useSelector(getFollowingInProgress)


  const dispatch = useDispatch()

  const onPageChanged = (pageNumber: number) => {
    dispatch(requestUsers(pageNumber, pageSize, filter) as unknown as AnyAction)
  }
  const onFilterChanged = (filter: FilterType) => {
    dispatch(requestUsers(1, pageSize, filter) as unknown as AnyAction)
  }
  const unfollow = (userId: number) => {
    dispatch(actions.unfollowSuccess(userId) as unknown as AnyAction)
  }
  const follow = (userId: number) => {
    dispatch(actions.followSuccess(userId) as unknown as AnyAction)
  }
  useEffect(() => {
    dispatch(requestUsers(currentPage, pageSize, filter) as unknown as AnyAction)
  }, [])
  return (
    <div>
      <div>
        <UsersSearchForm onFilterChanged={onFilterChanged}/>
      </div>
      <Paginator currentPage={currentPage} onPageChanged={onPageChanged}
                 totalItemsCount={totalItemsCount} pageSize={pageSize}/>
      <div>
        {users.map(u => <User key={u.id} user={u} followingInProgress={followingInProgress}
                              follow={follow} unfollow={unfollow}/>
        )}
      </div>
    </div>
  )
}

export default Users