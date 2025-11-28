import {StyleSheet} from 'react-native'

const imageStyles = StyleSheet.create({
    defaultImage: {

    },
    roundImage: {
        width: '100%',
        height: '100%',
        backgroundColor: 'transparent',
        borderRadius: 300,
    },
    authenticationImage: {
        width: '50%',
        height: '20%',
        backgroundColor: 'transparent',
    },
    shopListImage: {
        width: 90,
        height: 90,
        margin: 5,
    }
})

export {imageStyles}