import React, { Component } from 'react';
import { connect } from "react-redux";
import _, { times } from 'lodash'
import { withRouter } from 'react-router';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import moment from 'moment';
import * as actions from '../../store/actions'
import {getScheduleDoctorById, getDoctorDetailService} from '../../services/userService'
import HomeHeader from './HomeHeader';
import HomeFooter from './HomeFooter';
import Navbar from './Navbar';
import './DetailAllSchedule.scss'

class DetailAllSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrDoctors: [],
            doctorId: '',
            allDays: [],
            allAvailableTime: []
        }
    }

    async componentDidMount() {
        // this.props.loadToDoctors()
        await this.getDataDoctor()
        this.setArrDays();
        this.showSchedule().then(allTime => {
            this.setState({
                allAvailableTime: allTime
            });
        });    
    }

    componentDidUpdate(prevProps, prevState) {
        // if(prevProps.doctorsRedux !== this.props.doctorsRedux){
        //     this.setState({
        //         arrDoctors: this.props.doctorsRedux
        //     })
        // }
    }

    getDataDoctor = async() => {
        let res = await getDoctorDetailService()
        
        if(res && res.errCode === 0){
            this.setState({
                arrDoctors: res.data
            })
        }
    }

    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1)
    } 

    setArrDays = async() => {
        moment.locale('vi', {
            week: { dow: 1 } // Set Monday as the first day of the week
        });
        let daysOfWeek = [];
        let currentDate = moment().startOf('week').utcOffset('+07:00');
        for (let i = 0; i < 7; i++) {
            let dayOfWeek = {}; // Create a new object for each day
            let label = this.capitalizeFirstLetter(currentDate.format('dddd - DD/MM/YYYY'));
            dayOfWeek.label = label;
            dayOfWeek.value = currentDate.clone().startOf('day').valueOf(); // Start of the day in milliseconds
            daysOfWeek.push(dayOfWeek);
            currentDate.add(1, 'day');
        }

        this.setState({
            allDays: daysOfWeek
        })
    } 

    showSchedule = async () => {
        let {arrDoctors}  = this.state;
        let allTime = [];
        console.log('check dr schedule',arrDoctors)
        let allData = await Promise.all(
            arrDoctors && arrDoctors.length>0 && arrDoctors.map(async (item) => {
                let res = await getScheduleDoctorById(item.id);
                console.log('check res data',res.data)
                return res.data;
            })
        ) ;
        allData.map(item => {
            item.map(item => {
                item.date = parseInt(item.date)
            })
        })

        allData.forEach(data => {
            allTime.push(data);
        });
        console.log('check all time',allTime)
        return allTime;
    }

    render() {
        let {allDays, arrDoctors, allAvailableTime} = this.state
        console.log('check state',allAvailableTime, allDays)
        return (
            <div className='detail-all-schedule'>
                <HomeHeader />
                <Navbar />
                <h1>Lịch khám bệnh của các bác sĩ</h1>
                <div className='all-doctor'>
                    {arrDoctors && arrDoctors.length > 0 
                        && arrDoctors.map((doctor, index) => {
                            let imageBase64 = ''
                            if(doctor.image){
                                imageBase64 = new Buffer(doctor.image, 'base64').toString('binary') 
                            }
                            let name = `${doctor.positionData.valueVI} ${doctor.lastName} ${doctor.firstName}`
                            return(
                                <div className='option-doctor' key={index} >
                                    <div className='name'>
                                        <img style={{backgroundImage: `url(${imageBase64})`, backgroundSize: 'cover', backgroundRepeat:'no-repeat', backgroundPosition: '50% 50%'}}></img>
                                        <h3>{name}</h3>
                                    </div>
                                    <div>
                                    <table id='schedule'>
                                        <thead>
                                            <tr>
                                                <th>Ngày</th>
                                                <th>Thời gian</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {allDays && allDays.length > 0 &&
                                                allDays.map((day, index) => {
                                                    let matchingData = allAvailableTime.map(item => item.find(item => parseInt(item.date) === day.value && item.doctorId === doctor.id))
                                                    let matchingData2 = matchingData.filter(element => {
                                                        return element !== null && element !== undefined;
                                                      });
                                                      let newArr = matchingData.map(item => {
                                                        // Nếu phần tử không phải là null, trả về ngay lập tức
                                                        if (item !== undefined) {
                                                            return item;
                                                        } else {
                                                            // Nếu phần tử là null, trả về một object trống
                                                            return {
                                                                dataTime: '',
                                                                doctorId: doctor.id
                                                            }; // hoặc trả về object khác mà bạn muốn chèn vào
                                                        }
                                                    });     
                                                      console.log('unremove undefined',newArr)                                               
                                                      console.log('remove undefined',matchingData)
                                                    let times = newArr ? newArr.map(item => [[item.dataTime], item.doctorId]) : [];
                                                    console.log('check times',times)
                                                    return (
                                                        <tr key={index}> 
                                                            <td>{day.label}</td> 
                                                            <td>

                                                                    {times.length>0 && times.map((time, timeIndex) => {
                                                                        console.log('check time',time)
                                                                        console.log('check time',time[0][0])
                                                                        let hasValue = time[0][0] ? true : false;
                                                                        console.log('check time null',hasValue)
                                                                        if(hasValue === true){
                                                                                return(
                                                                                <ul>    
                                                                                    <li>{time[0][0].map(item => {
                                                                                        return(
                                                                                            <p>{item.valueVI}</p>
                                                                                        )
                                                                                    })}</li>
                                                                                </ul>
                                                                                
                                                                            )
                    
                                                                        } 
                                                                                                                             
                                                                        // return(
                                                                        //     <ul>
                                                                        //         {time.map(item => {
                                                                        //             return( 
                                                                        //                 <li>{item.valueVI}</li>     
                                                                        //             )
                                                                        //     })}  
                                                                        //     </ul>
                                                                            
                                                                        // )

                                                                    }        
                                                                    )}
                                                                
                                                            </td>
                                                        </tr>
                                                    );
                                                })}
                                        </tbody>
                                    </table>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                
                <HomeFooter />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        systemMenuPath: state.app.systemMenuPath,
        doctorsRedux: state.admin.doctors
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadToDoctors: () => dispatch(actions.fetchDoctor())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailAllSchedule);
