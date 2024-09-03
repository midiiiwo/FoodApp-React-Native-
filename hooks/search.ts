import { useState } from 'react';

interface Meal {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
}


export const useSearchMeals = () => {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [loading, setLoading] = useState(false);

  const searchMeals = async (query: string) => {
    setLoading(true);
    try {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
      const data = await response.json();
      setMeals(data.meals || []);
    } catch (error) {
      console.error('Error searching meals:', error);
      setMeals([]);
    } finally {
      setLoading(false);
    }
  };

  return { meals, loading, searchMeals };
};
