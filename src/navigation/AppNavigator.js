import { createAppContainer, createStackNavigator } from 'react-navigation'; // Version can be specified in package.json
import 'react-native-gesture-handler';
import Root from '../screens/Root';
import IntroScreen from '../screens/auth/IntroScreen';
import Otp from '../screens/auth/OtpLogin';
import RegisterOtp from '../screens/auth/RegisterOtpLogin';
import Login from '../screens/auth/Login';
import SetPassword from '../screens/auth/ResetPassword';
import ForgotPassword from '../screens/auth/ForgotPassword';
import Signup from '../screens/auth/SignUp';
import Main from '../screens/content/main/main';
import StoreCoupon from '../screens/content/main/StoreCoupons';
import NewStoreCoupon from '../screens/content/main/NewStore';

const drwernavigator = createStackNavigator({
  Root: {
    screen: Root,
    navigationOptions: {
      header: null,
    }
  },
  Home: {
    screen: IntroScreen,
    navigationOptions: {
      header: null,
      gesturesEnabled: false,
    }
  },
  Login: {
    screen: Login,
    navigationOptions: {
      header: null,
      gesturesEnabled: false,
    }
  },
  Otp: {
    screen: Otp,
    navigationOptions: {
      header: null,
      gesturesEnabled: false,
    },
  },
  RegisterOtp: {
    screen: RegisterOtp,
    navigationOptions: {
      header: null,
    },
  },
  ForgotPassword: {
    screen: ForgotPassword,
    navigationOptions: {
      header: null,
      gesturesEnabled: false,
    }
  },
  SetPassword: {
    screen: SetPassword,
    navigationOptions: {
      header: null,
      gesturesEnabled: false,
    }
  },
  Signup: {
    screen: Signup,
    navigationOptions: {
      header: null
    }
  },
  Main: {
    screen: Main,
    navigationOptions: {
      header: null
    }
  },
  StoreCoupon: {
    screen: StoreCoupon,
    navigationOptions: {
      gesturesEnabled: false,
    }
  },
  NewStoreCoupon: {
    screen: NewStoreCoupon,
    navigationOptions: {
      gesturesEnabled: false,
    }
  },
}, {
    initialRouteName: 'Main',
  });

export default createAppContainer(drwernavigator)