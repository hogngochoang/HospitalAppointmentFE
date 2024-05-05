import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import { Button, Form, FormGroup, Row, Col, Label, Input } from 'reactstrap';
import DatePicker from '../../../components/Input/DatePicker';
import moment from 'moment';
import {toast} from 'react-toastify'
import _ from 'lodash'
import Select from 'react-select'
import * as actions from '../../../store/actions'
import './ManagePatient.scss'
import { dateFormat } from '../../../utils';
import { getAllExaminedPatientForDoctor } from '../../../services/userService';
import ModalDetailPatient from './ModalDetailPatient';


class ExaminedPatient extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentDate: moment(new Date()).startOf('day').valueOf(),
            dataPatient: [],
            isOpenModalDetailPatient: false,
            dataPatientModal: {}
        }
    }

    async componentDidMount() {
        this.getDataPatient()
    }

    getDataPatient = async() => {
        let {user} = this.props;
        let formattedDate = new Date(this.props.date).getTime() 
        let formattedDate1 = new Date(this.state.currentDate).getTime() 
        let res = await getAllExaminedPatientForDoctor({
            doctorId: user.id,
            date: window.location.pathname === '/doctor/examined-patient'?formattedDate1:formattedDate
        })
        if(res && res.errCode === 0){
            this.setState({
                dataPatient: res.data
            })
        }
    }

    async componentDidUpdate(prevProps, prevState) {
        if(this.props.date !== prevProps.date){
            let {user} = this.props;
            let formattedDate = new Date(this.props.date).getTime() 
            let res = await getAllExaminedPatientForDoctor({
                doctorId: user.id,
                date: formattedDate
            })
            if(res && res.errCode === 0){
                this.setState({
                    dataPatient: res.data
                })
            } 
        }
    }

    handleOnChangeDatePicker = (date) => {
        this.setState({
            currentDate : date[0]
        },async () => {
            await this.getDataPatient()    
        })
    }

    toggleDetailPatientModal = () => {
        this.setState({
            isOpenModalDetailPatient: !this.state.isOpenModalDetailPatient
        })
    }

    handleViewDetail = async (item) => {
        let data = {
            doctorId:item.doctorId,
            patientId: item.patientId,
            date: item.date,
            timeType:item.timeType,
            email: item.patientDataS3.email,
            fullname: item.patientDataS3.fullName,
            gender: item.patientDataS3.genderData.valueVI,
            phone: item.patientDataS3.phoneNumber,
            description: item.description
        }
        this.setState({
            isOpenModalDetailPatient: true,
            dataPatientModal: data
        })
    }


    render() {
        let {dataPatient} = this.state
        return (
            <div className='manage-examined-patient'>
                <div className='title'>Danh sách bệnh nhân đã khám</div>
                <Form className='list-patient'>
                    {
                        window.location.pathname === '/doctor/examined-patient'?
                            <Row>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label>Chọn ngày</Label>
                                        <DatePicker 
                                            onChange = {this.handleOnChangeDatePicker}
                                            className='form-control'
                                            value = {this.state.currentDate[0]}
                                            // minDate = {new Date()}
                                        />
                                    </FormGroup>
                                </Col>
                            </Row>:
                            <Row hidden></Row>
                    }
                    <Row>
                        <table id="patients">
                            <tr>
                                <th>STT</th>
                                <th>Ngày</th>
                                <th>Thời gian</th>
                                <th>Họ và tên</th>
                                <th>Ngày sinh</th>
                                <th>Giới tính</th>
                                <th>Số điện thoại</th>
                                <th>Actions</th>
                            </tr>
                            { dataPatient && dataPatient.length > 0 &&
                            dataPatient.map((item, index) => {
                                let formatDate = moment.unix(+item.date/1000).format('DD/MM/YYYY')
                                return(
                                    <tr key={index}>
                                        <td id='no'>{index+1}</td>
                                        <td style={{paddingLeft: '2%'}}>{formatDate}</td>
                                        <td style={{paddingLeft: '2%', width:'12%'}}>{item.timeTypeDataPatientS3.valueVI}</td>
                                        <td style={{paddingLeft: '2.5%', width:'20%'}}>{item.patientDataS3.fullName}</td>
                                        <td style={{paddingLeft: '2.5%', width:'12%'}}>{item.patientDataS3.birthday.split("-").reverse().join("-")}</td>
                                        <td id='gender'>{item.patientDataS3.genderData.valueVI}</td>
                                        <td id='phone'>{item.patientDataS3.phoneNumber}</td>
                                        <td className='btn-booking' style={{paddingLeft: '10%'}}>
                                            <button type='button' className='btn-detail' onClick={() => {this.handleViewDetail(item)}}><strong>Xem thông tin</strong></button>
                                        </td>
                                    </tr>
                                )
                            })
                            }
                        </table>
                    </Row>
                </Form>
                <ModalDetailPatient 
                    isOpen = {this.state.isOpenModalDetailPatient} 
                    toggleDetailPatientModal = {this.toggleDetailPatientModal}
                    dataPatientModal = {this.state.dataPatientModal}
                    getDataPatient = {this.getDataPatient}
                />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        user: state.user.userInfo
    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ExaminedPatient);
