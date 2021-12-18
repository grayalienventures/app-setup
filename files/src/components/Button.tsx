import React, { Component } from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  TouchableOpacityProps
} from "react-native";
import colors from "../constants/colors";
import * as _ from 'lodash'
interface IButtonProps extends TouchableOpacityProps {
  text: string;
  childern?: React.ReactNode
}


const Button: React.FC<IButtonProps> = (props) => {


  return (
    <TouchableOpacity style={styles.buttonStyle}>
      {props.childern}
    </TouchableOpacity>
  );

}

const styles = StyleSheet.create({
  buttonStyle: {
    backgroundColor: colors.primary,
    height: 45,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 16
  },
  buttonTextStyle: {
    color: colors.containerBg,
    fontWeight: "700",
    fontSize: 16
  }
});
