import React from 'react';
import { Link  } from 'dva/router';
import { Menu } from 'antd';

import NavBar from '../common/NavBar.js';
import styles from './LeftMenu.less';


const LeftMenu = (props) => {
    return (
        <NavBar>
            <Menu mode="inline" style={{ height: "100vh" }} selectedKeys={[ props.location.pathname ]}>
                <Menu.Item key="/vocab">
                    <Link to="/vocab">Vocabulaire</Link>
                </Menu.Item> 
                <Menu.Item key="/audio">
                    <Link to="/audio">Audio</Link>
                </Menu.Item> 
                <Menu.Item key="/admin">
                    <Link to="/admin">Administration</Link>
                </Menu.Item> 
            </Menu>
        </NavBar>
    );
};

LeftMenu.propTypes = {

};

export default LeftMenu;
