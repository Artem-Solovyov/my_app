import profileReducer, {actionCreatorAddPost, deletePost} from "./profile_reducer";

let state = {
  posts: [
    {id: 1, post: 'Hi my name Artem', likesCount: 12},
    {id: 2, post: 'Hello World!!!)', likesCount: 2},
    {id: 3, post: 'I love React.JS', likesCount: 23},
    {id: 4, post: 'Yo', likesCount: 0},
  ],
}
test('new post should be added', () => {
  let action = actionCreatorAddPost("it-kamasutra")
  let newState = profileReducer(state, action)
  expect(newState.posts.length).toBe(5)
});
test('message of new post should be correct', () => {
  let action = actionCreatorAddPost("it-kamasutra")
  let newState = profileReducer(state, action)
  expect(newState.posts[4].post).toBe("it-kamasutra")
});
test('after deleting length of messages should be decrement', () => {
  let action = deletePost(1)
  let newState = profileReducer(state, action)
  expect(newState.posts.length).toBe(3)
});


