import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import {
  Routes,
  Route, HashRouter, Navigate,
} from "react-router-dom";
import HeaderContainer from "./components/Header/HeaderContainer";
import {Login} from "./components/login/Login";
import React, {Component, ComponentType} from "react";
import {connect, Provider} from "react-redux";
import {compose} from "redux";
import initializeApp from "./redux/app_reducer";
import Preloader from "./components/common/Preloader/Preloader";
import store, {AppStateType} from "./redux/redux_store";
import {withRouter} from "./components/Profile/ProfileContainer";
import {withSuspense} from "./hoc/withSuspense";
import {UsersPage} from "./components/Users/UsersContainer";

const DialogsContainer = React.lazy(() => import("./components/Dialogs/DialogsContainer"))
const ProfileContainer = React.lazy(() => import("./components/Profile/ProfileContainer"))

type StatePropsType = ReturnType<typeof mapStateToProps>
type DispatchPropsType = {
  initializeApp: () => void
}
const SuspenseDialogsContainer = withSuspense(DialogsContainer)
const SuspenseProfileContainer = withSuspense(ProfileContainer)

class App extends Component<StatePropsType & DispatchPropsType> {

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
                <Route path='/profile' element={<SuspenseProfileContainer/>}>
                  <Route path='/profile/:id' element={<SuspenseProfileContainer/>}/>
                </Route>
                <Route path='/dialogs/*' element={<SuspenseDialogsContainer/>}/>
                {/*<Route path='/news' element={<News/>}/>*/}
                {/*<Route path='/music' element={<Music/>}/>*/}
                <Route path='/users' element={<UsersPage/>}/>
                {/*<Route path='/settings' element={<Settings/>}/>*/}
                <Route path='/login' element={<Login/>}/>
              </Routes>
            </React.Suspense>
          </div>
        </div>
    );
  }
}

const mapStateToProps = (state: AppStateType) => ({initialised: state.app.initialised})

const AppContainer = compose<ComponentType>(withRouter, connect(mapStateToProps, {initializeApp}))(App)
export const MainApp: React.FC = () => {
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
