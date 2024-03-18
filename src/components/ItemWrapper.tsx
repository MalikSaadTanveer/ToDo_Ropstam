import React, { ReactNode } from 'react';
import { View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import colors from '../utils/colors';

interface ItemWrapperProps {
  index: number;
  children: ReactNode;
}

export function ItemWrapper({ index, children }: ItemWrapperProps) {
  if (index % 2 === 0)
    return (
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        colors={[colors.gradientColor1, colors.gradientColor2]}
        style={{ flex: 1 }}
      >
        {children}
      </LinearGradient>
    )

  return (
    <View style={{ flex: 1 }}>
      {children}
    </View>
  )
}