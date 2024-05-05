import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { CRUD_ACTIONS, CommonUtils } from '../../../utils';
import Lightbox from 'react-image-lightbox';
import { Button, Form, FormGroup, Row, Col, Label, Input } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudArrowUp } from '@fortawesome/free-solid-svg-icons';
import { getALLCodeService } from '../../../services/userService';
import * as actions from "../../../store/actions" 
import './UserRedux.scss'
import 'react-image-lightbox/style.css';
import './TableManageUser.js'
import TableManageUser from './TableManageUser.js';
import Navigator from '../../Header/Navigator.js';

class ManageDoctor extends Component {

    constructor(props) {
        super(props);
            this.state = {
                genderArr: [],
                positionArr: [],
                roleArr: [],
                previewImgURL: [],
                isOpen: false,

                email: '',
                password: '',
                firstname: '',
                lastname: '',
                phonenumber: '',
                address: '',
                gender: '',
                position: '',
                role: '',
                avatar: '',

                action: '',
                userEditId:''
            }
    }

     async componentDidMount() {
        this.props.getGenderStart();
        this.props.getPositionStart();
        this.props.getRoleStart();
    }

    componentDidUpdate(prevProps,prevState,snapshot) {
        if(prevProps.genderRedux !== this.props.genderRedux){
            let arrGenders = this.props.genderRedux
            this.setState({
                genderArr: this.props.genderRedux,
                gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].keyMap : ''
            })
        }
        if(prevProps.positionRedux !== this.props.positionRedux){
            let arrPositions = this.props.positionRedux
            this.setState({
                positionArr: this.props.positionRedux,
                position: arrPositions && arrPositions.length > 0 ? arrPositions[0].keyMap : ''
            })
        }
        if(prevProps.roleRedux !== this.props.roleRedux){
            let arrRoles = this.props.roleRedux
            this.setState({
                roleArr: this.props.roleRedux,
                role: arrRoles && arrRoles.length > 0 ? arrRoles[0].keyMap : ''
            })
        }
        if(prevProps.listUsers !== this.props.listUsers){
            let arrGenders = this.props.genderRedux
            let arrPositions = this.props.positionRedux
            let arrRoles = this.props.roleRedux
            this.setState({
                email: '',
                password: '',
                firstname: '',
                lastname: '',
                phonenumber: '',
                address: '',
                gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].keyMap : '',
                position: arrPositions && arrPositions.length > 0 ? arrPositions[0].keyMap : '',
                role: arrRoles && arrRoles.length > 0 ? arrRoles[0].keyMap : '',
                avatar: '',
                action: CRUD_ACTIONS.CREATE,
            })
        }
    }

    handleOnChangeImage = async (event) => {
        let data = event.target.files;
        let file = data[0]
        if(file) {
            let base64 = await CommonUtils.getBase64(file)
            let objectURL = URL.createObjectURL(file)
            this.setState({
                previewImgURL: objectURL,
                avatar: base64
            })
            console.log(objectURL)
        }
    }

    openPreviewImage = () =>  {
        this.setState({
            isOpen: true
        })
    }

    handleSaveUser = () => {
        let isValid = this.checkValidateInput();
        if(isValid === false) return;
        let {action} = this.state;

        if(action === CRUD_ACTIONS.CREATE){
            this.props.createNewUser({
                email: this.state.email,
                password: this.state.password,
                firstName: this.state.firstname,
                lastName: this.state.lastname,
                phoneNumber: this.state.phonenumber,
                address: this.state.address,
                gender: this.state.gender,
                roleId:this.state.role,
                positionId: this.state.position,
                avatar: this.state.avatar
            })
        }

        if(action === CRUD_ACTIONS.EDIT){
            this.props.editUserRedux({
                id: this.state.userEditId,
                email: this.state.email,
                password: this.state.password,
                firstName: this.state.firstname,
                lastName: this.state.lastname,
                phoneNumber: this.state.phonenumber,
                address: this.state.address,
                gender: this.state.gender,
                roleId:this.state.role,
                positionId: this.state.position,
                avatar: this.state.avatar
            })
        }
    }

    checkValidateInput = () => {
        let isValid = true
        let arrCheck = ['email', 'password','firstname','lastname','phonenumber','address']
        for(let i = 0; i<arrCheck.length; i++){
            if(!this.state[arrCheck[i]]){
                isValid = false;
                alert('This input is required: ' +arrCheck[i])
                break;
            }
        }
        return {

        }
    }
    onChangeInput = (event, id) => {
        let copyState = {...this.state}
        copyState[id] = event.target.value
        this.setState({
            ...copyState
        }, () => {
            console.log("input onchange",this.state )
        })
    }

    handleEditUserParent = (user) => {
        let imageBase64 = ''
        if(user.image){
            imageBase64 = new Buffer(user.image, 'base64').toString('binary') 
        }

        this.setState({
            email: user.email,
            password: 'user.password',
            firstname: user.firstName,
            lastname: user.lastName,
            phonenumber: user.phoneNumber,
            address: user.address,
            gender: user.gender,
            role:user.roleId,
            position: user.positionId,
            avatar:'',
            previewImgURL: imageBase64,
            action: CRUD_ACTIONS.EDIT,
            userEditId: user.id
        })
    }

    render() {
        let genders = this.state.genderArr
        let positions = this.state.positionArr
        let roles = this.state.roleArr
        let {email, password,firstname,lastname,phonenumber,address,gender,position,role,avatar} = this.state;
        return (
            <div className="user-redux-container" >
                <div className='title'>Quản lý bác sĩ</div>
                <div className='user-redux'>
                    <Form style={{margin: '2% 5%'}}>
                        <Row>
                            <Col md={3}>
                            <FormGroup>
                                <Label>Email</Label>
                                <Input value={email} placeholder="Email" type="email" onChange={(e)=>{this.onChangeInput(e,"email")}} disabled={this.state.action === CRUD_ACTIONS.EDIT? true : false}/>
                            </FormGroup>
                            </Col>
                            <Col md={3}>
                            <FormGroup>
                                <Label>Mật khẩu</Label>
                                <Input value={password} placeholder="Password" type="password" onChange={(e)=>{this.onChangeInput(e,"password")}} disabled={this.state.action === CRUD_ACTIONS.EDIT? true : false} />
                            </FormGroup>
                            </Col>
                            <Col md={3}>
                            <FormGroup>
                                <Label>Tên</Label>
                                <Input value={firstname} type="text" placeholder="First Name" onChange={(e)=>{this.onChangeInput(e,"firstname")}}/>
                            </FormGroup>
                            </Col>
                            <Col md={3}>
                            <FormGroup>
                                <Label>Họ</Label>
                                <Input value={lastname} type="text" placeholder="Last Name" onChange={(e)=>{this.onChangeInput(e,"lastname")}}/>
                            </FormGroup>
                            </Col>
                        </Row>

                        <Row>
                            <Col md={6}>
                            <FormGroup>
                                <Label>Số điện thoại</Label>
                                <Input value={phonenumber} placeholder="Phone Number" type="text" onChange={(e)=>{this.onChangeInput(e,"phonenumber")}}/>
                            </FormGroup>
                            </Col>
                            <Col md={6}>
                            <FormGroup>
                                <Label>Địa chỉ</Label>
                                <Input value={address} placeholder="Address" type="text" onChange={(e)=>{this.onChangeInput(e,"address")}} />
                            </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={3}>
                                <FormGroup>
                                    <Label>Giới tính</Label>
                                    <Input value={gender} type="select"  onChange={(e)=>{this.onChangeInput(e,"gender")}}>
                                        {
                                            genders && genders.length > 0 &&
                                            genders.map((item, index)=> {
                                                return(
                                                    <option key={index} value={item.keyMap}>{item.valueVI}</option>
                                                )
                                            }) 
                                        }
                                    </Input>
                                </FormGroup>
                            </Col>
                            <Col md={3}>
                                <Label>Vai trò</Label>
                                <FormGroup>
                                    <Input value={role} type="select" onChange={(e)=>{this.onChangeInput(e,"role")}} >
                                        {
                                            roles && roles.length > 0 &&
                                            roles.map((item, index)=> {
                                                return(
                                                    <option key={index} value={item.keyMap}>{item.valueVI}</option>
                                                )
                                            }) 
                                        }
                                    </Input>
                                </FormGroup>
                            </Col>
                            <Col md={3}>
                                <Label>Chức danh</Label>
                                <FormGroup>
                                    <Input value={position} type="select" onChange={(e)=>{this.onChangeInput(e,"position")}} >
                                        {
                                            positions && positions.length > 0 &&
                                            positions.map((item, index)=> {
                                                return(
                                                    <option key={index} value={item.keyMap}>{item.valueVI}</option>
                                                )
                                            }) 
                                        }
                                    </Input>
                                </FormGroup>
                            </Col>
                            <Col md={3}>
                                <Label>Ảnh đại diện</Label>
                                <div>
                                    <Input id="previewimg" type="file" hidden
                                        onChange={(event) => this.handleOnChangeImage(event)}
                                    />
                                    <label className='label-upload' htmlFor='previewimg'><span>Tải ảnh</span>
                                    <FontAwesomeIcon className='icon-upload' icon={faCloudArrowUp} />
                                    </label>
                                    <div className='preview-image'
                                        style={{backgroundImage: `url(${this.state.previewImgURL})`}}
                                        onClick = {() => this.openPreviewImage()}
                                    ></div>
                                </div>

                            </Col>
                        </Row>
                        <Button type="button" className='btn-save'
                            onClick={() => this.handleSaveUser()}
                        >{this.state.action === CRUD_ACTIONS.EDIT ? 'Lưu thay đổi' : 'Lưu'}</Button>
                        <Row>

                        </Row>
                    </Form>

                    {this.state.isOpen === true &&
                        <Lightbox
                            mainSrc={this.state.previewImgURL}
                            onCloseRequest={() => this.setState({ isOpen: false })}
                        />
                    }
                </div>
                            <TableManageUser
                                handleEditUserParent = {this.handleEditUserParent}
                                action = {this.state.action}
                            />                
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        genderRedux: state.admin.genders,
        positionRedux: state.admin.positions,
        roleRedux: state.admin.roles,
        isLoadingGender: state.admin.isLoadingGender,
        listUsers: state.admin.users
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenderStart: () => dispatch(actions.fetchGenderStart()),
        getPositionStart: () => dispatch(actions.fetchPositionStart()),
        getRoleStart: () => dispatch(actions.fetchRoleStart()),
        createNewUser: (data) => dispatch(actions.createNewUser(data)),
        fetchUserRedux: () => dispatch(actions.fetchAllUsersStart()),
        editUserRedux: (data) => dispatch(actions.editUser(data))
        // processLogout: () => dispatch(actions.processLogout()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
