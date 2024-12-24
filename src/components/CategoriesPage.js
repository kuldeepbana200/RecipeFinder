import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Random from "./Random";
import Spinner from "./Spinner";

const CategoriesPage = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchCategories() {
    try {
      const response = await axios.get(
        "https://www.themealdb.com/api/json/v1/1/categories.php"
      );
      setCategories(response.data.categories);
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div>
      {loading ? (
        <div className="flex justify-center items-center min-h-screen">
          <Spinner />
        </div>
      ) : (
        <>
          <Random />
          <hr />
          {categories.length > 0 ? (
            <>
              <div className="spacing"></div>
              <h2 className="text-center text-xl md:text-2xl font-semibold bg-[#FFFDE7] underline p-4">
                Explore Categories Here!!
              </h2>
              <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 p-4 md:p-8 bg-[#FFFDE7]">
                {categories.map((category) => (
                  <CategoryCard key={category.idCategory} category={category} />
                ))}
              </section>
            </>
          ) : (
            <p className="text-center p-4">No categories available.</p>
          )}
        </>
      )}
    </div>
  );
};

const CategoryCard = ({ category }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleText = () => setIsExpanded(!isExpanded);

  const text = category.strCategoryDescription;
  const words = text.split(" ");
  const previewText =
    words.slice(0, 20).join(" ") + (words.length > 20 ? "..." : "");

  return (
    <div className="flex flex-col bg-[#FFF4E6] p-4 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
      <h1 className="text-center text-lg md:text-xl font-pacifico font-semibold">
        {category.strCategory}
      </h1>
      <img
        src={category.strCategoryThumb}
        alt={category.strCategory}
        className="items-center mx-auto rounded-lg max-w-full h-auto"
      />
      <p className="text-center mt-2 text-sm md:text-base">
        {isExpanded ? text : previewText}
        {words.length > 20 && (
          <button
            onClick={toggleText}
            className="text-[#3E1E26] mt-2 font-semibold underline hover:text-[#FF302D]"
          >
            {isExpanded ? "Show Less" : "Read More"}
          </button>
        )}
      </p>
      <div className="flex justify-center mt-4">
        <Link to={`/categories/${category.strCategory}`}>
          <button className="font-pacifico border w-full sm:w-auto p-2 bg-[#F25F5C] rounded-lg hover:bg-[#F5837F] duration-200">
            More From this Category!!
          </button>
        </Link>
      </div>
    </div>
  );
};

export default CategoriesPage;
