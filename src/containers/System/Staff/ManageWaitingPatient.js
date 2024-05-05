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
import './ManageWaitingPatient.scss'
import { dateFormat } from '../../../utils';
import { getAllConfirmedPatientForStaff, updateBookingStatusConfirmed } from '../../../services/userService';
import ConfirmedPatient from './ConfirmedPatient';


class ManageWaitingPatient extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentDate: moment(new Date()).startOf('day').valueOf(),
            arrPatient: [],
            arrConfirmedPatient: [],
        }
    }

    async componentDidMount() {
        this.getDataConfirmedPatient()
        this.props.getAllPatients()
    }

    getDataConfirmedPatient = async() => {
        let res = await getAllConfirmedPatientForStaff()
        if(res && res.errCode === 0){
            this.setState({
                arrConfirmedPatient: res.data.reverse()
            })
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevProps.patients !== this.props.patients){
            this.setState({
                arrPatient: this.props.patients
            })
        }
    }


    handleUpdateStatus = async (item) => {
        let formatDate = moment.unix(+item.date/1000).format('DD/MM/YYYY')
        let doctorName = `${item.doctorDataPatient.lastName} ${item.doctorDataPatient.firstName}`
        let res = await updateBookingStatusConfirmed({
            doctorId: item.doctorId,
            patientId: item.patientId,
            timeType: item.timeType,
            email: item.patientData.email,
            fullname: item.patientData.fullName,
            time: item.timeTypeDataPatient.valueVI,
            bookingDate: formatDate, 
            doctorName: doctorName,
        })
        if(res && res.errCode === 0){
            toast.success('Cập nhật trạng thái lịch khám thành công');
            await this.props.getAllPatients()
            await this.getDataConfirmedPatient()
        }else{
            toast.error('Cập nhật trạng thái lịch khám không thành công')
        }
        console.log(item, res.data)
    }

    handleDeleteBooking = (item) => {
        this.props.deleteBooking(item.id)
    }

    render() {
        let {arrPatient} = this.state
        console.log(arrPatient)
        return (
            <div className='manage-waiting-patient'>
                <div className='title'>Danh sách lịch hẹn mới</div>
                <Form className='list-patient'>
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
                            { arrPatient && arrPatient.length > 0 &&
                            arrPatient.map((item, index) => {
                                let formatDate = moment.unix(+item.date/1000).format('DD/MM/YYYY')
                                return(
                                    <tr key={index}>
                                        <td id='no'>{index+1}</td>
                                        <td style={{paddingLeft: '1%'}}>{formatDate}</td>
                                        <td style={{paddingLeft: '2.5%', width:'12%'}}>{item.timeTypeDataPatient.valueVI}</td>
                                        <td style={{paddingLeft: '2.5%', width:'20%'}}>{item.patientData.fullName}</td>
                                        <td style={{paddingLeft: '2.5%', width:'12%'}}>{item.patientData.birthday.split("-").reverse().join("-")}</td>
                                        <td id='gender'>{item.patientData.genderData.valueVI}</td>
                                        <td id='phone'>{item.patientData.phoneNumber}</td>
                                        <td className='btn-booking'style={{paddingLeft: '10%'}}>
                                            <button type='button' className='btn-confirm' onClick={() => {this.handleUpdateStatus(item)}}><strong>Xác nhận</strong></button>
                                            <button type='button' className='btn-cancel' onClick={() => {this.handleDeleteBooking(item)}}><strong>Hủy lịch</strong></button>
                                        </td>
                                    </tr>
                                )
                            })
                            }
                        </table>
                    </Row>
                </Form>
                <ConfirmedPatient 
                    arrPatient = {this.state.arrConfirmedPatient}
                />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        user: state.user.userInfo,
        patients: state.admin.allPatients
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getAllPatients: () => dispatch(actions.fetchAllPatients()),
        deleteBooking: (id) => dispatch(actions.deleteBooking(id)),

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageWaitingPatient);
