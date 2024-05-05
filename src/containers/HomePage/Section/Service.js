import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import 'bootstrap/dist/css/bootstrap.min.css';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import banner1 from "../../../assets/images/banner-service-1.png"
import banner2 from "../../../assets/images/banner-service-2.jpg"
import banner3 from "../../../assets/images/banner-service-3.jpg"
import banner4 from "../../../assets/images/banner-service-4.jpg"
import banner5 from "../../../assets/images/banner-service-5.jpg"
import banner6 from "../../../assets/images/banner-service-6.jpg"
import '../HomePage.scss'

class Service extends Component {
    render() {
            let settings = {
                infinite: true,
                speed: 500,
                slidesToShow: 3,
                slidesToScroll: 1,
                autoplay: true,
            };
        return (
            <div className="service">
                <div className="service-container">
                    <div className="title">
                        <h1>Dịch vụ nổi bật</h1>
                        <h3>Chúng tôi mang đến cho bạn không chỉ làn da khỏe mạnh mà còn sự tự tin và sự hài lòng về ngoại hình</h3>
                    </div>
                    <div className="slider-container">
                        <Slider {...settings}>
                            <div className='option' id='op1'>
                                <div className='title'>
                                    <p>Chăm sóc da, Điều trị da</p>
                                    <h3>Điều trị triệt lông bằng công nghệ Ih3L</h3>
                                </div>
                            </div>
                            <div className='option' id='op2'>
                                <div className='title'>
                                    <p>Chăm sóc da, Điều trị da</p>
                                    <h3>Điều trị các loại sẹo (lồi, lõm, xấu)</h3>
                                </div>
                            </div>
                            <div className='option' id='op3'>
                                <div className='title'>
                                    <p>Chăm sóc da, Điều trị da</p>
                                    <h3>Điều trị Laser nốt ruồi – hạt cơm – u nhú</h3>
                                </div>
                            </div>
                            <div className='option' id='op4'>                    
                                <div className='title'>
                                    <p>Điều trị da, Làm đẹp</p>
                                    <h3>Tiêm meso trẻ hóa da – công nghệ HOT nhất 2024</h3>
                                </div>
                            </div>
                            <div className='option' id='op5'>
                                <div className='title'>
                                    <p>Điều trị da, Làm đẹp</p>
                                    <h3>Mesotherapy xóa bỏ nếp nhăn vùng mắt hiệu quả, an toàn</h3>
                                </div>
                            </div>
                            <div className='option' id='op6'>                                
                                <div className='title'>
                                    <p>Điều trị da, Làm đẹp</p>
                                    <h3>Điều trị rụng tóc bằng Meso – Bệnh viện Da Liễu Hà Nội </h3>
                                </div>
                            </div>
                            
                        </Slider>
                    </div>

                </div>
            </div>
        )
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

export default connect(mapStateToProps, mapDispatchToProps)(Service);


