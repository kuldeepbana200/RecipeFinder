import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

export const Recipes = () => {
  const { category } = useParams();
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch recipes based on category
  async function fetchRecipes() {
    try {
      setLoading(true); // Set loading to true before fetching
      const response = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
      );
      if (response.data.meals) {
        setRecipes(response.data.meals);
      } else {
        setRecipes([]); // If no meals found
      }
    } catch (error) {
      console.log(error);
      setRecipes([]); // In case of error, set an empty array
    } finally {
      setLoading(false); // Set loading to false after fetching is complete
    }
  }

  // useEffect to fetch recipes when category changes
  useEffect(() => {
    fetchRecipes();
  }, [category]);

  return (
    <div>
      {loading ? (
        <div className="flex justify-center items-center min-h-screen">
          <p className="text-lg font-semibold">Loading...</p>
        </div>
      ) : recipes.length > 0 ? (
        <>
          <h1 className="text-xl sm:text-2xl lg:text-3xl text-center font-semibold mb-6">
            {category}
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 p-8 md:p-8 lg:p-16 bg-[#FFFDE7]">
            {recipes.map((recipe) => (
              <div
                key={recipe.idMeal}
                className="flex flex-col bg-[#FFF4E6] p-4 gap-4 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300"
              >
                <h1 className="text-center text-lg font-pacifico font-semibold">
                  {recipe.strMeal}
                </h1>
                <img
                  src={recipe.strMealThumb}
                  className="items-center mx-auto rounded-lg max-w-xs h-auto"
                  alt={recipe.strMeal}
                />
                <div className="flex justify-center mt-auto">
                  <Link to={`/category/${recipe.strMeal}`}>
                    <button className="w-full sm:w-auto font-pacifico border px-4 py-2 bg-[#F25F5C] rounded-lg hover:bg-[#F5837F] duration-200">
                      Recipe
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="flex justify-center items-center min-h-screen">
          <p className="text-lg font-semibold">No recipes found for this category!</p>
        </div>
      )}
    </div>
  );
};
