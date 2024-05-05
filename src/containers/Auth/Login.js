import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";

import * as actions from "../../store/actions";

import './LoginNew.scss';
import {handleLogin} from '../../services/userService';
import { FormattedMessage } from 'react-intl';
import {banner} from '../../assets/images/recruitment-article-banner.svg'


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            errMessage: ''
        }
    }
    
    handleOnChangeUsername = (e) =>{
        this.setState({
            username: e.target.value,
        }) 
    }

    handleOnChangePassword = (e) =>{
        this.setState({
            password: e.target.value,
        }) 
    }

    handleLogin = async () => {
        this.setState({
            errMessage: ''
        })

        try{
            let data = await handleLogin(this.state.username, this.state.password)
            if(data && data.errCode !== 0){
                this.setState({
                    errMessage : data.message
                })
            }
            if(data && data.errCode === 0){
                this.props.userLoginSuccess(data.userData)
            }

        } catch(error) {
            if(error){
                if(error.response.data){
                    this.setState({
                        errMessage: error.response.data.message
                    })
                }
            }
            console.log(error.response)

        }

    }

    handleKeyDownEmail = (e) => {
        if(e.key === 'Enter'){
            e.preventDefault(); 
            const passwordField = document.getElementById('password'); 
            if (passwordField) {
                passwordField.focus(); 
            }
        }
    }

    handleKeyDown = (e) => {
        if(e.key === 'Enter'){
            this.handleLogin()
        }
    }
    
    render() {

        return (
            <div className='login-container'>
                <div className="container" id="container">
                    <div className="form-container sign-in">
                        <form>
                            <h1>Đăng nhập</h1>
                            <input type='email' placeholder='Email' value={this.state.username}
                                onChange={e => this.handleOnChangeUsername(e) }
                                onKeyDown={e => this.handleKeyDownEmail(e)}
                            />
                            <input type='password' placeholder="Mật khẩu" id='password' value={this.state.password}
                                onChange={e => this.handleOnChangePassword(e)}
                                onKeyDown={e => this.handleKeyDown(e)}
                            />
                            <input id='error'  value={this.state.errMessage} />
                            <button type='button' onClick={() => {this.handleLogin()}}>Đăng nhập</button>
                        </form>
                    </div>
                    <div className="toggle-container">
                        <div className="toggle">
                            <div className="toggle-panel toggle-left">
                                {/* <h1>Welcome Back!</h1>
                                <p>Enter your personal details to use all of site features</p>
                                <button className="hidden" id="login">Sign In</button> */}
                            </div>
                            <div className="toggle-panel toggle-right">
                                {/* <h1>Hello, Friend!</h1>
                                <p>Register with your personal details to use all of site features</p>
                                <button className="hidden" id="register">Sign Up</button> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            // {/* // <div className='container'>
            // //     <div className='form-container'> 
            // //         <h2>Đăng nhập</h2>
            // //         <div className={'info-container'}>
            // //             <label>Email</label>
            // //             <input type='email' value={this.state.username} 
            // //                 onChange={e => this.handleOnChangeUsername(e) }  
            // //             />
            // //             <label> Mật khẩu</label>
            // //             <input type='password' value={this.state.password} 
            // //                 onChange={e => this.handleOnChangePassword(e)}  
            // //                 onKeyDown={e => this.handleKeyDown(e)}
            // //             />
            // //         </div>
            // //         <div className='error' style={{color: 'red'}}>{this.state.errMessage}</div>
            // //         <div className={'submit-container'}>
                
            // //             <input type='checkbox' id='remember-login' />
            // //             <label id='remember-login'>Ghi nhớ đăng nhập</label>
                
            // //             <a className='forgot'>Quên mật khẩu?</a>
            // //         </div>
            // //         <button
            // //             type='submit'
            // //             className={'btn-submit'}
            // //             onClick={() => {this.handleLogin()}}
            // //         > Đăng nhập
            // //         </button>
            // //     </div>
            // // </div> */}
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        userLoginFail: () => dispatch(actions.userLoginFail()),
        userLoginSuccess: (userInfo) => dispatch(actions.userLoginSuccess(userInfo))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
