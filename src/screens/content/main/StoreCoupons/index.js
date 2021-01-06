import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import geolocation from '@react-native-community/geolocation'

import * as actions from '../../../../redux/actions';
import StoreCoupons from './StoreCoupons';
import styles from './styles';


class StoreCoupon extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.getParam('brandName'),
    headerTitleStyle: styles.headerTitle,
  })


  constructor(props) {
    super(props);
    this.state = {
      user: this.props.itemId,
      showCoupon: false,
      currentCoupon: null,
      user: this.props.navigation.getParam('user'),
      convertVisible: false,
      spinner: false,
      currentCouponIndex: 0,
    }
  };

  componentDidMount() {
    const _id = this.props.navigation.getParam('id');

    if (_id) {
      this.props.onGetCurrentStore({ _id });
      this.props.onGetCoupons({ businessId: _id })
    } else {
      this.props.onGetCurrentStore({ _id: this.props.stores.currentShop.business._id })
      this.props.onGetCoupons({ businessId: this.props.stores.currentShop.business._id });
    }
  };

  openConvert = () => {
    const min = 1 / this.props.stores.currentShop.business.pointCurrency.calcFactor;
    
    if (this.props.stores.currentShop.points < min) {
      alert('You don`t have enough points for minimal conversion')
    } else {
      this.setState({ convertVisible: true });
    }
  };
  
  closeConvert = () => {
    this.setState({ convertVisible: false })
  };

  startSpinner = () => this.setState({ spinner: true });

  onSwipeUp = (gestureState) => this.setState({ showCoupon: false, currentCoupon: null });

  onSwipeDown = (gestureState) => this.setState({ showCoupon: false, currentCoupon: null });

  showCouponHandler = (item, index) => this.setState({ showCoupon: true, currentCoupon: item, currentCouponIndex: index });

  showCouponModal = () => this.setState({ visible: true });

  learnMore = () => this.props.navigation.push('NewStoreCoupon', { id: this.props.navigation.getParam('id'), brandName: this.props.navigation.getParam('brandName') })

  redeem = (id, businessId) => {
    geolocation.getCurrentPosition(
      pos => this.props.onRedeemCoupon({ _id: id, businessId, coords: { lat: pos.coords.latitude, lng: pos.coords.longitude } }),
      error => console.log('errorLocation', error),
      { enableHighAccuracy: false, timeout: 20000 },
    )
    
  }

  render() {
    const { user, showCoupon, currentCoupon, convertVisible, spinner, currentCouponIndex } = this.state;
    const { coupons, onCreateCoupon } = this.props;
    const { currentShop } = this.props.stores;

    if (!currentShop || !currentShop.customerTier || !coupons) {
      return null;
    }
    return (
      <StoreCoupons
        user={user}
        redeem={this.redeem}
        spinner={spinner}
        currentCoupon={currentCoupon}
        coupons={coupons}
        currentShop={currentShop}
        convertVisible={convertVisible}
        onCreateCoupon={onCreateCoupon}
        openConvert={this.openConvert}
        closeConvert={this.closeConvert}
        onSwipeUp={this.onSwipeUp}
        onSwipeDown={this.onSwipeDown}
        showCouponHandler={this.showCouponHandler}
        showCoupon={showCoupon}
        showCouponModal={this.showCouponModal}
        learnMore={this.learnMore}
        startSpinner={this.startSpinner}
        currentCouponIndex={currentCouponIndex}
      />
  )}
};

const mapStateToProps = (state) => ({
  coupons: state.coupons.coupons,
  stores: state.stores,
  user: state.user,
});

const mapDispatchToProps = (dispatch) => ({
  onGetCurrentStore: (payload) => dispatch(actions.getCurrentStoreAction(payload)),
  onRedeemCoupon: (payload) => dispatch(actions.redeemCouponAction(payload)),
  onCreateCoupon: (payload) => dispatch(actions.createCouponAction(payload)),
  onGetCoupons: (payload) => dispatch(actions.getCouponsAction(payload)),
  onClearCurrentShop: () => dispatch(actions.clearCurrentStoreAction()),
  onJoin: (payload) => dispatch(actions.joinToStoreAction(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(StoreCoupon);
