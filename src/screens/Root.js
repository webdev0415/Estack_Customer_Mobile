import { Component } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import * as actions from "../redux/actions";
import { testAuthAction } from "../redux/actions";

@connect(
  null,
  {
    getUserInfo: actions.getUserAction,
    testAuth: testAuthAction
  }
)
class Root extends Component {
  static navigationOptions = {
    header: null
  };

  static propTypes = {
    testAuth: PropTypes.func
  };

  async componentDidMount() {
    const accessToken = await AsyncStorage.getItem("accessToken");
    accessToken
      ? this.props.getUserInfo()
      : this.props.navigation.replace("Home");
  }

  render() {
    return null;
  }
}

export default Root;
