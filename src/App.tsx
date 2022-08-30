import "./App.css";
import {LaptopOutlined, UserOutlined} from '@ant-design/icons';
import {Breadcrumb, Layout, Menu} from 'antd';
import {HashRouter, Link, Navigate, Route, Routes,} from "react-router-dom";
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
import 'antd/dist/antd.css';
import SubMenu from "antd/es/menu/SubMenu";
import AppHeader from "./components/Header/Header";

const DialogsContainer = React.lazy(() => import("./components/Dialogs/DialogsContainer"))
const ProfileContainer = React.lazy(() => import("./components/Profile/ProfileContainer"))

type StatePropsType = ReturnType<typeof mapStateToProps>
type DispatchPropsType = {
  initializeApp: () => void
}
const SuspenseDialogsContainer = withSuspense(DialogsContainer)
const SuspenseProfileContainer = withSuspense(ProfileContainer)

const {Content, Footer, Sider} = Layout;

class App extends Component<StatePropsType & DispatchPropsType> {

  componentDidMount() {
    this.props.initializeApp()
  }

  render() {
    if (!this.props.initialised) {
      return <Preloader/>
    }
    return (
      <Layout>
        <AppHeader/>
        <Content style={{padding: '0 50px'}}>
          <Breadcrumb style={{margin: '16px 0'}}>
            {/*<Breadcrumb.Item><Link to='/profile'>Profile</Link></Breadcrumb.Item>*/}
            {/*<Breadcrumb.Item><Link to='/dialogs' >Messages</Link></Breadcrumb.Item>*/}
            {/*<Breadcrumb.Item><Link to='/users'>Users</Link></Breadcrumb.Item>*/}
          </Breadcrumb>
          <Layout className="site-layout-background" style={{padding: '24px 0'}}>
            <Sider className="site-layout-background" width={200}>
              <Menu
                mode="inline"
                // defaultSelectedKeys={['1']}
                // defaultOpenKeys={['sub1']}
                style={{height: '100%'}}
              >
                <SubMenu key={"sub1"} icon={<UserOutlined/>} title={"My Profile"}>
                  <Menu.Item key={"1"}> <Link to='/profile'>Profile</Link></Menu.Item>
                  <Menu.Item key={"2"}><Link to='/dialogs'>Messages</Link></Menu.Item>
                </SubMenu>
                <SubMenu key={"sub2"} icon={<LaptopOutlined/>} title={"Developers"}>
                  <Menu.Item key={"1"}><Link to='/users'>Users</Link></Menu.Item>
                </SubMenu>
              </Menu>
            </Sider>
            <Content style={{padding: '0 24px', minHeight: 280}}>
              <React.Suspense fallback={<div>Loading...</div>}>
                <Routes>
                  <Route path="/" element={<Navigate to="/profile"/>}/>
                  <Route path='/profile' element={<SuspenseProfileContainer/>}>
                    <Route path='/profile/:id' element={<SuspenseProfileContainer/>}/>
                  </Route>
                  <Route path='/dialogs/*' element={<SuspenseDialogsContainer/>}/>
                  <Route path='/users' element={<UsersPage/>}/>
                  <Route path='/login' element={<Login/>}/>
                </Routes>
              </React.Suspense>
            </Content>
          </Layout>
        </Content>
        <Footer style={{textAlign: 'center'}}>Social Network ©2022 Created by SoloWayIT</Footer>
      </Layout>
    )
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
