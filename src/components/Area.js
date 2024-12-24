import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export const Area = () => {
  const { area } = useParams();
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function fetchArea() {
    try {
      setLoading(true);
      setError(null); // Reset error state before fetching
      const response = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`
      );
      if (response.data.meals) {
        setMeals(response.data.meals);
      } else {
        setMeals([]);
      }
    } catch (error) {
      console.error(error);
      setError("Failed to fetch meals. Please try again later.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchArea();
  }, [area]);

  return (
    <div className="p-4 lg:p-16 bg-[#FFFDE7] min-h-screen">
      {loading ? (
        <div className="flex justify-center items-center h-40">
          <p className="font-bold text-xl text-[#F25F5C]">Loading...</p>
        </div>
      ) : error ? (
        <div className="text-center">
          <p className="text-red-600 font-bold">{error}</p>
          <button
            onClick={fetchArea}
            className="mt-4 px-4 py-2 bg-[#BFD8BD] rounded-lg hover:bg-[#F25F5C] duration-200"
          >
            Retry
          </button>
        </div>
      ) : meals.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {meals.map((meal) => (
            <div
              key={meal.idMeal}
              className="flex flex-col bg-[#FFF4E6] p-4 rounded-3xl shadow-2xl"
            >
              <h1 className="text-center text-lg font-pacifico mb-2">
                {meal.strMeal}
              </h1>
              <img
                src={meal.strMealThumb}
                alt={`Thumbnail of ${meal.strMeal}`}
                className="mx-auto rounded-3xl max-w-full h-auto"
              />
              <div className="flex justify-center mt-4">
                <Link to={`/category/${meal.strMeal}`}>
                  <button className="font-pacifico border px-4 py-2 bg-[#BFD8BD] rounded-lg hover:bg-[#F25F5C] duration-200">
                    Recipe
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center">
          <p className="text-lg font-bold">No meals found for this area!</p>
        </div>
      )}
    </div>
  );
};
