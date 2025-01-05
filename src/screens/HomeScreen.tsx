import React from 'react';
import {View, Text, Button} from 'react-native';
import containerStyles from '../styles/containers';
import textStyles from '../styles/text';

const HomeScreen = ({navigation}: {navigation: any}) => {
    return (
        <View style={containerStyles.contaier}>
            <Text style={textStyles.text}>Welcome to tswiper!</Text>
            <Button
                title="Go to transactions"
                onPress={() => navigation.navigate('Transactions')}
            />
        </View>
    );
};

export default HomeScreen;
