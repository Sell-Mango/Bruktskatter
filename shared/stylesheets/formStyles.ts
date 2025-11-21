import { StyleSheet } from 'react-native'

const formStyles = StyleSheet.create({
    checkbox: {
        display: "flex",
        flexDirection: "row",
        gap: 10
    },
    labelText:{
        fontSize: 16,
        color: "#2F5D50",
    },
    textInput: {
        borderWidth: 2,
        borderColor: '#2F5D50',
        borderStyle: "solid",
        borderRadius: 7,
        width: 309,
    },
    requiredStar: {
        color: "#D10000",
        fontSize: 14,
    },
})

export { formStyles }