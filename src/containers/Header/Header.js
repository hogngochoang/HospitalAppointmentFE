import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from "../../store/actions";
import Navigator from './Navigator';
import { adminMenu, doctorMenu, staffMenu } from './menuApp';
import './Header.scss';
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
        let image = ''
        if(userInfo.image){
            image = new Buffer(userInfo.image.data, 'base64').toString('binary') 
        }
        return (
            <>
                <div className="header-container-admin">
                    
                    <div className="logo-container">
                        <a className="logo">
                            <img src={logo} />
                        </a>
                        <div className="content">
                            <h2 className="title">Bệnh viện Da liễu Hà Nội</h2>
                            <p className="sub-title">Hanoi Dermatology Hospital</p>
                        </div>
                    </div>
                    {/* thanh navigator */}
                    {/* <div className="header-tabs-container">
                        <Navigator menus={this.state.menuApp} />
                    </div> */}
                    <div className='info-container'>
                        <img style={{backgroundImage: `url(${image})`, backgroundSize: 'cover', backgroundRepeat:'no-repeat', backgroundPosition: '50% 50%'}}></img>
                        <div className='content'>
                            <h2 className="title">{`${userInfo.lastName} ${userInfo.firstName}`}</h2>
                            <p className="sub-title">{this.state.role}</p>
                        </div>
                    </div>
                </div>                    
            </>

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
