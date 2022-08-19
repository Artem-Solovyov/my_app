import React from "react";
import Paginator from "../common/Paginator/Paginator";
import User from "./User";

let Users = ({currentPage, totalUserCount, pageSize, onPageChanged, users, ...props}) => {
  return (
      <div>
        <Paginator currentPage={currentPage} onPageChanged={onPageChanged}
                   totalUserCount={totalUserCount} pageSize={pageSize}/>
        {users.map(u => <User key={u.id} user={u} followingInProgress={props.followingInProgress}
        follow={props.follow} unfollow={props.unfollow}/>
        )}
      </div>
  )
}

export default Users