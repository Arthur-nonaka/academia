import React, { useState } from "react";
import {
  Button,
  TextInput,
  Card,
  MD3LightTheme as PaperTheme,
} from "react-native-paper";
import { StyleSheet, View } from "react-native";
import axios from "axios";

const HomeScreen = () => {
  return <View style={styles.container}></View>;
};

const styles = StyleSheet.create({
  card: { margin: 10, padding: 10 },
  margem: { marginTop: 5 },
  container: { flex: 1, backgroundColor: PaperTheme.colors.elevation.level1 },
});

export default HomeScreen;
