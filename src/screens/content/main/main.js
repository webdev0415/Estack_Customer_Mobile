import React from 'react';
import { Text } from 'react-native';
import { createBottomTabNavigator, createAppContainer, createStackNavigator } from 'react-navigation';
import MyAccount from './MyAccount'
import HomeScreen from './Home'
import TransactionScreen from './Transactions'
import headerLeft from '../../../components/MainNavigation/headerLeft';
import headerRight from '../../../components/MainNavigation/headerRight';
import { headerTitleStyle, headerStyle, tabBarOptions } from '../../../constants/navigationStyles';
import { SvgXml } from 'react-native-svg';

const HomeStack = createStackNavigator({
    Home: {
        screen: HomeScreen,
        navigationOptions: {
            headerRight: headerRight(),
            headerLeft: headerLeft,
            title: 'Home',
            headerTitleStyle: headerTitleStyle,
            headerStyle: headerStyle,
        }
    }
});

const TransactionStack = createStackNavigator({
    Transactions: {
        screen: TransactionScreen,
        navigationOptions: {
            HeaderTitle: "My Account",
            headerRight: headerRight(),
            headerLeft: headerLeft,
            title: 'Transaction',
            headerTitleStyle: headerTitleStyle,
            headerStyle: headerStyle,
        }
    }
});
const MyAccountStack = createStackNavigator({
    MyAccount: {
        screen: MyAccount,
        navigationOptions: {
            HeaderTitle: "My Account",
            headerRight: headerRight(),
            headerLeft: headerLeft,
            title: 'My Account',
            headerTitleStyle: headerTitleStyle,
            headerStyle: headerStyle,
        }
    }
});




const TabNavigator = createBottomTabNavigator(
    {
        Home: {
            screen: HomeStack,
            navigationOptions: {
                tabBarLabel: "Home",
                tabBarIcon: ({ tintColor }) => (
                    <SvgXml xml={
                        `
<svg width="18" height="18" viewBox="0 0 18 18" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
<g fill="#ffffff" fill-rule="evenodd">
        <path fill="#ffffff" stroke-width=".5" d="M14.003 16.2V9.506a.6.6 0 0 1 .6-.6l1.299.002-6.912-7.03L2.097 8.89l1.305.002a.6.6 0 0 1 .599.6V16.2h2.598v-2.6a1.4 1.4 0 0 1 1.4-1.4h2.002a1.4 1.4 0 0 1 1.4 1.4v2.6h2.602z"/>
        <path fill="#ffffff" stroke=${tintColor} stroke-width="1.5" d="M14.603 8.707h-.8V15.4a.6.6 0 0 1-.6.6h-3.002a.6.6 0 0 1-.6-.6v-2.8a.6.6 0 0 0-.6-.6H6.999a.6.6 0 0 0-.6.6v2.8a.6.6 0 0 1-.6.6H2.8a.6.6 0 0 1-.6-.6V8.693L.599 8.69a.6.6 0 0 1-.414-1.033l7.39-7.49a.6.6 0 0 1 .83-.001l7.41 7.509a.6.6 0 0 1-.416 1.032h-.796v-.001z" transform="translate(1 1)"/>
    </g>
</svg>
`} width="50%" height="50%" />
                )
            },
        },
        Transactions: {
            screen: TransactionStack,
            navigationOptions: {
                tabBarLabel: "Transactions",
                tabBarIcon: ({ tintColor }) => (
                    <SvgXml xml={`
                    <svg width="130px" height="100px" viewBox="0 0 130 150" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                    <g id="Artboard" stroke="none" stroke-width="1" fill="red" fill-rule="evenodd">
                    <path d="M152.5,95 C156.642136,95 160,98.3578644 160,102.5 C160,103.976464 159.573361,105.353281 158.83664,106.513895 C158.579877,107.080004 158.246984,107.622741 157.837527,108.128378 L117.561022,157.86572 C114.954291,161.084764 110.231568,161.581142 107.012524,158.974411 C103.79348,156.367681 103.297102,151.644958 105.903832,148.425914 L137.02,110 L0,110 L0,95 L152.5,95 Z" id="Combined-Shape" fill=${tintColor}></path>
                        <path d="M152.5,-9.26541687 C156.642136,-9.26541687 160,-5.90755249 160,-1.76541687 C160,-0.288952842 159.573361,1.08786438 158.83664,2.24847854 C158.579877,2.81458668 158.246984,3.35732419 157.837527,3.86296126 L116.617041,54.7660217 L104.959852,45.3262159 L137.02,5.73458313 L0,5.73458313 L0,-9.26541687 L152.5,-9.26541687 Z" id="Combined-Shape" fill=${tintColor} transform="translate(80.000000, 22.750302) scale(-1, -1) translate(-80.000000, -22.750302) "></path>
                    </g>
                    </svg>
                    `} width="50%" height="50%" />
                )
            },
        },
        MyAccount: {
            screen: MyAccountStack,
            navigationOptions: {
                tabBarLabel: "My Account",
                tabBarIcon: ({ tintColor }) => (

                    <SvgXml xml={
                        `
<svg width="16" height="17" viewBox="0 0 16 17" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
<g id="Artboard"  fill="#000">
<path fill=${tintColor}  d="M15.372 13.873a7.99 7.99 0 0 0-1.715-2.552A7.99 7.99 0 0 0 11.115 9.6l-.026-.01a5.291 5.291 0 0 0 2.188-4.294C13.277 2.371 10.915 0 8 0S2.723 2.37 2.723 5.296c0 1.767.862 3.332 2.188 4.295-.009.005-.017.007-.026.011a7.921 7.921 0 0 0-2.542 1.721A8.024 8.024 0 0 0 0 16.825.171.171 0 0 0 .17 17h1.277a.17.17 0 0 0 .17-.167 6.379 6.379 0 0 1 1.868-4.363A6.329 6.329 0 0 1 8 10.593c1.706 0 3.308.666 4.515 1.877a6.379 6.379 0 0 1 1.868 4.363.169.169 0 0 0 .17.167h1.277a.17.17 0 0 0 .17-.175 7.985 7.985 0 0 0-.628-2.952zM8 8.97a3.629 3.629 0 0 1-2.587-1.077A3.657 3.657 0 0 1 4.34 5.296c0-.98.381-1.902 1.073-2.597A3.629 3.629 0 0 1 8 1.623c.977 0 1.896.382 2.587 1.076a3.657 3.657 0 0 1 1.073 2.597c0 .98-.381 1.903-1.073 2.597A3.629 3.629 0 0 1 8 8.97z"/>
</g>
</svg>
`} width="50%" height="50%" />
                )
            },
        },
    },
    {
        defaultNavigationOptions: {
            tabBarOptions: {
                activeTintColor: '#4dbff6',
                inactiveTintColor: 'black',
                style: tabBarOptions,
            },

        }
    }
);

export default createAppContainer(TabNavigator);
