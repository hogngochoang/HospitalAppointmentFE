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
import { getAllPatientForDoctor, updateBookingStatusCancel } from '../../../services/userService';
import ExaminedPatient from './ExaminedPatient';
import ModalRemedy from './ModalRemedy';


class ManagePatient extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentDate: moment(new Date()).startOf('day').valueOf(),
            dataPatient: [],
            isOpenModalRemedy: false,
            dataPatientModal: {}
        }
    }

    async componentDidMount() {
        this.getDataPatient()
    }

    getDataPatient = async() => {
        let {user} = this.props;
        let {currentDate} = this.state
        let formattedDate = new Date(currentDate).getTime() 
        let res = await getAllPatientForDoctor({
            doctorId: user.id,
            date: formattedDate
        })
        if(res && res.errCode === 0){
            this.setState({
                dataPatient: res.data
            })
        }
    }

    componentDidUpdate(prevProps, prevState) {

    }

    handleOnChangeDatePicker = (date) => {
        this.setState({
            currentDate : date[0]
        },async () => {
            await this.getDataPatient()    
        })
    }

    toggleRemedyModal = () => {
        this.setState({
            isOpenModalRemedy: !this.state.isOpenModalRemedy
        })
    }

    handleOpenRemedy = async (item) => {
        let data = {
            doctorId:item.doctorId,
            patientId: item.patientId,
            date: item.date,
            timeType:item.timeType,
            email: item.patientDataS2.email,
            fullname: item.patientDataS2.fullName,
            gender: item.patientDataS2.genderData.valueVI,
            phone: item.patientDataS2.phoneNumber
        }
        this.setState({
            isOpenModalRemedy: true,
            dataPatientModal: data
        })
    }

    handleCancelBooking = async (item) => {
        let formatDate = moment.unix(+item.date/1000).format('DD/MM/YYYY')
        let doctorName = `${item.doctorDataPatientS2.lastName} ${item.doctorDataPatientS2.firstName}`
        let res = await updateBookingStatusCancel({
            doctorId: item.doctorId,
            patientId: item.patientId,
            timeType: item.timeType,
            date: item.date,
            email: item.patientDataS2.email,
            fullname: item.patientDataS2.fullName,
            time: item.timeTypeDataPatientS2.valueVI,
            bookingDate: formatDate, 
            doctorName: doctorName,
        })
        if(res && res.errCode === 0){
            toast.success('Cập nhật trạng thái lịch khám thành công');
            await this.getDataPatients()
        }else{
            toast.error('Cập nhật trạng thái lịch khám không thành công')
        }
        console.log(res.data)
    }

    render() {
        let {dataPatient} = this.state
        return (
            <div className='manage-patient'>
                <div className='title'>Danh sách bệnh nhân chờ khám</div>
                <Form className='list-patient'>
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
                    </Row>
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
                                        <td style={{paddingLeft: '1%'}}>{formatDate}</td>
                                        <td style={{paddingLeft: '2.5%', width:'12%'}}>{item.timeTypeDataPatientS2.valueVI}</td>
                                        <td >{item.patientDataS2.fullName}</td>
                                        <td style={{paddingLeft: '2.5%', width:'12%'}}>{item.patientDataS2.birthday.split("-").reverse().join("-")}</td>
                                        <td id='gender'>{item.patientDataS2.genderData.valueVI}</td>
                                        <td id='phone'>{item.patientDataS2.phoneNumber}</td>
                                        <td className='btn-booking' style={{paddingLeft: '5%'}}>
                                            <button type='button' className='btn-confirm' onClick={() => {this.handleOpenRemedy(item)}}><strong>Hoàn thành</strong></button>
                                            <button type='button' className='btn-cancel' onClick={() => {this.handleCancelBooking(item)}}><strong>Hủy lịch</strong></button>
                                        </td>
                                    </tr>
                                )
                            })
                            }
                        </table>
                    </Row>
                </Form>
                <ExaminedPatient 
                    date = {this.state.currentDate}
                />
                <ModalRemedy 
                    isOpen = {this.state.isOpenModalRemedy} 
                    toggleRemedyModal = {this.toggleRemedyModal}
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

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);
