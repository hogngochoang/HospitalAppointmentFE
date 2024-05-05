import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Row, Col, Label, Input } from 'reactstrap';
import {emitter} from '../../utils/emitter'
import './ModalSchedule.scss'
import moment from 'moment';
import Select from 'react-select'
import localization from 'moment/locale/vi'
import {getScheduleDoctorByDate} from '../../services/userService'
class ModalSchedule extends Component {

    constructor(props) {
        super(props);
        this.state = {
            allDays: [],
            allAvailableTime: []
        }
    }


    componentDidMount() {
        console.log('moment',moment(new Date()).format('dddd - DD/MM'))
        this.setArrDays();
    }

    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1)
    } 

    setArrDays = async() => {
            let allDays = []
            for (let i =0; i<7;i++){
                let object = {};
                if(i===0) {
                    let label = moment(new Date()).add(i, 'days').format('DD/MM')
                    let today = `Hôm nay - ${label}`;
                    object.label = today
                }else{
                    let label = moment(new Date()).add(i, 'days').format('dddd - DD/MM')
                    object.label = this.capitalizeFirstLetter(label)
                }

                object.value = moment(new Date()).add(i, 'days').startOf('day').valueOf();
                allDays.push(object)
            }
            this.setState({
                allDays: allDays
            })   
        }

    async componentDidUpdate(prevProps, prevState) {
        if(this.props.doctorIdFromParent !== prevProps.doctorIdFromParent){
            let res = await getScheduleDoctorByDate(this.props.doctorIdFromParent, this.state.allDays[0].value)
            this.setState({
                allAvailableTime: res.data? res.data : []
            })
        }

    }

    toggle = () => {
        this.props.toggleScheduleModal();
    }

    handleOnChangeSelect = async (event) => {
        let doctorId = this.props.doctorIdFromParent
        let date = event.target.value
        let res = await getScheduleDoctorByDate(doctorId, date)
        if(res && res.errCode === 0 ){
            this.setState({
                allAvailableTime: res.data? res.data : []
            })
        }
        console.log('check res schedule', res)
    }

    render() {
        let {allDays, allAvailableTime} = this.state;
        return (
            <Modal 
                isOpen={this.props.isOpen} 
                toggle={() => this.toggle()} 
                size='lg'
                centered
                className='modal-user-container'
            >
                <ModalHeader toggle={() => this.toggle()}>LỊCH KHÁM</ModalHeader>
                <ModalBody>
                <div className='doctor-schedule-user'>
                    <Form style={{margin: '3% 7%'}}>
                        <Row>
                            <Col md={6}>
                            <FormGroup className='all-schedule'>
                                <Label>Chọn ngày</Label>
                                <Input type="select" onChange={(event) => this.handleOnChangeSelect(event)} >
                                    {
                                        allDays && allDays.length > 0 &&
                                        allDays.map((item, index)=> {
                                            return(
                                                <option key={index} value={item.value}>{item.label}</option>
                                            )
                                        }) 
                                    }
                                </Input>

                            </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col className='all-time'>
                                {
                                    allAvailableTime && allAvailableTime.length > 0 ? 
                                    allAvailableTime.map((item, index) => {
                                        let timeDisplay = item.timeTypeData.valueVI
                                        return(
                                            
                                            <Button className='time' key={index}
                                                // onClick={() => this.handleClickTime(item)}
                                            >{timeDisplay}</Button>
                                        )
                                    }) : <p>Không có lịch khám trong ngày đã chọn</p>
                                }
                            </Col>
                        </Row>
                        {/* <Button className='save-time'
                            onClick={() => this.handleSaveSchedule()}
                        >Lưu thông tin</Button> */}
                    </Form>
                </div>

                </ModalBody>
            </Modal>
        )
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalSchedule);



