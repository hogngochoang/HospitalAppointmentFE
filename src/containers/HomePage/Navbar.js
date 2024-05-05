import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import SwiperCore, { Navigation, Pagination, Scrollbar, Autoplay } from 'swiper/core';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import logo from "../../assets/images/logo.svg"

// import 'swiper/swiper-bundle.css';
// import 'swiper/components/navigation/navigation.min.css';
// import 'swiper/components/pagination/pagination.min.css';
import './HomeHeader.scss'

// SwiperCore.use([Navigation, Pagination, Scrollbar, Autoplay]);

class HomeHeader extends Component {

    render() {

        return (
            <div className="navbar-container">
                <div className="navbar">
                    <a href="/home" id="home"> TRANG CHỦ </a>
                    <div className='dropdown'>
                        <a href="" id="service"> DỊCH VỤ <FontAwesomeIcon icon={faChevronDown} /> </a>
                        <div className="dropdown-content">
                            <a href=''>Điều trị da</a>
                            <a href=''>Chăm sóc da</a>
                            <a href=''>Làm đẹp</a>
                        </div>
                    </div>
                    <div className='dropdown'>
                        <a href="" id="news"> TIN TỨC <FontAwesomeIcon icon={faChevronDown} /> </a>
                        <div className="dropdown-content">
                                <a href=''>Tin bệnh viện</a>
                                <a href=''>Tin hoạt động</a>
                                <a href=''>Sống khỏe</a>
                                <a href=''>Tin video</a>
                                <a href=''>Câu chuyện khách hàng</a>
                                <a href=''>Bệnh về da</a>
                                <a href=''>Quản lý chất lượng</a>
                        </div>
                    </div>
                    <div className='dropdown'>
                        <a href="" id="training"> ĐÀO TẠO <FontAwesomeIcon icon={faChevronDown} /> </a>
                        <div className="dropdown-content">
                                <a href=''>Kế hoạch đào tạo năm 2024</a>
                                <a href=''>Thông tin đào tạo</a>
                                <a href=''>Liên kết đào tạo</a>
                                <a href=''>Nghiên cứu khoa học</a>
                                <a href=''>Hội nghị, tập huấn</a>
                                <a href=''>Tin đào tạo</a>
                        </div>
                    </div>
                    <div className='dropdown'>
                        <a href="" id="about"> VỀ BỆNH VIỆN <FontAwesomeIcon icon={faChevronDown} /> </a>
                        <div className="dropdown-content">
                                <a href=''>Giới thiệu</a>
                                <a href=''>Cơ cấu tổ chức</a>
                                <a href=''>Đội ngũ bác sĩ</a>
                                <a href=''>Khoa lâm sàng</a>
                                <a href=''>Phòng chức năng, cận lâm sàng</a>
                        </div>
                    </div>
                    <div className='dropdown'>
                        <a href="" id="text"> VĂN BẢN <FontAwesomeIcon icon={faChevronDown} /> </a>
                        <div className="dropdown-content">
                                <a href=''>Văn bản bệnh viện</a>
                                <a href=''>Văn bản BHXH</a>
                                <a href=''>Văn bản Bộ Y tế</a>
                                <a href=''>Văn bản đào tạo</a>
                                <a href=''>Văn bản Sở Y tế</a>
                                <a href=''>Tuyển dụng</a>
                        </div>
                    </div>
                </div>               
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
