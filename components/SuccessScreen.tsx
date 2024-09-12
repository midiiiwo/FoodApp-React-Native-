import React from 'react';
import { View, Text } from 'react-native';

const SuccessScreen = () => {
  return (
    <View className="flex-1 justify-center items-center">
      <Text className="text-green-500 text-xl">Order Placed Successfully!</Text>
    </View>
  );
};

export default SuccessScreen;
