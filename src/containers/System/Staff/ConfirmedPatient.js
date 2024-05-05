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
import '../Doctor/ManagePatient.scss'
import { dateFormat } from '../../../utils';
import { getAllConfirmedPatientForStaff } from '../../../services/userService';


class ConfirmedPatient extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentDate: moment(new Date()).startOf('day').valueOf(),
            arrPatient: [],
        }
    }

    async componentDidMount() {
        this.getDataPatient()
    }

    getDataPatient = async() => {
        let res = await getAllConfirmedPatientForStaff()
        if(res && res.errCode === 0){
            this.setState({
                arrPatient: res.data.reverse()
            })
        }
    }

    componentDidUpdate(prevProps, prevState) {

    }



    render() {
        let {arrPatient} = this.state
        console.log(arrPatient)
        arrPatient.sort((a, b) => {
            // Chuyển ngày thành số Unix timestamp và so sánh
            const dateA = moment.unix(+a.date / 1000).valueOf();
            const dateB = moment.unix(+b.date / 1000).valueOf();
            return dateB - dateA; // Sắp xếp từ mới đến cũ
        });
        
        return (
            <div className='manage-confirmed-patient'>
                <div className='title'>Danh sách lịch hẹn đã xác nhận</div>
                <Form className='list-patient' >
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
                            </tr>
                            { arrPatient && arrPatient.length > 0 &&
                            arrPatient.map((item, index) => {
                                let formatDate = moment.unix(+item.date/1000).format('DD/MM/YYYY')
                                return(
                                    <tr key={index}>
                                        <td id='no'>{index+1}</td>
                                        <td style={{paddingLeft: '2.5%'}}>{formatDate}</td>
                                        <td style={{paddingLeft: '3%'}}>{item.timeTypeDataPatientS2.valueVI}</td>
                                        <td style={{paddingLeft: '5.5%'}}>{item.patientDataS2.fullName}</td>
                                        <td style={{paddingLeft: '3%'}}>{item.patientDataS2.birthday.split("-").reverse().join("-")}</td>
                                        <td id='gender'>{item.patientDataS2.genderData.valueVI}</td>
                                        <td id='phone'>{item.patientDataS2.phoneNumber}</td>
                                    </tr>
                                )
                            })
                            }
                        </table>
                    </Row>
                </Form>
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
        getAllPatients: () => dispatch(actions.fetchAllPatients())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmedPatient);
