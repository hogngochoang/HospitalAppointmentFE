import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import { Button, Form, FormGroup, Row, Col, Label, Input } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarCheck,faCalendarXmark, faCalendarPlus } from '@fortawesome/free-regular-svg-icons';
import DatePicker from '../../../components/Input/DatePicker';
import moment from 'moment';
import {toast} from 'react-toastify'
import _ from 'lodash'
import Select from 'react-select'
import * as actions from '../../../store/actions'
import './ManageSchedule.scss'
import { dateFormat } from '../../../utils';
import { USER_ROLE } from '../../../utils/constant';
import { saveScheduleDoctor,getScheduleDoctorById, deleteSchedule, getScheduleDoctorByDate } from '../../../services/userService';


class ManageSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentDate:'',
            rangeTime: [],
            selectedDoctor: {},
            listDoctors: [],
            role:'',
            allDays: [],
            allDays1: [],
            allAvailableTime: [],
            allSelectedTime: []
        }
    }

    componentDidMount() {
        this.props.fetchAllDoctors();
        this.props.fetchAllTime();
        this.showSchedule()
        this.setArrDays()

        //lấy doctorId theo id đã đăng nhập
        let {userInfo} = this.props;
        if(userInfo && !_.isEmpty(userInfo)){  
            let role = userInfo.roleId;
            if(role === 'R1'){
                this.setState({
                    role: USER_ROLE.ADMIN
                })
            }
            if(role === 'R2'){
                this.setState({
                    selectedDoctor: userInfo.id,
                    role: USER_ROLE.DOCTOR
                })            
            }    
        } 
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevProps.allDoctors !== this.props.allDoctors) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors)
            this.setState({
                listDoctors: dataSelect
            })
        }

        if(prevProps.allScheduleTime !== this.props.allScheduleTime) {
            let data = this.props.allScheduleTime;
            if(data && data.length > 0){
                data = data.map(item => ({...item, isSelected: false}))
            }
            this.setState({
                rangeTime: data
            })
        }

    }

    buildDataInputSelect = (inputData) => {
        let result = [];
        if(inputData && inputData.length > 0){
            inputData.map((item,index)=> {
                let object = {};
                object.label =`${item.lastName} ${item.firstName}`
                object.value = item.id
                result.push(object)
            })
        }
        return result;
    }

    handleChangeSelect = (selectedOption) => {
        this.setState({selectedDoctor: selectedOption})
    }

    handleOnChangeDatePicker = (date) => {
        this.setState({
            currentDate : date[0]
        })
    }

    handleClickTime = (time) => {
        let {rangeTime, allSelectedTime} = this.state;
        
        if(rangeTime && rangeTime.length > 0){
            rangeTime = rangeTime.map(item => {
                if(item.id === time.id) item.isSelected = !item.isSelected;
                return item
            })
            this.setState({
                rangeTime: rangeTime
            })
        }
    }

    handleClickTimeEdit = (index) => {
        this.setState(prevState => {
            const updatedAllSelectedTime = [...prevState.allSelectedTime];
            updatedAllSelectedTime[index] = {
                ...updatedAllSelectedTime[index],
                isSelected: !updatedAllSelectedTime[index].isSelected
            };
            return { allSelectedTime: updatedAllSelectedTime };
        },()=>{
            console.log(this.state.allSelectedTime)
        });
    }

    handleSaveSchedule = async () => {
        let {rangeTime, currentDate, selectedDoctor} = this.state;
        let result = []
        if(!currentDate){
            toast.error("Invalid date")
        }
        let formattedDate = new Date(currentDate).getTime() 
        if(rangeTime && rangeTime.length > 0){
            let selectedTime = rangeTime.filter(item => item.isSelected ===true)
            if(selectedTime && selectedTime.length > 0){
                selectedTime.map(schedule => {
                    let object = {};
                    object.doctorId = this.state.role === USER_ROLE.ADMIN ?selectedDoctor.value:selectedDoctor 
                    object.date = formattedDate
                    object.timeType = schedule.keyMap
                    result.push(object)
                });
                toast.success("Create schedule succeed")
                rangeTime = rangeTime.map(item => ({...item, isSelected: false}))
                this.setState({ 
                    rangeTime: rangeTime,
                    currentDate: ''
                });
            }else{
                toast.error("Invalid selected time")
            }
        }
        let res = await saveScheduleDoctor({
            arrSchedule: result,
            doctorId: this.state.role === USER_ROLE.ADMIN ? selectedDoctor.value : selectedDoctor,
            date: formattedDate
        });

        // Update the state with the newly created schedule
        if (res.data && res.data.length > 0) {
            let updatedSchedule = [...this.state.allAvailableTime, ...res.data];
            this.setState({
                allAvailableTime: updatedSchedule
            });
        }
        this.showSchedule();
    }

    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1)
    }

    setArrDays = () => {
        moment.locale('vi', {
            week: { dow: 1 } // Set Monday as the first day of the week
        });

        let daysOfWeek = [];
        let daysOfWeek1 = [];


        let currentDate = moment().startOf('week').utcOffset('+07:00');
        for (let i = 0; i < 7; i++) {
            let dayOfWeek = {}; 
            let label = this.capitalizeFirstLetter(currentDate.format('dddd - DD/MM/YYYY'));
            dayOfWeek.label = label;
            dayOfWeek.value = currentDate.clone().startOf('day').valueOf(); // Start of the day in milliseconds
            daysOfWeek.push(dayOfWeek);
            daysOfWeek1.push(currentDate.format('DD/MM/YYYY'))
            currentDate.add(1, 'day');
        }

        this.setState({
            allDays: daysOfWeek,
            allDays1: daysOfWeek1
        })

    }


    showSchedule = async () => {
        let {userInfo} = this.props;

        let res = await getScheduleDoctorById(userInfo.id);
        if(res.data && res.data.length>0){
            res.data.map(item => {
                item.date = parseInt(item.date)
            })
            this.setState({
                allAvailableTime: res.data
            })
        }
    }

    handleDeleteSchedule = async (day) => {
        let {userInfo} = this.props;
        let res = await deleteSchedule(userInfo.id,day.value);
        if(res && res.errCode === 0){
            console.log(res)
        }
        this.showSchedule()
    }

    handleEditSchedule = async (day) => {
        let {userInfo} = this.props;
        let {allSelectedTime, rangeTime} = this.state
        let res = await getScheduleDoctorByDate(userInfo.id,day.value)
        let date = new Date(day.value)
        allSelectedTime = [...rangeTime]
        if(res.data && res.data.length > 0){
            allSelectedTime = allSelectedTime.map(item => {
                if (res.data.some(dataItem => dataItem.timeType === item.keyMap)) {
                    return { ...item, isSelected: true };
                }
                return item;
            })
            this.setState({
                allSelectedTime: allSelectedTime,
                currentDate: date
            })  
        }
    }
    handleSaveEditSchedule = async () => {
        let {allSelectedTime, currentDate, selectedDoctor} = this.state;
        let result = []
        console.log(allSelectedTime)
        let {userInfo} = this.props;
        if(!currentDate){
            toast.error("Invalid date")
        }
        let formattedDate = new Date(currentDate).getTime() 
        await deleteSchedule(userInfo.id,formattedDate);         
        if(allSelectedTime && allSelectedTime.length > 0){
            let selectedTime = allSelectedTime.filter(item => item.isSelected ===true)
            if(selectedTime && selectedTime.length > 0){
                selectedTime.map(schedule => {
                    let object = {};
                    object.doctorId = this.state.role === USER_ROLE.ADMIN ?selectedDoctor.value:selectedDoctor 
                    object.date = formattedDate
                    object.timeType = schedule.keyMap
                    result.push(object)
                });
                toast.success("Edit schedule succeed")
                this.setState({
                    allSelectedTime: [],
                    currentDate: ''
                });
            }else{
                toast.error("Invalid selected time")
            }
        }
        let res = await saveScheduleDoctor({
            arrSchedule: result,
            doctorId: this.state.role === USER_ROLE.ADMIN ? selectedDoctor.value : selectedDoctor,
            date: formattedDate
        });

        // Update the state with the newly created schedule
        if (res.data && res.data.length > 0) {
            let updatedSchedule = [...this.state.allAvailableTime, ...res.data];
            this.setState({
                allAvailableTime: updatedSchedule,
                allSelectedTime: [],
                currentDate: ''
            });
        }
        this.showSchedule();
    }

    handleCancel = () => {
        let {rangeTime, allSelectedTime} = this.state;
        if(allSelectedTime && allSelectedTime.length > 0){
            this.setState({
                allSelectedTime: [],
                currentDate: ''
            });
        }else{
            rangeTime = rangeTime.map(item => ({...item, isSelected: false}))
            this.setState({ 
                rangeTime: rangeTime,
                currentDate: ''
            });
        }

    }

    render() {
        let {rangeTime, role, allDays, allAvailableTime, allSelectedTime} = this.state
        return (
            <div className='manage-schedule'>
                <div className='title'>Quản lý kế hoạch khám bệnh</div>
                <div className='doctor-schedule'>
                    <Form style={{margin: '3% 5%'}}>
                        <Row>
                            {role === USER_ROLE.ADMIN?
                            <Col md={6}  >
                            <FormGroup>
                                <Label>Chọn bác sĩ</Label>
                                <Select 
                                    value = {this.state.selectedDoctor}
                                    onChange={this.handleChangeSelect}
                                    options={this.state.listDoctors}
                                />
                            </FormGroup>
                            </Col>
                            : <Col md={6} hidden></Col>
                        }
                            
                            <Col md={6}>
                            <FormGroup>
                                <Label>Chọn ngày</Label>
                                <DatePicker 
                                    onChange = {this.handleOnChangeDatePicker}
                                    className='form-control'
                                    value = {this.state.currentDate}
                                    // minDate = {new Date()}
                                />
                            </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                        <Col className='list-time'>
                            {allSelectedTime && allSelectedTime.length > 0 ? (
                                allSelectedTime.map((item, index) => (
                                    <Button 
                                        className={item.isSelected === true ? 'time active' : 'time'} 
                                        key={index}
                                        onClick={() => this.handleClickTimeEdit(index)}
                                    >
                                        {item.valueVI}
                                    </Button>
                                ))
                            ) : (
                                rangeTime && rangeTime.length > 0 && 
                                rangeTime.map((item, index) => (
                                    <Button 
                                        className={item.isSelected === true ? 'time active' : 'time'} 
                                        key={index}
                                        onClick={() => this.handleClickTime(item)}
                                    >
                                        {item.valueVI}
                                    </Button>
                                ))
                            )}
                        </Col>

                        </Row>
                        <Button className='save-time' onClick={() => allSelectedTime && allSelectedTime.length > 0 ?this.handleSaveEditSchedule() : this.handleSaveSchedule()}>
                            {
                                allSelectedTime && allSelectedTime.length > 0 ? <><FontAwesomeIcon id='add' icon={faCalendarCheck} />Lưu thay đổi</> : <><FontAwesomeIcon id='add' icon={faCalendarPlus} />Thêm lịch khám</>
                            }
                        </Button>
                        <Button className='cancel-time' onClick={() => this.handleCancel()}>Hủy</Button>
                    </Form>
                </div>
                <div className='schedule-table'>
                    <h2>{`Lịch khám từ ngày ${this.state.allDays1[0]} - ${this.state.allDays1[6]} `}</h2>
                    <table id='schedule'>
                        <thead>
                            <tr>
                                <th>Ngày</th>
                                <th>Thời gian</th>
                                <th id='btn-schedule'></th>
                            </tr>
                        </thead>
                        <tbody>
                            {allDays && allDays.length > 0 &&
                                allDays.map((day, index) => {
                                    let matchingData = allAvailableTime.filter(element => {
                                        return element.date === day.value;
                                    });
                                    let times = matchingData ? matchingData.map(item => [item.dataTime]) : [];
                                    return (
                                        <tr key={index}>
                                            <td id='date'>{day.label}</td>
                                            <td>
                                                {times.length>0 && times.map((time, timeIndex) => {
                                                    let hasValue = time[0] ? true : false;
                                                    if(hasValue === true){
                                                            return(
                                                            <ul>
                                                                <li>{time[0].map(item => {
                                                                    return(
                                                                        <p>{item.valueVI}</p>
                                                                    )
                                                                })}</li>
                                                            </ul>
                                                        )
                                                    }
                                                }
                                                )}
                                            </td>
                                            <td className='btn-schedule' id='btn-schedule'>
                                                <ul>
                                                    <li>
                                                        <button type='button' className='btn-edit' onClick={() => {this.handleEditSchedule(day)}}><FontAwesomeIcon id='edit' icon={faCalendarCheck} />Sửa</button>
                                                    </li>
                                                    <li>
                                                        <button type='button' className='btn-delete' onClick={() => {this.handleDeleteSchedule(day)}}><FontAwesomeIcon id='delete' icon={faCalendarXmark} />Xóa</button>
                                                    </li>
                                                </ul>
                                            </td>
                                        </tr>
                                    );
                                })}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        systemMenuPath: state.app.systemMenuPath,
        allScheduleTime: state.admin.time,
        userInfo: state.user.userInfo,
        allDoctors: state.admin.allDoctors
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllTime: () => dispatch(actions.fetchAllTime()),
        fetchAllDoctors: () => dispatch(actions.fetchAllDoctors())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
