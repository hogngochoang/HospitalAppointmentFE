import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartLine, faUser, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

import * as actions from "../../store/actions";
import Navigator from '../../components/Navigator';
import { adminMenu, doctorMenu, staffMenu } from './menuApp';
import './Navigator.scss';
import { USER_ROLE } from '../../utils/constant';
import _ from 'lodash'
import logo from "../../assets/images/logo.svg"


class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {
            menuApp: [],
            role:''
        }
    }

    componentDidMount() {
        let {userInfo} = this.props;
        let menu = [];
        let roleDetail = ''
        if(userInfo && !_.isEmpty(userInfo)){
            let role = userInfo.roleId;
            if(role === USER_ROLE.ADMIN){
                menu = adminMenu;
                roleDetail = 'Admin'
            }
            if(role === USER_ROLE.DOCTOR){
                menu = doctorMenu;
                roleDetail = 'Bác sĩ'
            }
            if(role === USER_ROLE.STAFF){
                menu = staffMenu;
                roleDetail = 'Nhân viên'
            }
        }
        this.setState({
            menuApp: menu,
            role: roleDetail
        })
    }

    render() {
        const { processLogout, userInfo } = this.props;
        console.log(this.state.role)
        return (
            <div className="navigator-container">

                {/* thanh navigator */}
                <div className="header-tabs-container">
                    <Navigator menus={this.state.menuApp} />
                </div>
                {/* nút logout */}
                <div className="btn btn-logout" onClick={processLogout}>
                    <FontAwesomeIcon icon={faSignOutAlt} id='icon-logout'/> Đăng xuất
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        userInfo: state.user.userInfo
    };
};

const mapDispatchToProps = dispatch => {
    return {
        processLogout: () => dispatch(actions.processLogout()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
