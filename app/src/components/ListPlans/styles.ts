import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        height: 255,
        width: 320,
        backgroundColor: '#2d3644',
        borderRadius: 4,
    },
    column: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 10,
    },
    content:{
        width: '30%',
        alignItems: 'center',
    },
    title: {
        fontSize: 16,
        color: '#ffff',
        textAlign: 'center',
    }
})