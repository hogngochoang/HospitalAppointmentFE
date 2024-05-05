import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import logo1 from "../../../assets/images/icon_dp_5.svg"
import logo2 from "../../../assets/images/icon_dp_4.svg"
import logo3 from "../../../assets/images/icon_dp_3.svg"
import logo4 from "../../../assets/images/icon_dp_1.svg"
import logo5 from "../../../assets/images/icon_dp_2.svg"

import '../HomePage.scss'

class About extends Component {

    render() {

        return (
            <div className="about">
            <div className="heading-container">
                <div className="title">
                    <p>Vì sao chọn chúng tôi ?</p>
                    <h1>Bệnh viện da liễu Hà Nội Cùng Nâng tầm làn da Việt</h1>
                </div>
                <div className="content">
                    <div className="info">
                        <h2>1954</h2>
                        <p>Phát triển từ</p>
                    </div>
                    <div className="info">
                        <h2>144+</h2>
                        <p>Cán bộ nhân viên</p>
                    </div>
                    <div className="info">
                        <h2>23</h2>
                        <p>Bằng khen</p>
                    </div>
                </div>
            </div>
            <div className="detail">
                <div className="title">
                    <h1>Đội ngũ Bác sĩ, Chuyên gia Bệnh viện Da liễu Hà Nội</h1>
                    <p>Với góc nhìn thấu cảm chuyên sâu và thiết thực đối với từng bệnh nhân, chúng tôi luôn xây dựng và hình thành các giải pháp Chăm sóc – Điều trị tối ưu nhất cho từng bệnh nhân nhằm giúp bệnh nhân cải thiện cuộc sống tốt đẹp hơn.</p>
                </div>
                <div className="specilities">
                    <p>VỚI CÁC KHOA CHUYÊN NGÀNH</p>
                    <div className="specility-container">
                        <div className="specility">
                            <h3>Khoa Dược</h3>
                            <img src={logo1}></img>
                        </div>
                        <div className="specility">
                            <h3>Khoa Y Học Cổ Truyền</h3>
                            <img src={logo2}></img>
                        </div>
                        <div className="specility">
                            <h3>Khoa Khám Bệnh</h3>
                            <img src={logo3}></img>
                        </div>
                        <div className="specility">
                            <h3>Khoa Phẫu thuật Laser – VLTL – CSD</h3>
                            <img src={logo4}></img>
                        </div>
                        <div className="specility">
                            <h3>Khoa Điều Trị Tổng Hợp</h3>
                            <img src={logo5}></img>
                        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(About);
