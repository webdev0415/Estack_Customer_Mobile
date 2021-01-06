import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../../../redux/actions';
import Home from './Home';

class HomeScreen extends Component {
  state = {
    refreshing: false,
    seeAllStores: false,
    seeAllMemberShips: false,
  };

  componentDidMount() {
    this.props.onGetAvailableShops();
    this.props.onGetMyMemberShips();
    this.props.onGetWalletData();

    this.props.onClearCurrentShop();
    this.props.onClearCoupons();
  };

  onRefresh = () => {
    this.setState({ refreshing: true });

    this.props.onGetAvailableShops();
    this.props.onGetMyMemberShips();
    this.props.onGetWalletData();

    setTimeout(() => this.setState({ refreshing: false }), 1500);
  }

  switchStoresList = () => this.setState({ seeAllStores: !this.state.seeAllStores });
  switchMemberShipList = () => this.setState({ seeAllMemberShips: !this.state.seeAllMemberShips });

  goToStore = (id, brandName) => {
    this.props.onClearCoupons();
    this.props.onClearCurrentShop();
    this.props.navigation.push('NewStoreCoupon', { id, brandName });
  }

  goToCoupons = (id, brandName) => {
    this.props.onClearCurrentShop();
    this.props.onClearCoupons();
    this.props.navigation.push('StoreCoupon', { id, brandName, user: this.props.user });
  }

  render() {
    const { refreshing } = this.state;
    const { availableShops, myMemberShips } = this.props.stores;

    if (!this.props.stores.availableShops || !this.props.stores.myMemberShips) {
      return null;
    }
    return (
      <Home
        wallet={this.props.wallet}
        goToStore={this.goToStore}
        refreshing={refreshing}
        onRefresh={this.onRefresh}
        seeAllStores={this.state.seeAllStores}
        seeAllMemberShips={this.state.seeAllMemberShips}
        switchStoresList={this.switchStoresList}
        switchMemberShipList={this.switchMemberShipList}
        availableShops={availableShops}
        myMemberShips={myMemberShips}
        goToCoupons={this.goToCoupons}
      />
    );
  }
};

const mapStateToProps = (state) => ({
  user: state.user,
  stores: state.stores,
  wallet: state.wallet,
});

const mapDispatchToProps = (dispatch) => ({
  onGetAvailableShops: () => dispatch(actions.getAvailableShopsAction()),
  onGetMyMemberShips: () => dispatch(actions.getMyMemberShipsAction()),
  onClearCurrentShop: () => dispatch(actions.clearCurrentStoreAction()),
  onClearCoupons: () => dispatch(actions.clearCouponsAction()),
  onGetWalletData: () => dispatch(actions.getWalletDataActions()),
});


export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
