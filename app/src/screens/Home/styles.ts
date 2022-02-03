import { StyleSheet } from 'react-native';
import {getStatusBarHeight} from 'react-native-iphone-x-helper';

export const styles = StyleSheet.create({
    container:{
        alignItems: 'center',
    },
    header:{
        width: '100%',
        paddingHorizontal: 24,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: getStatusBarHeight() + 26,
        marginBottom: 42,
    },
    close:{
        fontSize: 18,
        color: '#ffff',
    }
})