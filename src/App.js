import "./App.css";
import Header from "./components/Header/Header";
import Navbar from "./components/Navbar/Navbar";
import Profile from "./components/Profile/Profile";
import {
  Routes,
  Route,
} from "react-router-dom";
import Settings from "./components/Settings/Settings";
import Music from "./components/Music/Music";
import News from "./components/News/News";
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import UsersContainer from "./components/Users/UsersContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import Login from "./components/login/Login";


const App = (props) => {
  return (
        <div className="app-wrapper">
          <HeaderContainer/>
          <Navbar/>
          <div className='app-wrapper-content'>
            <Routes>
              {/*<Route path='/profile/:userId' element={<ProfileContainer />}/>*/}
              <Route path='/profile' element={<ProfileContainer/>}>
                <Route path='/profile/:userId' element={<ProfileContainer/>}/>
              </Route>
              <Route path='/dialogs/*' element={<DialogsContainer />}/>
              <Route path='/news' element={<News/>}/>
              <Route path='/music' element={<Music/>}/>
              <Route path='/users' element={<UsersContainer/>}/>
              <Route path='/settings' element={<Settings/>}/>
              <Route path='/login' element={<Login/>}/>
            </Routes>
          </div>
        </div>
  );
};

export default App;
