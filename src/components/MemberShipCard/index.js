import React from 'react';
import {
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import Dash from 'react-native-dash';

import { pointerConfig } from '../../utils/pointerConfig';
import { images } from '../../constants/images';
import Card from './Сard';
import styles from './styles';

class MemberShipCard extends React.Component {

  viewCouponsButton = () => {
    if (this.props.currentShop.customerTier) {
      return (
        <TouchableOpacity style={styles.btn_view} onPress={this.props.gotostore}>
          <Text style={styles.btn_text}>View Coupons</Text>
        </TouchableOpacity>
      );
    }
  }

  render() {
    const { currentShop } = this.props;

      let config = {
        point: 0,
        dialog: 0,
      };
      
      if (currentShop.customerTier) {
        config = pointerConfig(currentShop, currentShop.maxPoints);
      } 

      const { point, dialog } = config;

      return (
        <View>
          <View style={styles.mainContainer}>
            <Text style={styles.memeber_benifit}>Membership Benefits</Text>
            { this.viewCouponsButton() }
          </View>


          <View style={styles.basic_card_align}>
              <View style={{ position: 'relative' }}>
                <View style={styles.horiz_line_top}/>
                <Dash style={styles.side_border} dashColor='rgba(74, 74, 74, 0.18)' dashGap={0} dashLength={6} dashThickness={1} />
                <View style={styles.half_circle1}/>
                <ImageBackground
                  style={[
                    styles.current_memeber1,
                    {
                      opacity: currentShop.customerTier && currentShop.customerTier.userLoyaltyTier.tierLevel === 3 ? 1 : 0,
                      top: `${dialog}%`
                    }
                  ]}
                  source={images['group-31']}
                >
                  <Text style={styles.current_memeber_value}>{currentShop.maxPoints}</Text>
                </ImageBackground>
              <View
                style={[
                  styles.pointer1,
                  {
                    opacity: currentShop.customerTier && currentShop.customerTier.userLoyaltyTier.tierLevel === 3 ? 1 : 0,
                    top: `${point}%`
                  }
                ]}
              />
            </View>

        <Card
          memberShip={currentShop.business.loyaltyTiers[2].tierName}
          ratio={currentShop.business.loyaltyTiers[2].multiplier}
          birthday={currentShop.business.loyaltyTiers[2].bornDayReward || '0'}
          welcome={currentShop.business.loyaltyTiers[2].welcomeReward || '0'}
          minPoints={currentShop.business.loyaltyTiers[2].pointThreshold}
          background='clubMember'
        />
      </View>


      <View style={styles.basic_card_align}>
          <View style={{ position: 'relative' }}>
          <Dash
            style={styles.side_border}
            dashColor='rgba(74, 74, 74, 0.18)'
            dashGap={0}
            dashLength={6}
            dashThickness={1}
          />
          <View style={styles.half_circle2}/>
          <ImageBackground
            style={[
              styles.current_memeber2,
              {
                opacity: currentShop.customerTier && currentShop.customerTier.userLoyaltyTier.tierLevel === 2 ? 1 : 0,
                top: `${dialog}%`
              }
            ]} 
            source={images['group-31']}
          >
            <Text style={styles.current_memeber_value}>{currentShop.maxPoints}</Text>
          </ImageBackground>
          <View
            style={[
              styles.pointer2,
              {
                opacity: currentShop.customerTier && currentShop.customerTier.userLoyaltyTier.tierLevel === 2 ? 1 : 0,
                top: `${point}%`
              }
            ]}
          />

      </View>
      <Card
        memberShip={currentShop.business.loyaltyTiers[1].tierName}
        ratio={currentShop.business.loyaltyTiers[1].multiplier}
        birthday={currentShop.business.loyaltyTiers[1].bornDayReward || '0'}
        welcome={currentShop.business.loyaltyTiers[1].welcomeReward || '0'}
        minPoints={currentShop.business.loyaltyTiers[1].pointThreshold}
        background='platinumMember'
      />
    </View>

    <View style={styles.basic_card_align}>
        <View style={{ position: 'relative' }}>
          <Dash
            style={styles.side_border}
            dashColor='rgba(74, 74, 74, 0.18)'
            dashGap={0}
            dashLength={6}
            dashThickness={1}
          />
          <View style={styles.half_circle2}/>
          <ImageBackground
            style={[
              styles.current_memeber2,
              {
                opacity: currentShop.customerTier && currentShop.customerTier.userLoyaltyTier.tierLevel === 1 ? 1 : 0,
                top: `${dialog}%`
              },
            ]}
            source={images['group-31']}
          >
            <Text style={styles.current_memeber_value}>
              {currentShop.maxPoints}
            </Text>
          </ImageBackground>
          <View style={[
            styles.pointer2,
              { 
                opacity: currentShop.customerTier && currentShop.customerTier.userLoyaltyTier.tierLevel === 1 ? 1 : 0,
                top: `${point}%`
              }
            ]}
          />
          <View style={styles.horiz_line_bottom}/>
      </View>
      
      <Card
        memberShip={currentShop.business.loyaltyTiers[0].tierName}
        ratio={currentShop.business.loyaltyTiers[0].multiplier}
        birthday={currentShop.business.loyaltyTiers[0].bornDayReward || '0'}
        welcome={currentShop.business.loyaltyTiers[0].welcomeReward || '0'}
        minPoints={currentShop.business.loyaltyTiers[0].pointThreshold}
        background='goldMember'
      />
    </View>
  </View>
)}}

export default MemberShipCard;
