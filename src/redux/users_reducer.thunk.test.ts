import {actions, follow, unfollow} from "./users_reducer";
import {usersAPI} from "../api/usersAPI";
import {APIResponseType, ResultCodeEnum} from "../api/api";

jest.mock("../api/usersAPI")
const dispatchMock = jest.fn()
const stateMock = jest.fn()
const userAPIMock = usersAPI as jest.Mocked<typeof usersAPI>
beforeEach(()=>{
  dispatchMock.mockClear()
  stateMock.mockClear()
  userAPIMock.follow.mockClear()
  userAPIMock.unfollow.mockClear()
})

const result: APIResponseType = {
  resultCode: ResultCodeEnum.Success,
  messages: [],
  data: {}
}

test('follow success follow thunk', async () => {
  userAPIMock.follow.mockReturnValue(Promise.resolve(result))
  const thunk = follow(3)

  await thunk(dispatchMock, stateMock, {})
  expect(dispatchMock).toBeCalledTimes(3)
  expect(dispatchMock).toHaveBeenNthCalledWith(1,actions.toggleFollowingProgress(true, 3))
  expect(dispatchMock).toHaveBeenNthCalledWith(2,actions.followSuccess(3))
  expect(dispatchMock).toHaveBeenNthCalledWith(3,actions.toggleFollowingProgress(false, 3))
})
test('success unfollow thunk', async () => {
  userAPIMock.unfollow.mockReturnValue(Promise.resolve(result))
  const thunk = unfollow(3)

  await thunk(dispatchMock, stateMock, {})
  expect(dispatchMock).toBeCalledTimes(3)
  expect(dispatchMock).toHaveBeenNthCalledWith(1,actions.toggleFollowingProgress(true, 3))
  expect(dispatchMock).toHaveBeenNthCalledWith(2,actions.unfollowSuccess(3))
  expect(dispatchMock).toHaveBeenNthCalledWith(3,actions.toggleFollowingProgress(false, 3))
})