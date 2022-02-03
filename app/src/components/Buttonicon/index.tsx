import React from "react";
import {
  View,
  Text,
  Image,
  ImageBackground,
} from "react-native";
import { styles } from "./styles";
import UserImg from '../../assets/button.png';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';

type Props = RectButtonProps & {
  title?: string,
}

export function Buttonicon({ title, ...rest }: Props) {
  return (
    <RectButton
      style={styles.container}
      {...rest}
    >
      <ImageBackground source={UserImg} resizeMode="cover" style={styles.background}>
        <Text style={styles.title}>{title}</Text>
      </ImageBackground>
    </RectButton>
  );
}