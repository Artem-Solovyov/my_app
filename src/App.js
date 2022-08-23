import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import {
  Routes,
  Route, HashRouter, Navigate,
} from "react-router-dom";
// import DialogsContainer from "./components/Dialogs/DialogsContainer";
// import UsersContainer from "./components/Users/UsersContainer";
// import ProfileContainer, {withRouter} from "./components/Profile/ProfileContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import Login from "./components/login/Login";
import React, {Component} from "react";
import {connect, Provider} from "react-redux";
import {compose} from "redux";
import initializeApp from "./redux/app_reducer";
import Preloader from "./components/common/Preloader/Preloader";
import store from "./redux/redux_store";
import {withRouter} from "./components/Profile/ProfileContainer";

const DialogsContainer = React.lazy(() => import("./components/Dialogs/DialogsContainer"))
const ProfileContainer = React.lazy(() => import("./components/Profile/ProfileContainer"))
const UsersContainer = React.lazy(() => import("./components/Users/UsersContainer"))

class App extends Component {

  componentDidMount() {
    this.props.initializeApp()
  }


  render() {
    if (!this.props.initialised) {
      return <Preloader/>
    }
    return (
        <div className="app-wrapper">
          <HeaderContainer/>
          <Navbar/>
          <div className='app-wrapper-content'>
            <React.Suspense fallback={<div>Loading...</div>}>
              <Routes>
                <Route path="/" element={<Navigate to="/profile" />} />
                <Route path='/profile' element={<ProfileContainer/>}>
                  <Route path='/profile/:id' element={<ProfileContainer/>}/>
                </Route>
                <Route path='/dialogs/*' element={<DialogsContainer/>}/>
                {/*<Route path='/news' element={<News/>}/>*/}
                {/*<Route path='/music' element={<Music/>}/>*/}
                <Route path='/users' element={<UsersContainer/>}/>
                {/*<Route path='/settings' element={<Settings/>}/>*/}
                <Route path='/login' element={<Login/>}/>
              </Routes>
            </React.Suspense>
          </div>
        </div>
    );
  }
}

const mapStateToProps = (state) => ({initialised: state.app.initialised})

const AppContainer = compose(withRouter, connect(mapStateToProps, {initializeApp}))(App)
export const MainApp = (props) => {
  return (
      <HashRouter>
        <Provider store={store}>
          <React.StrictMode>
            <AppContainer/>
          </React.StrictMode>
        </Provider>
      </HashRouter>
  )
}
