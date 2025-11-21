import {StyleSheet} from 'react-native'

const buttonStyles = StyleSheet.create({
    defaultButton: {
        borderRadius: 34,
        padding: 19,
        margin: 10,
        width: 300,
        textAlign: 'center',
        backgroundColor: '#1F1D1E'
    },
    buttonBoarder: {
        borderColor: '#1F1D1E',
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderWidth: 2,
    }
})

export {buttonStyles}