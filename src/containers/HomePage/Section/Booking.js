import React, { Component, CSSProperties } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Form, FormGroup, Row, Col, Label, Input, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Select from 'react-select'
import moment from 'moment';
import {toast} from 'react-toastify'
import ClipLoader from "react-spinners/ClipLoader";
import DatePicker from '../../../components/Input/DatePicker';
import * as actions from '../../../store/actions'
import {getScheduleDoctorByDate} from '../../../services/userService'
import '../HomePage.scss'
import { postPatientBookAppointment } from '../../../services/userService';

class Booking extends Component {

    constructor(props){
        super(props)
        this.state = {
            doctorId: '',
            selectedDoctor: {},
            listDoctors: [],
            allDays: [],
            allAvailableTime: [],
            checkItem: {},

            fullname:'',
            phonenumber:'',
            birthday:'',
            selectedGender: '',
            genders:'',
            email:'',
            address:'', 
            timeType: '',
            selectedDate:'',
            selectedTime: '',

            isLoading: false,
            isOpenModalNotify: false,
            isOpenModalErrorNotify: false,
            isOpenModalFullNotify: false,
            isOpenModalConfirmedNotify:false,
        }
        this.handleChangeCheckGender = this.handleChangeCheckGender.bind(this);
    }

    async componentDidUpdate(prevProps, prevState) {
        if(prevProps.allDoctors !== this.props.allDoctors) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors)
            this.setState({
                listDoctors: dataSelect
            })
        }
        if(this.props.genders !== prevProps.genders){
                this.setState({
                    genders: this.buildDataGender(this.props.genders)
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

    buildDataGender = (data) => {
        let result = [];
        if(data && data.length > 0){
            data.map((item,index)=> {
                let object = {};
                object.label =item.valueVI
                object.value = item.keyMap
                result.push(object)
            })
        }
        return result;
    }

    componentDidMount() {
        this.props.fetchAllDoctors();
        this.setArrDays();
        this.props.getGender();

    }
    handleChangeSelect = (selectedOption) => {
        this.setState({
            selectedDoctor:selectedOption,
            doctorId: selectedOption.value
        })
    }

    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1)
    } 

    setArrDays = async() => {
        moment.locale('vi', {
            week: { dow: 1 } // Set Monday as the first day of the week
        });

        let daysOfWeek = [];

        let currentDate = moment().utcOffset('+07:00');
        for (let i = 0; i < 7; i++) {
            let dayOfWeek = {}; 
            let label = this.capitalizeFirstLetter(currentDate.format('dddd - DD/MM/YYYY'));
            dayOfWeek.label = label;
            dayOfWeek.value = currentDate.clone().startOf('day').valueOf(); // Start of the day in milliseconds
            daysOfWeek.push(dayOfWeek);

            currentDate.add(1, 'day');

        }

        this.setState({
            allDays: daysOfWeek
        })
    }

    handleOnChangeSelect = async (event) => {
        let date = event.target.value
        this.setState({selectedDate: date})
        let res = await getScheduleDoctorByDate(this.state.doctorId, date)
        if(res.data && res.data.length > 0){
            res.data = res.data.map(item => ({...item, isSelected: false}))
        }
        if(res && res.errCode === 0 ){
            this.setState({
                allAvailableTime: res.data? res.data : []
            })
        }
    }

    handleOnChangeInput = (event, id) => {
        let valueInput = event.target.value;
        let stateCopy = {...this.state}
        stateCopy[id] = valueInput
        this.setState({
            ...stateCopy
        })
    }

    handleOnChangeDatePicker = (date) => {
        this.setState({
            birthday : date[0]
        })
    }

    handleChangeSelectGender = (selectedOption) => {
        this.setState({
            selectedGender: selectedOption
        })
    }


    handleClickTime = (time) => {
        let {allAvailableTime} = this.state;
        
        if(allAvailableTime && allAvailableTime.length > 0){
            allAvailableTime = allAvailableTime.map(item => {
                if(item.timeType === time) item.isSelected = !item.isSelected;
                return item
            })}
        this.setState({
            timeType: time,
            allAvailableTime: allAvailableTime
        },() => {
            this.state.allAvailableTime.map((item, index) => {
                if(item.isSelected === true){
                    let time = `${item.timeTypeData.valueVI} ${this.capitalizeFirstLetter(moment.unix(+this.state.selectedDate/1000).format('dddd - DD/MM/YYYY'))}`
                    this.setState({
                        selectedTime: time
                    })
                }
            }) 
        })
    }

    toggleNotifyModal = () => {
        this.setState({
            isOpenModalNotify: !this.state.isOpenModalNotify,
        })
    }

    toggleErrorNotifyModal = () => {
        this.setState({
            isOpenModalErrorNotify: !this.state.isOpenModalErrorNotify
        })
    }

    toggleFullNotifyModal = () => {
        this.setState({
            isOpenModalFullNotify: !this.state.isOpenModalFullNotify
        })
    }

    toggleConfirmedNotifyModal = () => {
        this.setState({
            isOpenModalConfirmedNotify: !this.state.isOpenModalConfirmedNotify
        })
    }

    handleConfirmBooking = async () => {
        this.setState({
            isLoading: true
        })
        let formatTime = this.state.selectedTime
        let formatDate = moment.unix(+this.state.selectedDate/1000).format('DD/MM/YYYY')
        let res = await postPatientBookAppointment({
            fullname:this.state.fullname,
            phoneNumber:this.state.phonenumber,
            birthday:this.state.birthday,
            selectedGender:this.state.selectedGender.value,
            email:this.state.email,
            address:this.state.address, 
            doctorId: this.state.doctorId,
            timeType: this.state.timeType,
            date: this.state.selectedDate,
            doctorName: this.state.selectedDoctor.label,
            time: formatTime,
            bookingDate: formatDate
        })
        if(res && res.errCode === 0) {
            this.setState({
                isLoading: false,
                isOpenModalNotify: true,
            })
        }
        if(res && res.errCode === 2){
            this.setState({
                isLoading: false,
                isOpenModalErrorNotify: true,
            })
        }
        if(res && res.errCode === 3){
            this.setState({
                isLoading: false,
                isOpenModalFullNotify: true,
            })
        }
        if(res && res.errCode === 4){
            this.setState({
                isLoading: false,
                isOpenModalConfirmedNotify: true,
            })
        }
        console.log("check confirm button",this.state, formatDate, formatTime)
    }

    handleChangeCheckGender = (item) => (event) => {
        const { checked } = event.target;
        if (checked) {
            this.setState({
                selectedGender: item.value
            });
        } else {
            if (this.state.selectedGender === item.value) {
                this.setState({
                    selectedGender: null
                });
            }
        }
    };

    render() {
        let {allDays, allAvailableTime, genders, selectedGender} = this.state;
        console.log(genders, selectedGender)
        return (
            <>
                <div className="booking">
                    <div className='booking-container'>
                        <h4 className='title'> Đăng ký hẹn khám</h4>
                        <Form className='form-booking'>
                            <Row>
                                <Col md={6}>
                                <FormGroup>
                                    <Label>Tên của bạn</Label>
                                    <Input
                                        value={this.state.fullname}
                                        onChange={(event)=> this.handleOnChangeInput(event, 'fullname')}
                                    >
                                    </Input>
                                </FormGroup>
                                </Col>
                                <Col md={6}>
                                <FormGroup>
                                    <Label>Số điện thoại</Label>
                                    <Input
                                        value={this.state.phonenumber}
                                        onChange={(event)=>this.handleOnChangeInput(event, 'phonenumber')}                                
                                    >
                                    </Input>
                                </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={6}>
                                <FormGroup>
                                    <Label>Ngày sinh</Label>
                                    <DatePicker 
                                        onChange = {this.handleOnChangeDatePicker}
                                        className='form-control'
                                        value = {this.state.birthday}
                                    />
                                </FormGroup>
                                </Col>
                                <Col md={6}>
                                <FormGroup>
                                    <Label>Giới tính</Label>
                                    <div className='genders'>
                                        {
                                            genders && genders.length > 0 && 
                                            genders.map((item, index) => {
                                                return(
                                                    <form id='gender'>
                                                        <input type="checkbox"  className='genders' name={item.value} onChange={this.handleChangeCheckGender(item)} checked={this.state.selectedGender === item.value} />
                                                        <label for={item.value}> {item.label}</label>
                                                    </form>
                                                    
                                                )
                                            })
                                        }
                                    </div>
                                    

                                    {/* <Select 
                                    value = {this.state.selectedGender}
                                    onChange={this.handleChangeSelectGender}
                                    options={this.state.genders} 
                                    className='genders'
                                    />  */}
                                </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={6}>
                                <FormGroup>
                                    <Label>Email</Label>
                                    <Input type='emai'
                                        value={this.state.email}
                                        onChange={(event)=>this.handleOnChangeInput(event, 'email')}                                
                                    >
                                    </Input>
                                </FormGroup>
                                </Col>
                                <Col md={6}>
                                    <Label>Địa chỉ</Label>
                                    <Input className='address'
                                            value={this.state.address}
                                            onChange={(event)=>this.handleOnChangeInput(event, 'address')}                                
                                    >
                                    </Input>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={6}>
                                <FormGroup>
                                    <Label>Chọn bác sĩ</Label>
                                    <Select 
                                        value = {this.state.selectedDoctor}
                                        onChange={this.handleChangeSelect}
                                        options={this.state.listDoctors}
                                        className='doctors'
                                        placeholder= 'Chọn bác sĩ'
                                    />
                                </FormGroup>
                                </Col>
                                <Col md={6}>
                                <FormGroup>
                                    <Label>Ngày hẹn khám</Label>
                                    <Input type="select" className='select-day' onChange={(event) => this.handleOnChangeSelect(event)} >
                                        <option>Chọn ngày</option>
                                        {
                                            allDays && allDays.length > 0 &&
                                            allDays.map((item, index)=> {
                                                return(
                                                    <option key={index} value={item.value} style={{color: '#000'}}>{item.label}</option>
                                                )
                                            }) 
                                        }
                                    </Input>
                                </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={6}></Col>
                                <Col md={6} className='all-time'>
                                    {
                                        allAvailableTime && allAvailableTime.length > 0 ? 
                                        allAvailableTime.map((item, index) => {
                                            let timeDisplay = item.timeTypeData.valueVI
                                            return(
                                                
                                                <Button type='button' className={item.isSelected === true ? 'time active' : 'time'} key={index}
                                                    onClick={() => this.handleClickTime(item.timeType)}
                                                >{timeDisplay}</Button>
                                            )
                                        }) : <p>Không có lịch khám trong ngày đã chọn</p>
                                    }
                                </Col>
                            </Row>
                            <Button type="button" className="btn-booking" onClick={() => this.handleConfirmBooking()}>
                                <span>ĐẶT LỊCH HẸN</span>
                                <ClipLoader
                                    loading={this.state.isLoading}
                                    aria-label="Loading Spinner"
                                    data-testid="loader"
                                    color='white'
                                />
                            </Button>
                        </Form>
                    </div>
                </div>
                <Modal isOpen={this.state.isOpenModalNotify} toggle={this.toggleNotifyModal} centered={true}>
                    <ModalHeader toggle={this.toggleNotifyModal}>Thông báo</ModalHeader>
                    <ModalBody style={{fontSize: '16px'}}>
                        Lịch hẹn của bạn đã được ghi nhận. Vui lòng chú ý điện thoại để được nhân viên xác nhận lịch hẹn với bác sĩ!
                    </ModalBody>
                    <ModalFooter>
                    <Button style={{fontSize: '16px'}} color='primary' onClick={this.toggleNotifyModal}>
                        OK
                    </Button>
                    </ModalFooter>
                </Modal>
                <Modal isOpen={this.state.isOpenModalErrorNotify} toggle={this.toggleErrorNotifyModal} centered={true}>
                    <ModalHeader toggle={this.toggleErrorNotifyModal} style={{backgroundColor: 'red'}}>Thông báo</ModalHeader>
                    <ModalBody style={{fontSize: '16px'}}>
                        Bạn đã đạt giới hạn 1 lần đặt lịch. Xin vui lòng chờ nhân viên xác nhận!                    
                    </ModalBody>
                    <ModalFooter>
                    <Button style={{backgroundColor: 'red', fontSize: '16px'}} onClick={this.toggleErrorNotifyModal}>
                        OK
                    </Button>
                    </ModalFooter>
                </Modal>
                <Modal isOpen={this.state.isOpenModalFullNotify} toggle={this.toggleFullNotifyModal} centered={true}>
                    <ModalHeader toggle={this.toggleFullNotifyModal} style={{backgroundColor: 'red'}}>Thông báo</ModalHeader>
                    <ModalBody style={{fontSize: '16px'}}>
                        Khung giờ {this.state.selectedTime} của bác sĩ {this.state.selectedDoctor.label} đã kín lịch. Mời bạn vui lòng chọn sang khung giờ/ bác sĩ khác!                
                    </ModalBody>
                    <ModalFooter>
                    <Button style={{backgroundColor: 'red', fontSize: '16px'}} onClick={this.toggleFullNotifyModal}>
                        OK
                    </Button>
                    </ModalFooter>
                </Modal>
                <Modal isOpen={this.state.isOpenModalConfirmedNotify} toggle={this.toggleConfirmedNotifyModal} centered={true}>
                    <ModalHeader toggle={this.toggleConfirmedNotifyModal} style={{backgroundColor: 'red'}}>Thông báo</ModalHeader>
                    <ModalBody style={{fontSize: '16px'}}>
                        Lịch hẹn khám vào {this.state.selectedTime} - bác sĩ {this.state.selectedDoctor.label} của bạn đã được xác nhận!
                    </ModalBody>
                    <ModalFooter>
                    <Button style={{backgroundColor: 'red', fontSize: '16px'}} onClick={this.toggleConfirmedNotifyModal}>
                        OK
                    </Button>
                    </ModalFooter>
                </Modal>
            </>

        )
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        doctorsRedux: state.admin.doctors,
        allDoctors: state.admin.allDoctors,
        genders: state.admin.genders

    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadToDoctors: () => dispatch(actions.fetchDoctor()),
        fetchAllDoctors: () => dispatch(actions.fetchAllDoctors()),
        getGender: () => dispatch(actions.fetchGenderStart())

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Booking);


