import React, { useEffect } from 'react';
import {
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  Platform,
} from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { Switch } from 'react-native-switch';
import { Dropdown } from 'react-native-material-dropdown';
import ImagePicker from 'react-native-image-picker';

import dateConverter from '../../../../utils/dateConverter';
import AndroidCalendar from '../../../../components/AndroidCalendar';
import CalendarModal from '../../../../components/CalendarModal';
import { images } from '../../../../constants/images';
import CustomButton from '../../../../components/CustomButton';
import styles from './styles';

const options = {
  title: 'Select Avatar',
  noData: true,
  storageOptions: {
    skipBackup: true,
    path: 'images'
  }
};

const MyAccount = (props) => {
  const {
    notifications,
    notificationHandler,
    logOut,
    resetPassword,
    user,
    showCalendar,
    openCalendar,
    date,
    onChangeDate,
    closeCalendar,
    dateDone,
    onUploadImage,
    image,
    changeImage,
  } = props;

  let avatar = user.image ? { uri: user.image.ref } : images['google'];
  useEffect(() => {
    avatar = null;
    avatar = user.image ? { uri: user.image.ref } : images['google'];
  },[user.image]);

  const takeImage = () => {
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);
     
      if (response.didCancel) {
        console.log('User cancelled image picker');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
      else {
        const formData = new FormData();
        const { type, uri, path } = response;
        console.log('response', response);
        const newImage = {
          uri: uri,
          type: type,
          name: Platform.OS === 'android' ? response.fileName : uri.split('/').pop(),
        };
        
        formData.append('file', newImage);
        onUploadImage({ formData, user });
        changeImage({ ref: newImage.uri });
        
      }
    });
  };

  const renderDob = () => {
    if (date) {
      return (
        <TouchableOpacity style={styles.inline_info} onPress={openCalendar}>
          <Text style={styles.key_text}>DOB</Text>
          <Text style={styles.key_text_value}>{dateConverter(date)}</Text>
        </TouchableOpacity>
      )
    } else {
      return (
        <TouchableOpacity style={styles.inline_info} onPress={openCalendar}>
          <Text style={styles.key_text}>DOB</Text>
          <Text style={styles.key_text_value}>----</Text>
        </TouchableOpacity>
      )
    }
  };

  const renderCalendar = () => {
    if (Platform.OS === 'android') {
      return (
        <AndroidCalendar
          date={date}
          onChangeDate={onChangeDate}
          showCalendar={showCalendar}
          closeCalendar={closeCalendar}
          dateDone={dateDone}
        />
      )
    } else {
      return (
        <CalendarModal
          date={date}
          onChangeDate={onChangeDate}
          showCalendar={showCalendar}
          closeCalendar={closeCalendar}
          dateDone={dateDone}
        />
      )
    }

  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.mainContainer}>
        <TouchableOpacity onPress={takeImage}>
          <Image style={styles.image} source={image ? { uri: image.ref } : images['google']}/>
        </TouchableOpacity>
        
        <Text style={styles.user_name}>{user.fullName}</Text>

        <View style={styles.logo}>
          <QRCode
            size={100}
            value={JSON.stringify({
              _id: user._id,
              fullName: user.fullName,
              imageId: user.imageId,
            })}
          />
        </View> 

        <View style={styles.profileContainer}>
          <View style={styles.inline_info}>
            <Text style={styles.key_text}>Email</Text>
            <Text style={styles.key_text_value}>{user.email}</Text>
          </View>

          { renderDob() }

          { renderCalendar() }

          <View style={styles.inline_info}>
            <Text style={styles.key_text}>Gender</Text>
            <Dropdown
              value={props.gender || 'none'}
              dropdownOffset={{ top: -5, right: 0, left: 0, width: 63, height: 15 }}
              itemTextStyle={{ fontFamily: 'Roboto', fontStyle: 'normal', fontWeight: 'normal' }}
              textColor='#000000'
              itemColor='#000000'
              fontSize={12}
              inputContainerStyle={{ borderBottomColor: 'transparent' }}
              containerStyle={{ width: 63, height: 10 }}
              data={[ { value: 'male' }, { value: 'female' } ]}
              onChangeText={props.changeGender}
            />
          </View>



          <View style={styles.inline_info}>
            <Text style={styles.key_text}>Notifications</Text>
            <Switch
              value={notifications}
              onValueChange={value => notificationHandler(value)}
              disabled={false}
              activeText={''}
              inActiveText={''}
              circleSize={16}
              barHeight={22}
              circleBorderWidth={0}
              backgroundActive={'#4076d9'}
              backgroundInactive={'gray'}
              circleActiveColor={'white'}
              circleInActiveColor={'white'}
              changeValueImmediately={true}
              //renderInsideCircle={() => <CustomComponent />} // custom component to render inside the Switch circle (Text, Image, etc.)
              changeValueImmediately={true} // if rendering inside circle, change state immediately or wait for animation to complete
              innerCircleStyle={{ alignItems: "center", justifyContent: "center" }} // style for inner animated circle for what you (may) be rendering inside the circle
              outerCircleStyle={{}} // style for outer animated circle
              renderActiveText={false}
              renderInActiveText={true}
              switchLeftPx={1} // denominator for logic when sliding to TRUE position. Higher number = more space from RIGHT of the circle to END of the slider
              switchRightPx={1.6} // denominator for logic when sliding to FALSE position. Higher number = more space from LEFT of the circle to BEGINNING of the slider
              switchWidthMultiplier={3.2}
            />
          </View>
        </View>

        <CustomButton onPress={logOut} text='Logout' />
        
        {/*<TouchableOpacity
          style={styles.button}
          onPress={resetPassword}
        >
          <Text style={styles.btn_text_reset}>
            Reset Password
          </Text>
        </TouchableOpacity>*/}
      </View>
    </ScrollView>
  );
};

export default MyAccount;
