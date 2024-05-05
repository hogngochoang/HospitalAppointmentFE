import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import 'bootstrap/dist/css/bootstrap.min.css';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { withRouter } from 'react-router';
import * as actions from '../../../store/actions'
import '../HomePage.scss'
import ModalSchedule from '../ModalSchedule';

class Doctor extends Component {

    constructor(props){
        super(props)
        this.state = {
            arrDoctors: [],
            isOpenModalSchedule: false,
            doctorId: '',
            currentDoctorId: -1
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevProps.doctorsRedux !== this.props.doctorsRedux){
            this.setState({
                arrDoctors: this.props.doctorsRedux
            })
        }
    }

    componentDidMount() {
        this.props.loadToDoctors()
    }

    toggleScheduleModal = () => {
        this.setState({
            isOpenModalSchedule: !this.state.isOpenModalSchedule
        })
    }

    handleOpenSchedule = (doctorId) => {
        this.setState({
            isOpenModalSchedule: true,
            doctorId: doctorId,
            currentDoctorId: doctorId
        })
    }

    handleViewDetail = () => {
        this.props.history.push(`/detailAllSchedule`)
    }

    render() {
            let settings = {
                infinite: false,
                speed: 500,
                slidesToShow: 3,
                slidesToScroll: 1,
            };
            let arrDoctors = this.state.arrDoctors
            arrDoctors = arrDoctors.concat(arrDoctors)
        return (
            <div className="doctor">
                <div className="doctor-container">
                    <div className="title">
                        <h1>Đội ngũ bác sĩ bệnh viện</h1>
                        <button onClick={() => this.handleViewDetail()}>Xem thêm</button>
                    </div>
                    <div className="slider-doctor-container">
                        <Slider {...settings}>
                            
                            {arrDoctors && arrDoctors.length > 0 
                                && arrDoctors.map((item, index) => {
                                    let imageBase64 = ''
                                    if(item.image){
                                        imageBase64 = new Buffer(item.image, 'base64').toString('binary') 
                                    }
                                    let name = `${item.positionData.valueVI} ${item.lastName} ${item.firstName}`
                                    return(
                                        <div className='option-doctor' key={index} >
                                            <img style={{backgroundImage: `url(${imageBase64})`, backgroundSize: 'cover', backgroundRepeat:'no-repeat', backgroundPosition: '50% 50%'}}></img>
                                            <h3>{name}</h3>
                                            <button onClick={() => this.handleOpenSchedule(item.id)}>Lịch khám</button>
                                        </div>
                                    )
                                })
                            }
                        </Slider>
                        <ModalSchedule 
                            isOpen = {this.state.isOpenModalSchedule} 
                            toggleScheduleModal = {this.toggleScheduleModal}
                            doctorIdFromParent = {this.state.currentDoctorId}
                        />
                    </div>

                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        doctorsRedux: state.admin.doctors
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadToDoctors: () => dispatch(actions.fetchDoctor())
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Doctor));


