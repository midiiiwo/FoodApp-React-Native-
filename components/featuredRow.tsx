import React, { useEffect, useState } from 'react';
import { AntDesign } from '@expo/vector-icons';
import { View, Text, Image, ActivityIndicator, TouchableOpacity, ScrollView, TouchableWithoutFeedback } from 'react-native';
import { themeColors } from '@/hooks';
import { useNavigation } from 'expo-router';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/hooks/types'; // Adjust import path as necessary

interface Meal {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
}

const FeaturedRow = () => {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [loading, setLoading] = useState(true);
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
      } finally {
        setLoading(false);
      }
    };

    fetchMeals();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color='#DC4D01' />;
  }

  const displayedMeals = showAll ? meals : meals.slice(0, 5);

  return (
    <View>
      <Text className='text-xl font-bold mb-4'>Featured Seafood</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15, paddingVertical: 10 }}
        className='overflow-visible'
      >
        {displayedMeals.length > 0 ? (
          displayedMeals.map(meal => (
            <TouchableWithoutFeedback
              key={meal.idMeal}
              onPress={() => navigation.navigate('resturantScreen', { mealId: meal.idMeal })}
            >


              <View className='mr-6 bg-white rounded-3xl shadow-lg'>
                <View style={{ width: 150, height: 150 }}>
                  <Image
                    source={{ uri: meal.strMealThumb }}
                    style={{
                      width: '100%',
                      height: '100%',
                      borderRadius: 15,
                      resizeMode: 'center',
                    }}
                  />
                </View>
                <View className='p-2'>
                  <Text
                    className='font-bold text-lg'
                    numberOfLines={1}
                    ellipsizeMode='tail'
                    style={{ width: 150 }}
                  >
                    {meal.strMeal}
                  </Text>
                  <Text
                    className='text-gray-500 text-xs'
                    numberOfLines={1}
                    ellipsizeMode='tail'
                    style={{ width: 150 }}
                  >
                    {meal.strMeal}
                  </Text>
                  <View className='mt-1 flex-row'>
                    <AntDesign name='star' size={15} color='#D4AF37' />
                    <Text className='text-gray-500 ml-3'>review(5.4)</Text>
                  </View>
                </View>
              </View>
            </TouchableWithoutFeedback>
          ))
        ) : (
          <Text>No meals found.</Text>
        )}
      </ScrollView>
      <View className='flex-row justify-end px-4 py-2'>
        <TouchableOpacity onPress={() => setShowAll(!showAll)}>
          <Text style={{ color: themeColors.bgColor(1) }} className='font-semibold'>
            {showAll ? 'Show Less' : 'See All'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default FeaturedRow;
