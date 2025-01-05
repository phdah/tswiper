import React, {useEffect, useState} from 'react';
import {
    SafeAreaView,
    SectionList,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import containerStyles from '../styles/containers';
import textStyles from '../styles/text';

import dbService from '../modules/sqlite';
import objectStyles from '../styles/objects';
import UserInputView from '../modules/user_view';

const TransactionsScreen = () => {
    const [items, setItems] = useState<Array<{ammount: number}>>([]);

    // Fetch on component mount
    useEffect(() => {
        fetchItems();
    }, []);

    const fetchItems = async () => {
        const data = await dbService.getItems();
        setItems(data);
    };

    const handleAddItems = async (value: string) => {
        dbService.addItems(value);
        fetchItems();
    };

    const handleDeleteItems = async (item: string) => {
        dbService.deleteItems(item);
        fetchItems();
    };

    const DATA = [
        {title: 'Transactions', data: items.map(item => item.ammount)},
    ];

    return (
        <SafeAreaView style={containerStyles.contaier}>
            <SectionList
                sections={DATA}
                keyExtractor={(item, index) => (item + index).toString()}
                renderItem={({item, section}) => (
                    <View style={objectStyles.item}>
                        <Text style={textStyles.text}>{item}</Text>
                        {section.title === 'Transactions' && (
                            <TouchableOpacity
                                onPress={() =>
                                    handleDeleteItems(item.toString())
                                }>
                                <Text style={objectStyles.deleteButton}>
                                    ❌
                                </Text>
                            </TouchableOpacity>
                        )}
                    </View>
                )}
                renderSectionHeader={({section: {title}}) => (
                    <Text style={textStyles.header}>{title}</Text>
                )}
            />
            <UserInputView onEnter={handleAddItems} />
        </SafeAreaView>
    );
};

export default TransactionsScreen;
