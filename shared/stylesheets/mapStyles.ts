import { StyleSheet } from 'react-native'

const mapStyles = StyleSheet.create({
    map: {
        flex: 1,
        width: '100%',
        height: '100%'
    },
    marker: {
        flexDirection: 'row',
        alignSelf: 'flex-start',
        alignItems: 'center',
        flexShrink: 1,
    },
    markerText: {
        fontSize: 12,
        marginRight: 0,
        flexShrink: 1,
    }
})

export { mapStyles }