import React, {FC} from "react";
import Paginator from "../common/Paginator/Paginator";
import User from "./User";
import {userType} from "../../types/types";
import {UsersSearchForm} from "./UsersSearchForm/UsersSearchForm";
import {FilterType} from "../../redux/users_reducer";

type propsType = {
  totalItemsCount: number
  pageSize: number
  currentPage: number
  onPageChanged: (pageNumber: number) => void
  onFilterChanged: (filter: FilterType) => void
  users: Array<userType>
  followingInProgress: Array<number>
  unfollow: (userId: number) => void
  follow: (userId: number) => void
}
let Users: FC<propsType> = ({currentPage, totalItemsCount,
                              pageSize, onPageChanged,
                              users, ...props}) => {

  return (
    <div>
      <div>
        <UsersSearchForm onFilterChanged={props.onFilterChanged}/>
      </div>
      <Paginator currentPage={currentPage} onPageChanged={onPageChanged}
                 totalItemsCount={totalItemsCount} pageSize={pageSize}/>

      <div>
        {users.map(u => <User key={u.id} user={u} followingInProgress={props.followingInProgress}
                              follow={props.follow} unfollow={props.unfollow}/>
        )}
      </div>
    </div>
  )
}

export default Users