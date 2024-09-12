import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native'; // Adjust import if needed
import { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/hooks/types';
import { themeColors } from '@/hooks';
import DishRow from '@/components/dishRow'; // Import DishRow component

// Type for props using the RootStackParamList
type CartScreenProps = NativeStackScreenProps<RootStackParamList, 'CartScreen'>;

const CartScreen: React.FC<CartScreenProps> = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<CartScreenProps['route']>();

  // Extract cart and meals from route params
  const { cart = {}, meals = {} } = route.params || {};

  // Filter out items that are in the cart
  const cartItems = Object.keys(cart).map(idMeal => ({
    idMeal,
    strMeal: meals[idMeal]?.strMeal || '',
    strMealThumb: meals[idMeal]?.strMealThumb || '',
    quantity: cart[idMeal],
  }));

  return (
    <View className='bg-white flex-1'>
      <TouchableOpacity
        className="absolute left-4 bg-gray-50 p-2 rounded-full shadow"
        onPress={() => navigation.goBack()}
      >
        <AntDesign name="arrowleft" size={25} color={themeColors.bgColor(1)} />
      </TouchableOpacity>
      <View className='justify-center items-center top-1'>
        <Text className='font-bold text-xl'>Your Cart</Text>
      </View>
      <View style={{ backgroundColor: themeColors.bgColor(0.2) }} className='flex-row px-4 items-center mt-7'>
        <MaterialIcons name="delivery-dining" size={50} color="orange" />
        <Text className='flex-1 pl-4'>All Deliveries fulfilled in 30-40 minutes</Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 50 }} className='bg-white pt-5'>
        {cartItems.length === 0 ? (
          <Text className='text-center text-gray-500 mt-5'>Your cart is empty</Text>
        ) : (
          cartItems.map(item => (
            <DishRow
              key={item.idMeal}
              meal={item}
              addToCart={() => {}}
              removeFromCart={() => {}}
              cart={cart} // Pass cart to DishRow
            />
          ))
        )}
      </ScrollView>
      <View style={{ backgroundColor: themeColors.bgColor(0.2) }} className='p-6 px-8 rounded-t-3xl space-y-4'>
        <View className='flex-row justify-between'>
          <Text className='text-gray-700'>Subtotal</Text>
          <Text className='text-gray-700'>$30</Text>
        </View>
        <View className='flex-row justify-between'>
          <Text className='text-gray-700'>Delivery Fee</Text>
          <Text className='text-gray-700'>$30</Text>
        </View>
        <View className='flex-row justify-between'>
          <Text className='text-gray-700 font-bold'>Order Total</Text>
          <Text className='text-gray-700 font-bold'>$60</Text>
        </View>
        <TouchableOpacity className='w-full justify-center items-center rounded-full h-10' style={{ backgroundColor: themeColors.bgColor(1) }}>
          <Text className='font-bold'>Order Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CartScreen;
