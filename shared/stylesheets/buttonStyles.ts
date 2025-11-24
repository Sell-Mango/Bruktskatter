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
    },
    floatingButton: {
        borderRadius: 34,
        padding: 19,
        margin: 10,
        width: 180,
        textAlign: 'center',
        backgroundColor: '#FFFEE4',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
    }
})

export {buttonStyles}