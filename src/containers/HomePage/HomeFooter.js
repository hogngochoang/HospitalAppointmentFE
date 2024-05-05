import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEnvelope, faArrowAltCircleRight } from '@fortawesome/free-regular-svg-icons'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import logo from "../../assets/images/logo.svg"
import facebook from "../../assets/images/facebook.svg"
import youtube from "../../assets/images/youtube.svg"

import './HomeFooter.scss'

class HomeFooter extends Component {

    render() {

        return (
            <div className="footer">
            <div className='heading'>
                <div className="logo-container">
                    <img src={logo} />
                    <div className="content">
                        <h2 className="title">Bệnh viện Da liễu Hà Nội</h2>
                        <p className="sub-title" style={{color:"#ffffff80"}}>Hanoi Dermatology Hospital</p>
                        <p className="sub-title">Gắn kết - Chuyên tâm - Nâng tầm làn da Việt</p>
                    </div>
                </div>
                <div className='social'>
                    <div className='icon'>
                        <a href="https://www.facebook.com/benhviendalieuhanoi"><img src={facebook}></img></a>
                        <a href="https://www.youtube.com/channel/UCDZIeAdcsPHY-20x6E0JB_g"><img src={youtube}></img></a>
                    </div>
                    <div className='feedback'>
                        <FontAwesomeIcon icon={faEnvelope} id='envelope' />
                        <input type='text' />
                        <button> Gửi </button>
                    </div>
                </div>
            </div>
            <div className='summary'>
                <div className='hospital'>
                    <h3>Bệnh viện</h3>
                    <a href="#" class="links"> <FontAwesomeIcon id="icon" icon={faChevronRight} /> Giới thiệu </a>
                    <a href="#" class="links"> <FontAwesomeIcon id="icon" icon={faChevronRight} /> Cơ cấu tổ chức & Đội ngũ bác sĩ</a>
                    <a href="#" class="links"> <FontAwesomeIcon id="icon" icon={faChevronRight} /> Tin tức và đào tạo </a>
                    <a href="#" class="links"> <FontAwesomeIcon id="icon" icon={faChevronRight} /> Văn bản </a>
                    <a href="#" class="links"> <FontAwesomeIcon id="icon" icon={faChevronRight} /> FAQ </a>
                </div>
                <div className='specilities'>
                    <h3>Khoa</h3>
                    <a href="#" class="links"> <FontAwesomeIcon id="icon" icon={faChevronRight} /> Khoa Dược </a>
                    <a href="#" class="links"> <FontAwesomeIcon id="icon" icon={faChevronRight} /> Khoa Y Học Cổ Truyền</a>
                    <a href="#" class="links"> <FontAwesomeIcon id="icon" icon={faChevronRight} /> Khoa Khám Bệnh </a>
                    <a href="#" class="links"> <FontAwesomeIcon id="icon" icon={faChevronRight} /> Khoa Phẫu thuật Laser – VLTL – CSD </a>
                    <a href="#" class="links"> <FontAwesomeIcon id="icon" icon={faChevronRight} /> Khoa Điều Trị Tổng Hợp </a>
                </div>
                <div className='services'>
                    <h3>Dịch vụ</h3>
                    <a href="#" class="links"> <FontAwesomeIcon id="icon" icon={faChevronRight} /> Đặt lịch hẹn khám </a>
                    <a href="#" class="links"> <FontAwesomeIcon id="icon" icon={faChevronRight} /> Bảng giá dịch vụ</a>
                    <a href="#" class="links"> <FontAwesomeIcon id="icon" icon={faChevronRight} /> Chăm sóc da </a>
                    <a href="#" class="links"> <FontAwesomeIcon id="icon" icon={faChevronRight} /> Điều trị da </a>
                    <a href="#" class="links"> <FontAwesomeIcon id="icon" icon={faChevronRight} /> Làm đẹp  </a>

                </div>
                <div className='location'>
                    <h3> Hệ thống Bệnh viện</h3>
                    <div className='address' id='cs1'>
                        <h4>Cơ sở 1</h4>
                        <div>
                            <h3>79B Nguyễn Khuyến, Q. Đống Đa, TP. Hà Nội</h3>
                            <h3>Điện thoại: 0903 479 619</h3>
                        </div>
                    </div>
                    <div className='address'>
                        <h4>Cơ sở 2</h4>
                        <div>
                            <h3>20 Bế Văn Đàn, Hà Đông, Hà Nội</h3>
                            <h3>Điện thoại: 0903 479 619</h3>
                        </div>
                    </div>
                    <div className='address'>
                        <h4>Cơ sở 3</h4>
                        <div>
                            <h3>Khoa Điều trị Nội trú Quốc Oai, Quốc Oai, Hà Nội</h3>
                            <h3>Điện thoại: 0903 479 619</h3>
                        </div>
                    </div>
                </div>
            </div>
            <div className='credit'>
                <p>Bản quyền 2024 © thuộc về <strong>Bệnh viện Da Liễu Hà Nội</strong></p>
                <a href="">
                    <p>Điều khoản sử dụng</p>
                    <p>Liên hệ</p>
                </a>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
