import {StyleSheet} from 'react-native';

const objectStyles = StyleSheet.create({
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: 'lightgrey',
    },
    deleteButton: {
        fontSize: 18,
        color: 'red',
        fontWeight: 'bold',
        marginLeft: 10,
    },
});

export default objectStyles;
