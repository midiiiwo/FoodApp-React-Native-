const getcategories = async () => {
    try {
        const response = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php');
        const data = await response.json(); // Convert the response to JSON
        return data.categories; // Access the categories property from the JSON response
    } catch (error) {
        console.error('Error Fetching categories:', error);
        return []; // Return an empty array in case of an error
    }
};

export default getcategories;
