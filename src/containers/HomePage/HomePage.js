import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomeHeader from './HomeHeader';
import About from './Section/About';
import Facility from './Section/Facility';
import HomeFooter from './HomeFooter';
import Menu from './Section/Menu';
import Service from './Section/Service';
import Doctor from './Section/Doctor';
import Booking from './Section/Booking';
import Navbar from './Navbar';

class HomePage extends Component {

    render() {

        return (
            <div className='homepage-container'> 
                <HomeHeader />
                <Navbar />
                <div className="banner">
                    <div className="content">
                        <h2>1 Triệu làn da đẹp Thủ đô</h2> 
                        <span>Lưu giữ nét xuân, món quà “hơn cả yêu” dành cho phụ nữ</span>
                        <button>Tìm hiểu thêm  </button>
                    </div>
                </div>
                <Booking />
                <Doctor />
                <Menu />
                <Service />
                <About />
                <Facility />
                <HomeFooter />
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

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
