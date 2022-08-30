import React from "react";
import {Link} from "react-router-dom";
import {Avatar, Button, Col, Menu, Row,} from "antd";
import {UserOutlined} from "@ant-design/icons";
import {Header} from "antd/es/layout/layout";
import {useDispatch, useSelector} from "react-redux";
import {selectIsAuth, selectLogin} from "../../redux/auth_selector";
import {logout} from "../../redux/auth_reducer";
import {AnyAction} from "redux";

export type StatePropsType = {}

const AppHeader: React.FC<StatePropsType> = (props) => {

  const isAuth = useSelector(selectIsAuth)
  const login = useSelector(selectLogin)

  const dispatch = useDispatch()
  const logoutCallback = () => {
    dispatch(logout() as unknown as AnyAction)
  }

  return (
    <Header className="header">
      <div className="logo"/>
      <Row>
        <Col span={18}>
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
            <Menu.Item><Link to='/profile'>Profile</Link></Menu.Item>
            <Menu.Item><Link to='/dialogs'>Messages</Link></Menu.Item>
            <Menu.Item><Link to='/users'>Users</Link></Menu.Item>
          </Menu>
        </Col>
          {isAuth
            ? <>
              <Col span={2}>
                <Avatar alt={login || ''} style={{backgroundColor: '#87d068'}} icon={<UserOutlined/>}/>
              </Col>
              <Col span={4}>
                <Button onClick={logoutCallback}>Log out</Button>
              </Col>
            </>
            : <Col span={6}>
              <Button>
                <Link to={'/login'}>Login</Link>
              </Button>
            </Col>}
      </Row>
    </Header>
  )
}

export default AppHeader