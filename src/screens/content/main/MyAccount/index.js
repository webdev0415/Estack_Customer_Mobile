import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import MyAccount from './MyAccount';
import * as actions from '../../../../redux/actions';

class MyAccountScreen extends Component {

  state = {
    notifications: this.props.user.notifications,
    showCalendar: false,
    gender: this.props.user.gender,
    date: this.props.user.dob,
    oldDate: this.props.user.dob,

    image: this.props.user.image,
  };
  

  changeGender = (gender) => {
    this.setState({ gender });
    this.props.onUpdateUser({ gender })
  };

  openCalendar = () => this.setState({ showCalendar: true });

  closeCalendar = () => this.setState({ showCalendar: false, date: this.state.oldDate });

  onChangeDate = (date) => this.setState({ date: moment(date).unix() });

  notificationHandler = (notifications) => {
    this.props.onUpdateUser({ notificationsOn: notifications });
    this.setState({ notifications });
  };

  changeImage = (image) => this.setState({ image });

  resetPassword = () => this.props.navigation.navigate('SetPassword');

  logOut = () => this.props.onSignOut();

  dateDone = () => {
    if (this.state.date !== null) {
      this.setState({ oldDate: this.state.date }, () => {
        this.props.onUpdateUser({ DOB: this.state.date });
        this.closeCalendar();
      })
    } else {
      alert('Please, select date.')
    }
  };

  render() {
    const { date, notifications, showCalendar, showGenderPicker, gender, image } = this.state;
    const { onUploadImage } = this.props;

    if (!this.props.user) {
      return null;
    }
    return (
      <MyAccount
        user={this.props.user}
        date={date}
        image={image}
        onUploadImage={onUploadImage}
        changeImage={this.changeImage}
        closeCalendar={this.closeCalendar}
        onChangeDate={this.onChangeDate}
        showCalendar={showCalendar}
        showGenderPicker={showGenderPicker}
        openCalendar={this.openCalendar}
        notifications={notifications}
        resetPassword={this.resetPassword}
        notificationHandler={this.notificationHandler}
        logOut={this.logOut}
        onUpdateUser={this.props.onUpdateUser}
        dateDone={this.dateDone}
        changeGender={this.changeGender}
        gender={gender}
      />
    );
  }
};

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapDispatchToProps = (dispatch) => ({
  onSignOut: () => dispatch(actions.signOutAction()),
  onUpdateUser: (payload) => dispatch(actions.updateUserDetailsAction(payload)),
  onUploadImage: (payload) => dispatch(actions.uploadImageAction(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MyAccountScreen);
