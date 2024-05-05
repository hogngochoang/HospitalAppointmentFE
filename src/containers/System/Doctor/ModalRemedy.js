import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Row, Col, Label, Input } from 'reactstrap';
import '../../HomePage/ModalSchedule.scss'
import { updateBookingStatusDone } from '../../../services/userService';
import {toast} from 'react-toastify'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudArrowUp } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';
import Select from 'react-select'
import localization from 'moment/locale/vi' 
class ModalRemedy extends Component {

    constructor(props) {
        super(props);
        this.state = {
            file:'',
            description:''
        }
    }


    componentDidMount() {

    }


    async componentDidUpdate(prevProps, prevState) {

    }

    toggle = () => {
        this.props.toggleRemedyModal();
    }

    onChangeInput = (e) => {
        this.setState({
            description: e.target.value
        }) 
    }


    handleSavePatient = async () => {
        let {dataPatientModal} = this.props;
        let res = await updateBookingStatusDone({
            doctorId: dataPatientModal.doctorId,
            patientId: dataPatientModal.patientId,
            timeType: dataPatientModal.timeType,
            date: dataPatientModal.date,
            description: this.state.description
        })
        if(res && res.errCode === 0){
            toast.success('Cập nhật trạng thái lịch khám thành công');
            await this.props.getDataPatient()
            this.toggle()
        }else{
            toast.error('Cập nhật trạng thái lịch khám không thành công')
        }
    }

    render() {
        let {dataPatientModal} = this.props;
        return (
            <Modal 
                isOpen={this.props.isOpen} 
                toggle={() => this.toggle()} 
                size='lg'
                centered
                className='modal-user-container'
            >
                <ModalHeader toggle={() => this.toggle()}>LƯU THÔNG TIN BỆNH NHÂN</ModalHeader>
                <ModalBody style={{fontSize: '16px'}}>
                <div className='doctor-schedule-user'>
                    <Form style={{margin: '3% 7%'}}>
                        <Row>
                            <Col md={6}>
                                <Label>Họ tên</Label>
                                <Input type='text' value={dataPatientModal.fullname} disabled />  
                            </Col>
                            <Col md={6}>
                                <Label>Email</Label>
                                <Input type='email' value={dataPatientModal.email} disabled />  
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6}>
                                <Label>Giới tính</Label>
                                <Input type='text' value={dataPatientModal.gender} disabled />  
                            </Col>
                            <Col md={6}>
                                <Label>Số điện thoại</Label>
                                <Input type='email' value={dataPatientModal.phone} disabled />  
                            </Col>
                        </Row>
                        <Row>
                            <Col md={12}>
                                <Label>Chẩn đoán</Label>
                                <Input value={this.state.description} type='text' placeholder='Chẩn đoán' onChange={(e)=>{this.onChangeInput(e)}}/>
                            </Col>
                        </Row>
                    </Form>
                </div>
                </ModalBody>
                <ModalFooter>
                        <Button className='save-patient' style={{fontSize: '16px', backgroundColor: '#0060ae',border:'none',lineHeight:'1'}} onClick={() => this.handleSavePatient()}>Lưu thông tin</Button>
                        <Button className='' style={{backgroundColor: 'red', fontSize: '16px',border:'none',lineHeight:'1'}} onClick={() => this.toggle()} >Hủy</Button>
                </ModalFooter>
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalRemedy);



