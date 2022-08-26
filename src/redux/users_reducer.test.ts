import usersReducer, {actions, initialStateType} from "./users_reducer";
let state: initialStateType
beforeEach(() => {state = {
    users: [
      {id:0, name: 'Artem', followed: false,
        status: 'status 0', photos: {small: null, large: null}},
      {id:1, name: 'Artem', followed: false,
        status: 'status 1', photos: {small: null, large: null}},
      {id:2, name: 'Artem', followed: true,
        status: 'status 2', photos: {small: null, large: null}},
      {id:3, name: 'Artem', followed: true,
        status: 'status 3', photos: {small: null, large: null}},
    ] ,
      pageSize: 20,
    totalUserCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [],
  }
})
test("follow success", () => {

  const newState = usersReducer(state, actions.followSuccess(1))

expect(newState.users[0].followed).toBeFalsy()
expect(newState.users[1].followed).toBeTruthy()
})
test("unfollow success", () => {

  const newState = usersReducer(state, actions.unfollowSuccess(3))

expect(newState.users[2].followed).toBeTruthy()
expect(newState.users[3].followed).toBeFalsy()

})