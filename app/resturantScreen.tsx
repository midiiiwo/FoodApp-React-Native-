import React, { useEffect, useState } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { View, Text, Image, TouchableOpacity, ScrollView, StatusBar } from 'react-native';
import { themeColors } from '@/hooks';
import { useNavigation } from '@react-navigation/native'; 
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/hooks/types';
import { AntDesign, EvilIcons } from '@expo/vector-icons';
import DishRow from '@/components/dishRow';
import CartComponent from '@/components/cartComponent';
import LottieView from 'lottie-react-native'; 
import burnerAnimation from '@/assets/burger.json'; 

interface Meal {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
}

const RestaurantScreen = () => {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [cart, setCart] = useState<{ [idMeal: string]: number }>({}); // Cart state
  const [loading, setLoading] = useState(true);
  const [animationComplete, setAnimationComplete] = useState(false); 
  const [showAll, setShowAll] = useState(false);

  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const response = await fetch('https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood');
        const data = await response.json();
        setMeals(data.meals);
      } catch (error) {
        console.error('Error fetching meals:', error);
      }
    };

    fetchMeals();

    const timeout = setTimeout(() => {
      setAnimationComplete(true);
      setLoading(false);
    }, 4000);

    return () => clearTimeout(timeout);
  }, []);

  const addToCart = (mealId: string) => {
    setCart((prevCart) => ({
      ...prevCart,
      [mealId]: (prevCart[mealId] || 0) + 1,
    }));
  };

  const removeFromCart = (mealId: string) => {
    setCart((prevCart) => {
      const newCart = { ...prevCart };
      if (newCart[mealId] > 1) {
        newCart[mealId] -= 1;
      } else {
        delete newCart[mealId];
      }
      return newCart;
    });
  };

  const displayedMeals = showAll ? meals : meals.slice();

  if (loading || !animationComplete) {
    return (
      <View className="flex-1 justify-center items-center">
        <LottieView source={burnerAnimation} autoPlay loop style={{ width: 150, height: 150 }} />
      </View>
    );
  }

  return (
    <View className="relative">
      <StatusBar barStyle="light-content" />
      <CartComponent cart={cart} meals={Object.fromEntries(meals.map(meal => [meal.idMeal, meal]))} /> 
      <ScrollView>
        <View>
          <Image className="w-full h-72" source={require('@/assets/restaurants/theimage.jpg')} />
          <TouchableOpacity
            className="absolute top-14 left-4 bg-gray-50 p-2 rounded-full shadow"
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={25} color={themeColors.bgColor(1)} />
          </TouchableOpacity>
        </View>
        <View style={{ borderTopLeftRadius: 40, borderTopRightRadius: 40 }} className="bg-white -mt-12 pt-6">
          <View className="px-5">
            <Text className="text-3xl font-bold">PAPA JOHNS</Text>
            <View className="mt-1 flex-row">
              <AntDesign name="star" size={15} color="#D4AF37" />
              <Text className="text-gray-500 ml-3 mr-3">review(5.4)</Text>
              <EvilIcons name="location" size={15} color="gray" />
              <Text className="text-gray-500 ml-3">Konoha 22-street, Accra</Text>
            </View>
            <View>
              <Text className="text-gray-500 mt-2">Enjoy the best food from Papa John's Konoha branch</Text>
            </View>
          </View>
        </View>
        <View className="pb-36 bg-white">
          <Text className="px-4 py-4 font-bold text-2xl">Menu</Text>
          {displayedMeals.map((meal) => (
            <DishRow 
              key={meal.idMeal} 
              meal={meal} 
              addToCart={addToCart} 
              removeFromCart={removeFromCart} 
              cart={cart} 
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default RestaurantScreen;
