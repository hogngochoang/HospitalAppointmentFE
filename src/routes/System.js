import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import UserManage from '../containers/System/UserManage';
import UserRedux from '../containers/System/Admin/UserRedux';
import RegisterPackageGroupOrAcc from '../containers/System/RegisterPackageGroupOrAcc';
import Header from '../containers/Header/Header';
import Navigator from '../containers/Header/Navigator';
import ManageSchedule from '../containers/System/Doctor/ManageSchedule';
import ManageDoctor from '../containers/System/Admin/ManageDoctor';
import ManageStatistic from '../containers/System/Admin/ManageStatistic'
import './System.scss'


class System extends Component {
    render() {

        const { systemMenuPath, isLoggedIn } = this.props;
        return (
            <React.Fragment>
                {isLoggedIn && <Header />}
                <div className="system-container">
                    <Navigator />
                    <div className="system-list">
                        <Switch>
                            <Route path="/system/manage-user" component={UserRedux} />
                            <Route path="/system/manage-doctor" component={ManageDoctor} />
                            <Route path="/system/manage-schedule" component={ManageSchedule} />
                            <Route path="/system/manage-statistic" component={ManageStatistic} />
                            {/* <Route component={() => { return (<Redirect to={systemMenuPath} />) }} /> */}
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

export default connect(mapStateToProps, mapDispatchToProps)(System);
