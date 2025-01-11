import React, {useEffect, useMemo, useState} from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import dbService from '../modules/sqlite';

const TransactionsScreen = ({route}: {route: any}) => {
    const {state} = route.params;
    const db = dbService;
    const [sum, setSum] = useState<number>(0);
    const [items, setItems] = useState<{id: number; value: number}[]>([]);

    const {sumCallback, itemsCallback} = useMemo(() => {
        switch (state) {
            case db.dbConfig.states.PRIVATE:
                return {
                    sumCallback: db.getPrivateSumOfItems.bind(db),
                    itemsCallback: db.getPrivateItems.bind(db),
                };
            case db.dbConfig.states.GROUP:
                return {
                    sumCallback: db.getGroupSumOfItems.bind(db),
                    itemsCallback: db.getGroupItems.bind(db),
                };
            default:
                throw new Error('No state passed');
        }
    }, [state]);

    const fetchSum = async () => {
        try {
            const sumValue = await sumCallback();
            setSum(sumValue);
        } catch (error) {
            console.log('Error fetching sum:', error);
        }
    };
    const fetchItems = async () => {
        try {
            const itemList = await itemsCallback();
            setItems(
                itemList.map(item => ({
                    id: item.id,
                    value: item.amount,
                })),
            );
        } catch (error) {
            console.log('Error fetching sum:', error);
        }
    };

    useEffect(() => {
        fetchItems();
        fetchSum();
    }, []);

    const handlePress = (item: {id: number; value: number}) => {
        console.log(
            'Unset button press on private id:',
            item.id,
            ' Value:',
            item.value,
        );
        db.updateItems(item.id, db.dbConfig.states.UNSET);
        fetchItems();
        fetchSum();
    };

    const renderItems = ({item}: {item: {id: number; value: number}}) => {
        return (
            <View style={styles.listItem}>
                <Text style={styles.itemText}>{item.value}</Text>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => handlePress(item)}>
                    <Text style={styles.buttonText}>UNSET</Text>
                </TouchableOpacity>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.sumContainer}>
                <Text style={styles.sumText}>Value: {sum}</Text>
            </View>

            <FlatList
                data={items}
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

export default TransactionsScreen;
