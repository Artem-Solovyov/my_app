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
import { useSearchParams} from "react-router-dom";

type propsType = {}

export const Users: FC<propsType> = (props) => {

  const totalItemsCount = useSelector(getTotalUserCount)
  const pageSize = useSelector(getPageSize)
  const currentPage = useSelector(getCurrentPage)
  const users = useSelector(getUsers)
  const filter = useSelector(getUsersFilter)
  const followingInProgress = useSelector(getFollowingInProgress)

  const dispatch = useDispatch()
  const [searchParams, setSearchParams] = useSearchParams()

  useEffect(() => {
    let search: any = {
      term: filter.term,
      friend: filter.friend,
      page: currentPage
    }
    setSearchParams(search, {replace: true})
  }, [filter, currentPage])

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
    const result: any = {}
    // @ts-ignore
    for (const [key, value] of searchParams.entries()) {
      let values: any = +value
      if (isNaN(values)) {
        values = value
      }
      if (value === 'true') {
        values = true
      } else if (value === 'false') {
        values = false
      }
      result[key] = values
    }

    let actualPage = result.page || currentPage
    let term = result.term || filter.term

    let friend = result.friend || filter.friend
    if (result.friend === false) {
      friend = result.friend
    }

    const actualFilter = {friend, term}

    dispatch(requestUsers(actualPage, pageSize, actualFilter) as unknown as AnyAction)
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