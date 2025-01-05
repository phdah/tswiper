import React, {Component} from 'react';
import {
    SafeAreaView,
    StyleSheet,
    TextInput,
} from 'react-native';

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
        if (inputText.trim()) {
            this.props.onEnter(inputText);
            this.setState({inputText: ''});
        }
    };

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <TextInput
                    style={styles.input}
                    placeholder="Type here..."
                    placeholderTextColor="lightgrey"
                    onChangeText={this.handleInputChange}
                    onSubmitEditing={this.handleEnter}
                    value={this.state.inputText} // Controlled input
                />
            </SafeAreaView>
        );
    }
}

// Centralized Styles
const styles = StyleSheet.create({
    container: {padding: 10, alignItems: 'center'},
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

export default UserInputView;
