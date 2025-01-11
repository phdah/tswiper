import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import HomeScreen from './screens/HomeScreen';
import TransactionsScreen from './screens/TransactionsScreen';

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
                    component={TransactionsScreen}
                    initialParams={{state: 'PRIVATE'}}
                />
                <Stack.Screen
                    name="GroupTransactions"
                    component={TransactionsScreen}
                    initialParams={{state: 'GROUP'}}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default TswiperApp;
