import {StyleSheet} from 'react-native';

const containerStyles = StyleSheet.create({
    contaier: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    safeArea: {
        flex: 1,
        backgroundColor: 'white',
    },
    mainView: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'black',
    },
    result: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: 'gray',
        backgroundColor: 'white',
        borderWidth: 1,
    },
});

export default containerStyles;
