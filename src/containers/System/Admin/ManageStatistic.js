import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import { Button, Form, FormGroup, Row, Col, Label, Input } from 'reactstrap';
import DatePicker from '../../../components/Input/DatePicker';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboardUser, faUserDoctor, faUserTie } from '@fortawesome/free-solid-svg-icons';
import {toast} from 'react-toastify'
import _ from 'lodash'
import Select from 'react-select'
import * as actions from '../../../store/actions'
import './ManageStatistic.scss'
import { dateFormat } from '../../../utils';
import { getAllPatientForAdmin, getTotalPatientForAdmin, getDoctorDetailService } from '../../../services/userService';


class ManageStatistic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentDate: moment(new Date()).startOf('day').valueOf(),
            dataPatient: [],
            arrUsers: [], 
            allWeeks: [],
            totalPatient: [],
            arrDoctors: []
        }
    }

    async componentDidMount() {
        this.props.fetchUserRedux()
        await this.getDataDoctor()
        this.getDataPatient()
        this.setArrDays() 
        this.showPatient().then(allPatient => {
            this.setState({
                totalPatient: allPatient
            });
        });   
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevProps.listUsers !== this.props.listUsers){
            this.setState({
                arrUsers: this.props.listUsers
            })
        }
        // if(prevProps.doctorsRedux !== this.props.doctorsRedux){
        //     this.setState({
        //         arrDoctors: this.props.doctorsRedux
        //     })
        // }
    }

    getDataDoctor = async() => {
        let res = await getDoctorDetailService()
        
        if(res && res.errCode === 0){
            this.setState({
                arrDoctors: res.data
            })
        }
    }

    getDataPatient = async() => {
        let {currentDate} = this.state
        let formattedDate = new Date(currentDate).getTime() 
        let res = await getAllPatientForAdmin({
            date: formattedDate
        })
        if(res && res.errCode === 0){
            this.setState({
                dataPatient: res.data
            })
        }
    }

    showPatient = async () => {
        let {arrDoctors}  = this.state;
        console.log(arrDoctors)
        let allPatient = [];
        let allData = await Promise.all(
            arrDoctors && arrDoctors.length>0 && arrDoctors.map(async (item) => {
                let res = await getTotalPatientForAdmin(item.id);
                console.log('check res data',res.data)
                return { doctor: item, patientCount: res.data.length };            
            })
        ) ;

        allData.forEach(data => {
            allPatient.push(data);
        });
        allPatient.sort((a, b) => b.patientCount - a.patientCount);
        console.log('check all Patient',allPatient)

        return allPatient;
    }

    getTotalPatient = async() => {
        let {currentDate} = this.state
        let formattedDate = new Date(currentDate).getTime() 
        let res = await getTotalPatientForAdmin({
            date: formattedDate
        })
        if(res && res.errCode === 0){
            this.setState({
                totalPatient: res.data
            })
        }
    }



    handleOnChangeDatePicker = (date) => {
        this.setState({
            currentDate : date[0]
        },async () => {
            await this.getDataPatient()    
        })
    }
    
    setArrDays = async () => {
        moment.locale('vi', {
            week: { dow: 1 } // Set Monday as the first day of the week
        });
    
        let weeksOfMonth = [];
        let weekNumber = 1;
    
        let currentDate = moment().utcOffset('+07:00');
        let startOfMonth = currentDate.clone().startOf('month');
        let endOfMonth = currentDate.clone().endOf('month');
    
        let currentWeek = [];
        while (currentDate.isSameOrBefore(endOfMonth)) {
            let dayOfWeek = {};
            let label = currentDate.format('dddd - DD/MM/YYYY');
            dayOfWeek.label = label;
            dayOfWeek.value = currentDate.clone().startOf('day').valueOf(); // Start of the day in milliseconds
            currentWeek.push(dayOfWeek);
    
            if (currentDate.day() === 0) {
                let startOfWeek = currentWeek[0].label.split(' - ')[1];
                let endOfWeek = currentWeek[currentWeek.length - 1].label.split(' - ')[1];
                let weekLabel = `Tuần ${weekNumber}`;
                currentWeek.weekLabel = weekLabel;
                weeksOfMonth.push(currentWeek);
                currentWeek = [];
                weekNumber++;
            }
    
            currentDate.add(1, 'day');
        }
    
        // Push the last week if it's not complete
        if (currentWeek.length > 0) {
            let startOfWeek = currentWeek[0].label.split(' - ')[1];
            let endOfWeek = currentWeek[currentWeek.length - 1].label.split(' - ')[1];
            let weekLabel = `Tuần ${weekNumber} - ${startOfWeek} - ${endOfWeek}`;
            currentWeek.weekLabel = weekLabel;
            weeksOfMonth.push(currentWeek);
        }
    
        // Limit to 4 weeks
        if (weeksOfMonth.length > 4) {
            weeksOfMonth = weeksOfMonth.slice(0, 4);
        }
    
        this.setState({
            allWeeks: weeksOfMonth
        });
    };
    
    

    render() {
        let {dataPatient, arrUsers, allWeeks, totalPatient, arrDoctors} = this.state
        console.log( allWeeks, dataPatient, arrDoctors)
        let doctor = arrUsers.filter(element => {
            if(element.roleId === 'R2'){
                return true
            } return false
        }).length
        let staff = arrUsers.filter(element => {
            if(element.roleId === 'R4'){
                return true
            } return false
        }).length
        let admin = arrUsers.filter(element => {
            if(element.roleId === 'R1'){
                return true
            } return false
        }).length
        
        return (
            <div className='manage-statistic'>
                <div className='title'>Thống kê
                    <Input type="select" className='select-week'  >
                        {
                            allWeeks && allWeeks.length > 0 &&
                            allWeeks.map((item, index)=> {
                                return(
                                    <option key={index} value={item.value} style={{color: '#000'}}>{item.weekLabel}</option>
                                )
                            }) 
                        }
                    </Input>
                    
                </div>
                <div className='total'>
                    <div className='doctor'>
                        <div className='icon-wrapper' id='doctor-wrapper'>
                            <FontAwesomeIcon icon={faUserDoctor} id='icon-doctor' />
                        </div>
                        <div className='total-content'>
                            <h2>Bác sĩ</h2>
                            <h3>{doctor}</h3>
                        </div>
                    </div>
                    <div className='staff'>
                    <div className='icon-wrapper' id='staff-wrapper'>
                            <FontAwesomeIcon icon={faClipboardUser} id='icon-doctor' />
                        </div>
                        <div className='total-content'>
                            <h2>Nhân viên</h2>
                            <h3>{staff}</h3>
                        </div>
                    </div>
                    <div className='admin'>
                    <div className='icon-wrapper'id='admin-wrapper'>
                            <FontAwesomeIcon icon={faUserTie} id='icon-doctor' />
                        </div>
                        <div className='total-content'>
                            <h2>Admin</h2>
                            <h3>{admin}</h3>
                        </div>
                    </div>
                </div>
                <div className='statistic'>
                    <div className='amount-booking'>
                        <div className='amount'>
                            <h2>Số lượng bệnh nhân đặt lịch </h2>
                            <h3 className='count'>{dataPatient.length}</h3>
                        </div>
                        <table id='patients'>
                            <tr>
                                <th>STT</th>
                                <th>Ngày</th>
                                <th>Thời gian</th>
                                <th>Họ và tên</th>
                            </tr>
                            { dataPatient && dataPatient.length > 0 &&
                            dataPatient.map((item, index) => {
                                let formatDate = moment.unix(+item.date/1000).format('DD/MM/YYYY')
                                return(
                                <tr key={index}>
                                    <td id='no'>{index+1}</td>
                                    <td style={{paddingLeft: '1%', width:'10%'}}>{formatDate}</td>
                                    <td style={{paddingLeft: '3.5%'}}>{item.timeTypeDataPatientS2.valueVI}</td> 
                                    <td style={{paddingLeft: '5%'}}>{item.patientDataS2.fullName}</td>
                                </tr>
                                )
                            })
                        }
                        </table>
                        

                    </div>
                    <div className='popular-doctor'>
                        <h2>Bác sĩ nổi bật</h2>
                        <table id='patients'>
                            <tr>
                                <th>STT</th>
                                <th>Bác sĩ</th>
                                <th>Bệnh nhân</th>
                            </tr>
                            
                            {totalPatient && totalPatient.length > 0 &&
                                totalPatient.map((data, index) => {
                                    let doctor = data.doctor;
                                    let patientCount = data.patientCount;
                                    let name = `${doctor.lastName} ${doctor.firstName}`;
                                    return (
                                        <tr>
                                            <td id='no'>{index + 1}</td>
                                            <td style={{paddingLeft:'15%'}}>{name}</td>
                                            <td id='count'>{patientCount}</td>
                                        </tr>
                                    );
                                })
                            }
                            
                        </table>
                    </div>
                </div>
                <div className='table-container'>
                    <div className='user-table'>
                        <h2>Danh sách người dùng</h2>
                        <table id="users">
                            <tr>
                                <th id='no'>STT</th>
                                <th id='email' style={{paddingLeft: '7%', textAlign:'left'}}>Email</th>
                                <th style={{paddingLeft: '4.5%',textAlign:'left'}}>Họ</th>
                                <th style={{paddingLeft: '4.5%', textAlign:'left'}}>Tên</th>
                                <th id='gender'>Giới tính</th>
                                <th id='phone'>Số điện thoại</th>
                                <th id='role'>Role</th>
                            </tr>
                            { arrUsers && arrUsers.length > 0 &&
                              arrUsers.map((item, index) => {
                                    return(
                                    <tr key={index}>
                                        <td id='no'>{index+1}</td>
                                        <td id='email' style={{paddingLeft: '15px'}}>{item.email}</td>
                                        <td style={{paddingLeft: '4%', width:'15%'}}>{item.lastName}</td>
                                        <td style={{paddingLeft: '4%'}}>{item.firstName}</td>
                                        <td id='gender'>{item.gender}</td>
                                        <td id='phone'>{item.phoneNumber}</td>
                                        <td id='role'>{item.roleId === 'R2'? 'Bác sĩ' : (item.roleId === 'R4'? 'Nhân viên' : 'Admin')}</td>
                                    </tr>
                                    )
                              })
                            }
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        listUsers: state.admin.users,
        doctorsRedux: state.admin.doctors

    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchUserRedux: () => dispatch(actions.fetchAllUsersStart()),
        loadToDoctors: () => dispatch(actions.fetchDoctor())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageStatistic);
