import React from 'react';
import {
  Text,
  View,
  ScrollView,
  Platform,
  Image,
  RefreshControl,
} from 'react-native';
import _ from 'lodash';

import EmptyBlock from '../../../../components/EmptyBlock';
import ToogleListButton from '../../../../components/ToogleListButton';
import MyMemberShipCard from '../../../../components/MyMemberShipCard';
import NewStoresList from '../../../../components/NewStoresList';
import { images } from '../../../../constants/images';
import styles from './styles';

const Home = (props) => {
  const {
    goToStore,
    goToCoupons,
    availableShops,
    myMemberShips,
    wallet,
    refreshing,
    onRefresh,
  } = props;


  const renderMemberShips = () => (
    myMemberShips.length > 0
    ? <MyMemberShipCard goToStore={goToCoupons} seeAllMemberShips={props.seeAllMemberShips} memberShips={myMemberShips} />
    : <EmptyBlock content='You do not have any active memberships. Checkout stores near you and Join their membership program.' />
  );

  const renderNewStores = () => (
    availableShops.length > 0
    ? <NewStoresList seeAllStores={props.seeAllStores} memberShips={myMemberShips} goToStore={goToStore} stores={availableShops} />
    : <EmptyBlock content='You do not have any new stores.' /> 
  );

  const renderToogleListMemberShipButton = () => {
    if (myMemberShips.length > 3) {
      return (
        <ToogleListButton schedule={props.seeAllMemberShips} switchFunc={props.switchMemberShipList} />
      )
    }
  };

  const renderToogleListNewStoresButton = () => {
    if (availableShops.length > 6) {
      return (
        <ToogleListButton schedule={props.seeAllStores} switchFunc={props.switchStoresList} />
      )
    }
  };

  return (
    <ScrollView
      contentContainerStyle={styles.scrollContainer}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      }
    >
      <View style={styles.mainContainer}>
        <View style={styles.subContainer1}>
          <Text style={styles.reward_text}>
            Rewards Summary
          </Text>
          <View style={styles.card_align}>
            <View style={styles.reward_summary_card}>
              <Text style={styles.point_text}>
                Balance Points
              </Text>
              <View style={styles.card_inside}>
                <Image style={styles.pointsIcon} source={images['group-10']} />  
                <Text style={styles.card_value}>
                  {_.floor(wallet.pointsAmount)}
                </Text>                           
              </View>
            </View>
            <View style={styles.reward_summary_card}>
              <Text style={styles.point_text}>
                Value
              </Text>
              <Text style={[styles.card_value1, { marginTop:Platform.OS === 'ios' ? 0 : -1 }]}>
                $ {_.floor(wallet.currencyAmount, 2)}
              </Text>
            </View>
          </View>
        </View>
        <View style={[styles.memberShipContainer, { alignItems: 'center', justifyContent: 'center' }]}>
          <View style={{ flex: 1, flexDirection: 'row' }}>
            <Text style={styles.reward_text}>
              Your Memberships
            </Text>
            { renderToogleListMemberShipButton() }
          </View>
          { renderMemberShips() }
        </View>
        <View style={styles.newStoresContainer}>
          <View style={{ flex: 1, flexDirection: 'row' }}>
            <Text style={styles.reward_text}>
              New Stores
            </Text>
            { renderToogleListNewStoresButton() }
          </View>
          { renderNewStores() }
        </View>
      </View>
    </ScrollView>
  );
};

export default Home;
