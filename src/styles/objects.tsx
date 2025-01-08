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
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        width: '80%',
        color: 'black',
        paddingHorizontal: 10,
        marginBottom: 10,
    },
    swipeActionLeft: {
        backgroundColor: 'green',
        justifyContent: 'center',
        alignItems: 'center',
        width: '50%',
        borderRadius: 10,
    },
    swipeActionRight: {
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
        width: '50%',
        borderRadius: 10,
    },
});

export default objectStyles;
