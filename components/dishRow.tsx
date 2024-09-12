import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import { themeColors } from '@/hooks';

interface DishRowProps {
  meal: {
    idMeal: string;
    strMeal: string;
    strMealThumb: string;
  };
  addToCart: (idMeal: string) => void;
  removeFromCart: (idMeal: string) => void;
  cart: { [idMeal: string]: number };
}

const DishRow: React.FC<DishRowProps> = ({ meal, addToCart, removeFromCart, cart }) => {
  const quantity = cart[meal.idMeal] || 0;

  return (
    <View className='flex-row items-center bg-white p-3 rounded-3xl shadow-2xl mb-3 mx-2'>
      <Image className="rounded-3xl" style={{ height: 100, width: 100 }} source={{ uri: meal.strMealThumb }} />
      <View className='flex flex-1 ml-3'>
        <Text className="text-lg font-semibold">{meal.strMeal}</Text>
        <Text className='text-gray-700 font-bold text-lg'>$30.99</Text>
        <View className='flex-row justify-end items-center mt-2'>
          <TouchableOpacity
            className='p-1 rounded-full'
            style={{ backgroundColor: themeColors.bgColor(1) }}
            onPress={() => removeFromCart(meal.idMeal)}
            disabled={quantity === 0}
          >
            <AntDesign name='minus' size={20} color={"white"} />
          </TouchableOpacity>
          <Text className='px-3'>{quantity}</Text>
          <TouchableOpacity
            className='p-1 rounded-full'
            style={{ backgroundColor: themeColors.bgColor(1) }}
            onPress={() => addToCart(meal.idMeal)}
          >
            <AntDesign name='plus' size={20} color={"white"} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default DishRow;
