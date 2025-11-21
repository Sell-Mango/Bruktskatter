import { StyleSheet } from 'react-native'

const mapStyles = StyleSheet.create({
    map: {
        flex: 1,
        width: '100%',
        height: '100%'
    },
    marker: {
        alignSelf: 'flex-start',
        padding: 6,
        borderRadius: 12,
        backgroundColor: "#ffffff",
        borderWidth: 1,
    }
})

export { mapStyles }