import React, { useState } from 'react';
import { View, Text,  StatusBar, TextInput, ScrollView } from 'react-native';
import { AntDesign, Feather } from '@expo/vector-icons';
import { themeColors } from "@/hooks";
import Categories from '@/components/categories';
import FeaturedRow from '@/components/featuredRow';
import FeaturedRow1 from '@/components/featuredRow1';
import FeaturedRow2 from '@/components/featuredRow2';
import SearchProduct from '@/components/searchResult';
import { useSearchMeals } from '@/hooks/search';
import { SafeAreaView } from 'react-native-safe-area-context';


const Index = () => {
  const [query, setQuery] = useState('');
  const { meals, loading, searchMeals } = useSearchMeals();

  const handleSearch = (text: string) => {
    setQuery(text);
    if (text) {
      searchMeals(text);
    }
  };

  return (
    <SafeAreaView className='bg-white flex-1'>
      <StatusBar barStyle='dark-content' />
      
      {/* Search Bar Area */}
      <View className='flex-row items-center space-x-2 px-4 pb-2'>
        <View className='flex-row flex-1 items-center p-3 rounded-full border border-black'>
          <AntDesign name='search1' size={25} color='gray' />
          <TextInput
            placeholder='Restaurant'
            value={query}
            onChangeText={handleSearch}
            className='ml-2 flex-1'
          />
          <View className='flex-row items-center space-x-1 border-0 border-l-2 pl-2 border-l-gray-300'>
            <Feather name='map-pin' size={25} color="gray" />
            <Text className='text-gray-600'>Konoha, Accra</Text>
          </View>
        </View>
        <View style={{ backgroundColor: themeColors.bgColor(1) }} className='rounded-full p-3'>
          <Feather name="sliders" size={20} strokeWidth={2.5} color="white" />
        </View>
      </View>
      
      {/* Main content Area */}
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 20 }}>
        {/* Categories */}
        <Categories />
        
        {/* Search Results */}
        {query ? (
          <SearchProduct meals={meals} loading={loading} />
        ) : (
          <View className='mt-5'>
            <FeaturedRow/>
            <FeaturedRow1/>
            <FeaturedRow2/>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Index;
