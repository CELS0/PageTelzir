import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        width: '1%',
        height: '1%',
    },
    title: {
        color: '#FFFFFF',
        fontSize: 38,
    },
    label: {
        color: '#FFFFFF',
        fontSize: 16,
        alignItems: 'flex-start',
        marginTop: 12,
        alignSelf: 'flex-start',
        marginLeft: 32,
        marginBottom: 8,
    },
    content: {
        marginTop: 28,
        alignSelf: 'center',
        marginBottom: 8,
    },
    register:{
        color: '#FFFFFF',
    },
    checked:{
        width: '120%',
        marginTop: 22,
        flexDirection: 'row',
        marginLeft: 22,
        justifyContent: 'space-around',
        alignItems: 'center',
    },
})