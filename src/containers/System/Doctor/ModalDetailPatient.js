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
class ModalDetailPatient extends Component {

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
        this.props.toggleDetailPatientModal();
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
                <ModalHeader toggle={() => this.toggle()} style={{cursor: 'pointer'}}>THÔNG TIN BỆNH NHÂN</ModalHeader>
                <ModalBody style={{fontSize: '16px'}}>
                <div className='doctor-detail-patient'>
                    <Form >
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
                                <Input value={dataPatientModal.description} type='text' disabled/>
                            </Col>
                        </Row>
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
        // savePatient: (data) => dispatch(actions.savePatient(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalDetailPatient);



