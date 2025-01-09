import React, {Component} from 'react';
import {SafeAreaView, TextInput} from 'react-native';
import {StyleSheet} from 'react-native';

const objectStyles = StyleSheet.create({
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        width: '80%',
        color: 'black',
        paddingHorizontal: 10,
        marginBottom: 10,
    },
});

const containerStyles = StyleSheet.create({
    container: {padding: 10, alignItems: 'center'},
    deleteButtonContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
});

interface UserViewProp {
    onEnter: (value: string) => void;
}

class UserInputView extends Component<UserViewProp> {
    state = {
        inputText: '',
    };

    handleInputChange = (text: string) => {
        this.setState({inputText: text}); // Update state when input changes
    };

    handleEnter = () => {
        const {inputText} = this.state;
        // Guard against bad input
        const numericValue = parseInt(inputText, 10);
        if (!isNaN(numericValue)) {
            this.props.onEnter(inputText);
            this.setState({inputText: ''});
        } else {
            console.error('Invalid numeric input:', inputText);
        }
    };

    render() {
        return (
            <SafeAreaView style={containerStyles.container}>
                <TextInput
                    style={objectStyles.input}
                    placeholder="Type here..."
                    placeholderTextColor="lightgrey"
                    onChangeText={this.handleInputChange}
                    onSubmitEditing={this.handleEnter}
                    keyboardType="numeric"
                    value={this.state.inputText} // Controlled input
                />
            </SafeAreaView>
        );
    }
}

export default UserInputView;
