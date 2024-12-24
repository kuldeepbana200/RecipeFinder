import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

const Recipe = () => {
  const { recipe } = useParams();
  const [meal, setMeal] = useState(null); // Initialize as null to handle no data state
  const [loading, setLoading] = useState(true); // Loading state to show a loader

  async function fetchMeal() {
    try {
      setLoading(true); // Set loading state to true when fetching starts
      const response = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${recipe}`
      );
      setMeal(response.data.meals ? response.data.meals[0] : null);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false); // Set loading state to false once fetching is done
    }
  }

  useEffect(() => {
    fetchMeal();
  }, [recipe]); // Trigger fetchMeal when recipe changes

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
    <div className="p-4 lg:p-10">
      {loading ? (
        <div className="flex justify-center items-center h-40">
          <p className="font-bold text-lg sm:text-xl text-[#F25F5C]">Loading...</p>
        </div>
      ) : meal ? (
        <div className="flex flex-col items-center gap-8">
          <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-10 border p-4 lg:p-8 rounded-3xl shadow-2xl bg-[#FFF4E6] max-w-2xl lg:w-3/4">
            <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
              <h1 className="font-pacifico text-lg sm:text-xl">{meal.strMeal}</h1>
              <p className="text-sm sm:text-lg">Category: {meal.strCategory}</p>
              <p className="text-sm sm:text-lg">Cuisine: {meal.strArea}</p>
              <Link to={`/cuisin/${meal.strArea}`}>
                <button className="w-full sm:w-auto font-pacifico border px-4 py-2 mt-4 bg-[#BFD8BD] rounded-lg hover:bg-[#F25F5C] duration-200">
                  More from {meal.strArea}
                </button>
              </Link>
            </div>
            <img
              className="rounded-3xl max-w-xs h-auto"
              src={meal.strMealThumb}
              alt={meal.strMeal}
            />
          </div>
          <div className="flex flex-col lg:flex-row gap-8 w-full lg:w-3/4">
            <div className="flex-1">
              <h2 className="text-lg font-bold mb-4">Ingredients:</h2>
              <ul className="list-disc list-inside">
                {ingredients.map((item, index) => (
                  <li key={index} className="text-sm sm:text-lg">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-bold mb-4">Instructions:</h2>
              <div className="space-y-2 text-sm sm:text-lg">
                {instruction.map((item, index) => (
                  <p key={index}>{item}</p>
                ))}
              </div>
              {meal.strYoutube && (
                <a href={meal.strYoutube} target="_blank" rel="noopener noreferrer">
                  <button className="w-full sm:w-auto mt-4 font-pacifico border px-4 py-2 bg-[#F25F5C] rounded-lg hover:bg-[#F5837F] duration-200">
                    Watch on Youtube
                  </button>
                </a>
              )}
            </div>
          </div>
        </div>
      ) : (
        <p className="text-center text-lg">No such recipe is available.</p>
      )}
    </div>
  );
};

export default Recipe;
