export type RootStackParamList = {
  resturantScreen: { mealId: string };
  CartScreen: { cart?: { [idMeal: string]: number }; meals?: { [idMeal: string]: { strMeal: string; strMealThumb: string } } };
  // Add other routes if necessary
};
