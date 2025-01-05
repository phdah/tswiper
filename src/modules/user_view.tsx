import React, {Component} from 'react';
import {SafeAreaView, TextInput} from 'react-native';
import containerStyles from '../styles/containers';
import objectStyles from '../styles/objects';

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
            <SafeAreaView style={containerStyles.inputContainer}>
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
