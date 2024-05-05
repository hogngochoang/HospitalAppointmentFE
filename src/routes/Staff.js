import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import ManageWaitingPatient from '../containers/System/Staff/ManageWaitingPatient';
import ConfirmedPatient from '../containers/System/Staff/ConfirmedPatient';
import Header from '../containers/Header/Header';
import Navigator from '../containers/Header/Navigator';

class Doctor extends Component {
    render() {
        const { isLoggedIn } = this.props;
        return (
            <React.Fragment>
                {isLoggedIn && <Header />}                
                <div className="system-container">
                    <Navigator />
                    <div className="system-list">
                        <Switch>
                            <Route path="/staff/waiting-patient" component={ManageWaitingPatient} /> 
                            <Route path="/staff/confirmed-patient" component={ConfirmedPatient} />
                        </Switch>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        systemMenuPath: state.app.systemMenuPath,
        isLoggedIn: state.user.isLoggedIn

    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Doctor);
