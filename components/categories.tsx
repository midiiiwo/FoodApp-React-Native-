import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import getCategories from '@/hooks/data';

interface Category {
  idCategory: string;
  strCategory: string;
  strCategoryThumb: string;
  strCategoryDescription: string;
}

const Categories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      const data = await getCategories();
      setCategories(data);
    };

    fetchCategories();
  }, []);

  return (
    <View className="mt-4">
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="overflow-visible"
        contentContainerStyle={{
          paddingHorizontal: 15,
        }}
      >
        {categories.map((category, index) => {
          let isActive = category.idCategory === activeCategory;
          let btnClass = isActive ? 'bg-gray-600' : 'bg-gray-200';
          let textClass = isActive ? 'font-semibold text-gray-800' : 'text-gray-500';

          return (
            <View key={index} className="flex justify-center items-center mr-4">
              <TouchableOpacity
                onPress={() => setActiveCategory(category.idCategory)}
                className={`p-1 rounded-full shadow ${btnClass}`}
              >
                <Image
                  style={{ width: 60, height: 60 , resizeMode:"contain"}}
                  source={{ uri: category.strCategoryThumb }}
                />
              </TouchableOpacity>
              <Text className={`text-sm mt-2 ${textClass}`}>{category.strCategory}</Text>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default Categories;
