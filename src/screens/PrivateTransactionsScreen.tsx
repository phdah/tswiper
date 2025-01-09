import React from 'react';
import {
    Button,
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
// import dbService from '../modules/sqlite';

const PrivateTransactionsScreen = () => {
    // Get amounts and set to cards
    // db = dbService;
    // items = this.db.getPrivateItems();
    const initialItems = [
        {id: 1, value: 100},
        {id: 2, value: 50},
        {id: 3, value: 75},
    ];

    const renderItems = ({item}: {item: {id: number; value: number}}) => {
        return (
            <View style={styles.listItem}>
                <Text style={styles.itemText}>Value: {item.value}</Text>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => console.log('Button press on private:', item.value)}>
                    <Text style={styles.buttonText}>LOG</Text>
                </TouchableOpacity>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.sumContainer}>
                <Text style={styles.sumText}>Value: 1000</Text>
            </View>

            <FlatList
                data={initialItems}
                renderItem={renderItems}
                keyExtractor={item => item.id.toString()}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    sumContainer: {
        padding: 20,
        borderRadius: 10,
        backgroundColor: 'green',
        marginBottom: 20,
        alignItems: 'center',
    },
    sumText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
    },
    listItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: 'lightgrey',
        backgroundColor: 'white',
        borderRadius: 8,
        marginBottom: 10,
    },
    itemText: {
        fontSize: 18,
    },
    button: {
        backgroundColor: 'lightblue',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});

export default PrivateTransactionsScreen;
