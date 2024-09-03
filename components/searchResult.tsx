import React from 'react';
import { View, Text, Image, ActivityIndicator, ScrollView } from 'react-native';

interface Meal {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
}

interface SearchProductProps {
  meals: Meal[];
  loading: boolean;
}

const SearchProduct: React.FC<SearchProductProps> = ({ meals, loading }) => {
  if (loading) {
    return <ActivityIndicator size="large" color='#DC4D01' />;
  }

  if (meals.length === 0) {
    return <Text>No meals found.</Text>;
  }

  return (
    <View className='mt-10 items-center justify-center flex-1'>
    <ScrollView  showsVerticalScrollIndicator={false}>
      {meals.map(meal => (
        <View key={meal.idMeal} className='w-56 bg-white rounded-3xl shadow-lg flex-1 flex-col items-center justify-center p-4 m-2'>
          <View style={{ width: 150, height: 150 }}>
            <Image
              source={{ uri: meal.strMealThumb }}
              style={{ width: '100%', height: '100%', borderRadius: 15, resizeMode: 'cover' }}
            />
          </View>
          <View className='p-2'>
            <Text className='font-bold text-lg' numberOfLines={1} ellipsizeMode='tail'>
              {meal.strMeal}
            </Text>
          </View>
        </View>
      ))}
    </ScrollView>
    </View>
  );
};

export default SearchProduct;
