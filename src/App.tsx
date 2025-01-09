import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import HomeScreen from './screens/HomeScreen';
import TransactionsScreen from './screens/TransactionsScreen';
import PrivateTransactionsScreen from './screens/PrivateTransactionsScreen';
import GroupTransactionsScreen from './screens/GroupTransactionsScreen';

const TswiperApp = () => {
    const Stack = createNativeStackNavigator();
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen
                    name="Transactions"
                    component={TransactionsScreen}
                />
                <Stack.Screen
                    name="PrivateTransactions"
                    component={PrivateTransactionsScreen}
                />
                <Stack.Screen
                    name="GroupTransactions"
                    component={GroupTransactionsScreen}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default TswiperApp;
