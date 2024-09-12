import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { themeColors } from '@/hooks';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from "@/hooks/types";

type CartScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'CartScreen'>;

interface CartComponentProps {
  cart: { [idMeal: string]: number };
  meals: { [idMeal: string]: { strMeal: string; strMealThumb: string } };
}

const CartComponent: React.FC<CartComponentProps> = ({ cart, meals }) => {
  const navigation = useNavigation<CartScreenNavigationProp>();

  const totalItems = Object.values(cart).reduce((acc, quantity) => acc + quantity, 0);
  const totalPrice = totalItems * 30.99;

  return (
    <View className="absolute bottom-5 w-full z-10 px-5">
      {totalItems > 0 && (
        <TouchableOpacity
          className="flex-row justify-between items-center p-4 rounded-full"
          style={{ backgroundColor: themeColors.bgColor(1) }}
          onPress={() => navigation.navigate('CartScreen', { cart, meals })}
        >
          <Text className="font-bold text-white text-lg">View Cart</Text>
          <Text className="font-extrabold text-white text-lg">${totalPrice.toFixed(2)}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default CartComponent;
