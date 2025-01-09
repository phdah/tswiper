import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {StyleSheet} from 'react-native';

const containerStyles = StyleSheet.create({
    contaier: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

const textStyles = StyleSheet.create({
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: 'black',
        textAlign: 'center',
        marginVertical: 10,
        letterSpacing: 2,
    },
    subText: {
        fontSize: 18,
        color: 'black',
        textAlign: 'center',
        marginVertical: 10,
        letterSpacing: 2,
    },
});

const buttonStyles = StyleSheet.create({
    button: {
        backgroundColor: 'lightblue',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
        marginVertical: 10,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

const HomeScreen = ({navigation}: {navigation: any}) => {
    return (
        <View style={containerStyles.contaier}>
            <Text style={textStyles.title}>tswiper</Text>
            <Text style={textStyles.subText}>Swipe on your transactions</Text>
            <TouchableOpacity
                style={[buttonStyles.button, {backgroundColor: 'green'}]}
                onPress={() => navigation.navigate('Transactions')}>
                <Text style={buttonStyles.buttonText}>New Transactions</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={buttonStyles.button}
                onPress={() => navigation.navigate('PrivateTransactions')}>
                <Text style={buttonStyles.buttonText}>
                    Private Transactions
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={buttonStyles.button}
                onPress={() => navigation.navigate('GroupTransactions')}>
                <Text style={buttonStyles.buttonText}>Group Transactions</Text>
            </TouchableOpacity>
        </View>
    );
};

export default HomeScreen;
