import React from "react";
import Paginator from "../common/Paginator/Paginator";
import User from "./User";

let Users = ({currentPage, totalItemsCount, pageSize, onPageChanged, users, ...props}) => {

  return (
      <div>
        <Paginator currentPage={currentPage} onPageChanged={onPageChanged}
                   totalItemsCount={totalItemsCount} pageSize={pageSize}/>
        {users.map(u => <User key={u.id} user={u} followingInProgress={props.followingInProgress}
        follow={props.follow} unfollow={props.unfollow}/>
        )}
      </div>
  )
}

export default Users