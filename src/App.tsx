import React, {useEffect, useState} from 'react';
import {
    SafeAreaView,
    SectionList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

import UserInputView from './modules/user_view.tsx';
import dbService from './modules/sqlite.tsx';

const TswiperApp = () => {
    const [items, setItems] = useState<Array<{name: string}>>([]);

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
        {title: 'Items', data: items.map(item => item.name)},
    ];

    const view = (
        <SafeAreaView style={styles.safeArea}>
            <SectionList
                sections={DATA}
                keyExtractor={(item, index) => item + index}
                renderItem={({item, section}) => (
                    <View style={styles.item}>
                        <Text style={styles.text}>{item}</Text>
                        {section.title === 'Items' && (
                        <TouchableOpacity
                            onPress={() => handleDeleteItems(item)}>
                            <Text style={styles.deleteButton}>❌</Text>
                        </TouchableOpacity>
                        )}
                    </View>
                )}
                renderSectionHeader={({section: {title}}) => (
                    <Text style={styles.header}>{title}</Text>
                )}
            />
            <UserInputView onEnter={handleAddItems} />
        </SafeAreaView>
    );
    return view;
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: 'white',
    },
    mainView: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'black',
    },
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: 'lightgrey',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        backgroundColor: 'lightgrey',
        padding: 10,
    },
    result: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: 'gray',
        backgroundColor: 'white',
        borderWidth: 1,
    },
    text: {
        flex: 1,
        fontSize: 18,
        color: 'black',
    },
    deleteButton: {
        fontSize: 18,
        color: 'red',
        fontWeight: 'bold',
        marginLeft: 10,
    },
});

export default TswiperApp;
