import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';

import clipboard from "../../../assets/images/icon-clipboard.svg"
import process from "../../../assets/images/icon-123.svg"
import hearset from "../../../assets/images/icon-hearset.svg"
import search from "../../../assets/images/icon-search.svg"
import news from "../../../assets/images/icon-news.svg"
import '../HomePage.scss'

class Menu extends Component {
    render() {
        return (
            <div className="menu">
                <div className="option">
                    <img src={clipboard}></img>
                    <span className="title">Bảng giá dịch vụ đăng ký khám</span>
                </div>
                <div className="option">
                    <img src={process}></img>
                    <span className="title">Hướng dẫn quy trình khám bệnh</span>
                </div>
                <div className="option">
                    <img src={hearset}></img>
                    <span className="title">Hỏi đáp tư vấn chuyên gia</span>
                </div>
                <div className="option">
                    <img src={search}></img>
                    <span className="title">Tra cứu kết quả, thông tin khách hàng</span>
                </div>
                <div className="option">
                    <img src={news}></img>
                    <span className="title">Tin tức y học, câu chuyện khách hàng</span>
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

export default connect(mapStateToProps, mapDispatchToProps)(Menu);


