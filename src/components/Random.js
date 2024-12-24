import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Random = () => {
  const [meal, setMeal] = useState(null); // Set initial state to null
  const [loading, setLoading] = useState(true); // State for loader

  async function fetchMeal() {
    try {
      setLoading(true); // Show loader
      const response = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/random.php`
      );
      setMeal(response.data.meals[0]);
    } catch (error) {
      console.error("Error fetching meal:", error);
    } finally {
      setLoading(false); // Hide loader
    }
  }

  useEffect(() => {
    fetchMeal();
  }, []);

  const ingredients = [];
  if (meal) {
    for (let i = 1; i <= 20; i++) {
      const ingredient = meal[`strIngredient${i}`];
      const measure = meal[`strMeasure${i}`];
      if (ingredient) {
        ingredients.push(`${measure} ${ingredient}`);
      }
    }
  }

  const instructions = meal?.strInstructions;
  const instruction = instructions ? instructions.split("\r\n") : [];

  return (
    <div className="flex flex-col items-center m-4 lg:m-10">
      {loading ? (
        // Loader displayed during data fetching
        <div className="flex justify-center items-center h-40">
          <p className="font-bold text-lg sm:text-xl text-[#F25F5C]">
            Loading...
          </p>
        </div>
      ) : (
        <div>
          {meal ? (
            <div className="flex flex-col lg:flex-row justify-center items-center gap-4 border p-4 lg:p-10 rounded-3xl shadow-2xl bg-[#FFF4E6]">
              <div className="flex-1">
                <h1 className="font-bold text-xl sm:text-2xl font-playfair text-center lg:text-left">
                  A Random Recipe!
                </h1>
                <h1 className="text-center lg:text-left font-pacifico text-lg sm:text-xl">
                  {meal.strMeal}
                </h1>
                <p className="text-center lg:text-left text-sm sm:text-lg">
                  Category: {meal.strCategory}
                </p>
                <p className="text-center lg:text-left text-sm sm:text-lg">
                  Cuisine: {meal.strArea}
                </p>
                <div className="flex flex-col justify-center mt-4 gap-2">
                  <Link to={`/cuisin/${meal.strArea}`}>
                    <button className="w-fit  px-4 py-2 font-pacifico border bg-[#BFD8BD] rounded-lg hover:bg-[#F25F5C] duration-200">
                      More from {meal.strArea}
                    </button>
                  </Link>
                  <Link to={`/category/${meal.strMeal}`}>
                    <button className="w-fit px-4 py-2 bg-[#F25F5C] rounded-lg hover:bg-[#f25e5cbf] duration-200">
                      Get Recipe
                    </button>
                  </Link>
                </div>
              </div>
              <div className="flex-1 flex justify-center">
                <img
                  width={300}
                  src={meal.strMealThumb}
                  alt={meal.strMeal}
                  className="rounded-3xl max-w-full h-auto"
                />
              </div>
            </div>
          ) : (
            <p className="text-center text-lg">No such recipe is available.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Random;
