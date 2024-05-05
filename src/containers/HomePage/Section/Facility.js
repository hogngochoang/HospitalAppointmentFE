import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';

import '../HomePage.scss'

class Facility extends Component {
    render() {
        return (
            <div className="facility">
                <div className='title'>
                    <h2>Cơ sở vật chất hiện đại</h2>
                    <p>Chú trọng đầu tư chuyên môn y khoa và hệ thống cơ sở vật chất theo tiêu chuẩn tốt nhất vì mục tiêu mang lại sự hài lòng tuyệt đối cho khách hàng.</p>
                </div>
                <div className='facility-container'>
                    <div className='option' id='equipment'>
                        <h3>Thiết bị máy móc hiện đại</h3>
                    </div>
                    <div className='option' id='hall'>
                        <h3>Sảnh chờ phòng tư vấn khách hàng</h3>
                    </div>
                    <div className='option' id='room'>
                        <h3>Phòng khám, trị liệu</h3>
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

export default connect(mapStateToProps, mapDispatchToProps)(Facility);


