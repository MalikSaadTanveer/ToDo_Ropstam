import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

import colors from '../utils/colors';
import fonts from '../utils/fonts';
import { HeaderProps } from '../types';


export function Header({ tasksCounter }: HeaderProps) {

  const tasksCounterText = tasksCounter === 1 ? 'task' : 'tasks'

  return (
    <View style={styles.container}>
      <TouchableOpacity >
        <Text style={styles.title}>Ropstam</Text>
      </TouchableOpacity>

      <View style={styles.tasks}>
        <Text style={styles.tasksCounter}>You have </Text>
        <Text style={styles.tasksCounterBold}>{tasksCounter} {tasksCounterText}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingTop: getStatusBarHeight(true) + 16,
    paddingHorizontal: 24,
    paddingBottom: 60,
    backgroundColor: colors.primary,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row'
  },
  title:{
    fontSize: 24,
    color: colors.light,
    fontFamily: fonts.InterBold,
  },
  tasks: {
    alignItems: 'center',
    flexDirection: 'row'
  },
  tasksCounter: {
    fontSize: 15,
    color: colors.light,
    fontFamily: fonts.InterRegular,
  },
  tasksCounterBold: {
    fontSize: 15,
    color: colors.light,
    fontFamily: fonts.InterBold,
  }
});