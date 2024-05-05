import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import SwiperCore, { Navigation, Pagination, Scrollbar, Autoplay } from 'swiper/core';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPhoneVolume,faClock, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import logo from "../../assets/images/logo.svg"

// import 'swiper/swiper-bundle.css';
// import 'swiper/components/navigation/navigation.min.css';
// import 'swiper/components/pagination/pagination.min.css';
import './HomeHeader.scss'

// SwiperCore.use([Navigation, Pagination, Scrollbar, Autoplay]);

class HomeHeader extends Component {

    render() {

        return (
            <div className="header-container">
            <div className="intro">
                <div className="logo-container">
                    <a className="logo">
                        <img src={logo} />
                    </a>
                    <div className="content">
                        <h2 className="title">Bệnh viện Da liễu Hà Nội</h2>
                        <p className="sub-title">Hanoi Dermatology Hospital</p>
                        <p className="sub-title">Gắn kết - Chuyên tâm - Nâng tầm làn da Việt</p>
                    </div>
                </div>
                <div className="support-container">
                    <div className="contact">
                        <FontAwesomeIcon icon={faPhoneVolume} id="phone-icon" />
                        <div className="phonenumber">
                            <p>HỖ TRỢ 24/7</p>
                            <h4><strong>0903 479 619</strong></h4>
                        </div>
                    </div>
                    <div className="time-location">
                        <div className="time">
                            <FontAwesomeIcon icon={faClock} id="time-icon" />
                            <p>Giờ làm việc</p>
                            <h4><strong>7:30 - 17:30</strong></h4>
                        </div>
                        <div className="hospital-location">
                        <FontAwesomeIcon icon={faLocationDot} id="location-icon" />
                            <p>Địa điểm</p>
                            <h4><strong>79B Nguyễn Khuyến, Văn Miếu, Đống Đa, Hà Nội</strong></h4>
                        </div>
                    </div>
                </div>
            </div>
            {/* <div className="navbar-container">
                <div className="navbar">
                    <a href="" id="home"> TRANG CHỦ </a>
                    <div>
                        <a href="" id="service"> DỊCH VỤ </a>
                        <div className="dropdown-content">
                            <a>Điều trị da</a>
                            <a>Chăm sóc da</a>
                            <a>Làm đẹp</a>
                        </div>
                    </div>
                    <div>
                        <a href="" id="news"> TIN TỨC </a>
                        <div className="dropdown-content">
                                <a>Tin bệnh viện</a>
                                <a>Tin hoạt động</a>
                                <a>Sống khỏe</a>
                                <a>Tin video</a>
                                <a>Câu chuyện khách hàng</a>
                                <a>Bệnh về da</a>
                                <a>Quản lý chất lượng</a>
                        </div>
                    </div>
                    <div>
                        <a href="" id="training"> ĐÀO TẠO </a>
                        <div className="dropdown-content">
                                <a>Kế hoạch đào tạo năm 2024</a>
                                <a>Thông tin đào tạo</a>
                                <a>Liên kết đào tạo</a>
                                <a>Nghiên cứu khoa học</a>
                                <a>Hội nghị, tập huấn</a>
                                <a>Tin đào tạo</a>
                        </div>
                    </div>
                    <div>
                        <a href="" id="about"> VỀ BỆNH VIỆN </a>
                        <div className="dropdown-content">
                                <a>Giới thiệu</a>
                                <a>Cơ cấu tổ chức</a>
                                <a>Đội ngũ bác sĩ</a>
                                <a>Khoa lâm sàng</a>
                                <a>Phòng chức năng, cận lâm sàng</a>
                        </div>
                    </div>
                    <a href="" id="text"> VĂN BẢN </a>
                    <div className="dropdown-content">
                            <a>Văn bản bệnh viện</a>
                            <a>Văn bản BHXH</a>
                            <a>Văn bản Bộ Y tế</a>
                            <a>Văn bản đào tạo</a>
                            <a>Văn bản Sở Y tế</a>
                            <a>Tuyển dụng</a>
                    </div>
                </div>               
            </div> */}
        </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
