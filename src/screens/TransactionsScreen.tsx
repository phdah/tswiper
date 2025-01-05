import React from 'react';
import {View, Text} from 'react-native';
import containerStyles from '../styles/containers';
import textStyles from '../styles/text';

const TransactionsScreen = () => {
    return (
        <View style={containerStyles.contaier}>
            <Text style={textStyles.text}>Here are your transactions:</Text>
        </View>
    );
};

export default TransactionsScreen;
