import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPen,faUserXmark } from '@fortawesome/free-solid-svg-icons';
import * as actions from "../../../store/actions" 
import './TableManageUser.scss'


class TableManageUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userRedux: [],
        }
    }

    componentDidMount() {
        this.props.fetchUserRedux()
    }
    
    componentDidUpdate(prevProps,prevState) {
        if(prevProps.listUsers !== this.props.listUsers){
            this.setState({
                usersRedux: this.props.listUsers
            })
        }
    }

    handleDeleteUser = (user) => {
        this.props.deleteUserRedux(user.id)
    }

    handleEditUser = (user) => {
        this.props.handleEditUserParent(user);
    }


    render() {
        let arrUsers = this.state.usersRedux
        let count = 0 
        return (
            <div className="user-container">
                <div className='user-table mt-3'>
                    <h2>{window.location.pathname === '/system/manage-doctor'?'Danh sách bác sĩ':'Danh sách người dùng'}</h2>
                    <table id="users">
                        <tr>
                            <th id='no'>STT</th>
                            <th id='email' style={{paddingLeft: '7%', textAlign:'left'}}>Email</th>
                            <th style={{paddingLeft: '4.5%',textAlign:'left'}}>Họ</th>
                            <th style={{paddingLeft: '4.5%', textAlign:'left'}}>Tên</th>
                            <th id='gender'>Giới tính</th>
                            <th id='phone'>Số điện thoại</th>
                            <th id='role'>Role</th>
                            <th>Actions</th>
                        </tr>
                        { 
                          arrUsers && arrUsers.length > 0 &&
                          arrUsers.map((item, index) => {
                            if(item.roleId === 'R2' && window.location.pathname === '/system/manage-doctor' ){
                                count++
                                return(
                                    <tr key={index}>
                                        <td id='no'>{count}</td>
                                            <td id='email' style={{paddingLeft: '15px'}}>{item.email}</td>
                                            <td style={{paddingLeft: '4%', width:'10%'}}>{item.lastName}</td>
                                            <td style={{paddingLeft: '4%'}}>{item.firstName}</td>
                                            <td id='gender'>{item.gender}</td>
                                            <td id='phone'>{item.phoneNumber}</td>
                                            <td id='role'>{item.roleId === 'R2'? 'Bác sĩ' : (item.roleId === 'R4'? 'Nhân viên' : 'Admin')}</td>

                                        <td className='btn-user' style={{paddingLeft: '5px'}}>
                                            <button type='button' className='btn-edit' onClick={() => {this.handleEditUser(item)}}><FontAwesomeIcon icon={faUserPen} /></button>
                                            <button type='button' className='btn-delete' onClick={() => {this.handleDeleteUser(item)}}><FontAwesomeIcon icon={faUserXmark} /></button>
                                        </td>
                                    </tr>
                                )                              
                            }
                            if(window.location.pathname !== '/system/manage-doctor' ){
                                return(
                                    <tr key={index}>
                                        <td id='no'>{index+1}</td>
                                        <td id='email' style={{paddingLeft: '15px'}}>{item.email}</td>
                                        <td style={{paddingLeft: '4%', width:'10%'}}>{item.lastName}</td>
                                        <td style={{paddingLeft: '4%'}}>{item.firstName}</td>
                                        <td id='gender'>{item.gender}</td>
                                        <td id='phone'>{item.phoneNumber}</td>
                                        <td id='role'>{item.roleId === 'R2'? 'Bác sĩ' : (item.roleId === 'R4'? 'Nhân viên' : 'Admin')}</td>

                                        <td className='btn-user' style={{paddingLeft: '5px'}}>
                                            <button type='button' className='btn-edit' onClick={() => {this.handleEditUser(item)}}><FontAwesomeIcon icon={faUserPen} /></button>
                                            <button type='button' className='btn-delete' onClick={() => {this.handleDeleteUser(item)}}><FontAwesomeIcon icon={faUserXmark} /></button>
                                        </td>
                                    </tr>
                                )
                            }
                            
                          })

                        }

                    </table>
                </div>
            </div>
  
        );
    }

}

const mapStateToProps = state => {
    return {
        listUsers: state.admin.users,
        systemMenuPath: state.app.systemMenuPath,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchUserRedux: () => dispatch(actions.fetchAllUsersStart()),
        deleteUserRedux: (id) => dispatch(actions.deleteUser(id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);
