import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import {
  Routes,
  Route,
} from "react-router-dom";
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import UsersContainer from "./components/Users/UsersContainer";
import ProfileContainer, {withRouter} from "./components/Profile/ProfileContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import Login from "./components/login/Login";
import {Component} from "react";
import {connect} from "react-redux";
import {compose} from "redux";
import initializeApp from "./redux/app_reducer";
import Preloader from "./components/common/Preloader/Preloader";


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
            <Routes>
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
          </div>
        </div>
    );
  }
}

const mapStateToProps = (state) => ({initialised: state.app.initialised})

export default compose(withRouter, connect(mapStateToProps, {initializeApp}))(App)
