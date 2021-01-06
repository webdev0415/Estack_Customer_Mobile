import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import * as actions from '../../../../redux/actions';
import NewStoreCoupon from './NewStoreCoupon';
import styles from './styles';

class NewStore extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.getParam('brandName'),
    headerTitleStyle: styles.headerTitleStyle,
  });

  state = {
    visible: false,
  };

  componentDidMount() {
    this.props.onGetCurrentStore({ _id: this.props.navigation.getParam('id') });
  };

  cancelHandler = () => this.setState({ visible: false });

  openConvert = () => {
    const min = 1 / this.props.stores.currentShop.business.pointCurrency.calcFactor;
    
    if (this.props.stores.currentShop.points < min) {
      alert('You don`t have enough points for minimal conversion')
    } else {
      this.setState({ visible: true });
    }
  }

  join = () => this.props.onJoin({ _id: this.props.navigation.getParam('id') });

  gotoexistingstore = () =>
    this.props.navigation.navigate('StoreCoupon', {
      brandName: this.props.stores.currentShop.business.brandName,
      currentShop: this.props.stores.currentShop,
      user: this.props.user,
    });

  render() {
    const { visible } = this.state;
    const { stores, user, onCreateCoupon } = this.props;

    if (!stores.currentShop || !user) {
      return null;
    }
    return (
      <NewStoreCoupon
        user={user}
        join={this.join}
        visible={visible}
        point_value={_.floor(stores.currentShop.points)}
        openConvert={this.openConvert}
        onCreateCoupon={onCreateCoupon}
        currentShop={stores.currentShop}
        cancelHandler={this.cancelHandler}
        gotoexistingstore={this.gotoexistingstore}
      />
    )
  }
}

const mapStateToProps = (state) => ({
  stores: state.stores,
  user: state.user,
});

const mapDispatchToProps = (dispatch) => ({
  onGetCurrentStore: (payload) => dispatch(actions.getCurrentStoreAction(payload)),
  onCreateCoupon: (payload) => dispatch(actions.createCouponAction(payload)),
  onClearCurrentShop: () => dispatch(actions.clearCurrentStoreAction()),
  onJoin: (payload) => dispatch(actions.joinToStoreAction(payload)),
});


export default connect(mapStateToProps, mapDispatchToProps)(NewStore);
