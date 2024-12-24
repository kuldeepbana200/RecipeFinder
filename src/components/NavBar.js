import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const NavBar = () => {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    area: "",
  });

  const navigate = useNavigate();

  function nameHandler(event) {
    event.preventDefault();
    if (formData.name.trim()) {
      navigate(`/category/${formData.name}`);
      setFormData({ name: "", category: "", area: "" });
    }
  }

  function categoryHandler(event) {
    event.preventDefault();
    if (formData.category.trim()) {
      navigate(`/categories/${formData.category}`);
      setFormData({ name: "", category: "", area: "" });
    }
  }

  function areaHandler(event) {
    event.preventDefault();
    if (formData.area.trim()) {
      navigate(`/cuisin/${formData.area}`);
      setFormData({ name: "", category: "", area: "" });
    }
  }

  function nameChange(event) {
    setFormData({
      ...formData,
      name: event.target.value,
    });
  }

  function categoryChange(event) {
    setFormData({
      ...formData,
      category: event.target.value,
    });
  }

  function areaChange(event) {
    setFormData({
      ...formData,
      area: event.target.value,
    });
  }

  return (
    <div className="bg-[#A3C380] flex flex-col p-4 gap-6">
      <div>
        <h1 className="font-bold text-center text-2xl md:text-3xl font-playfair">
          Craving something? Let’s find the perfect recipe!
        </h1>
      </div>

      <div className="flex flex-col md:flex-row justify-evenly items-center gap-4">
        {/* Category Search */}
        <div className="w-full md:w-1/5">
          <form onSubmit={categoryHandler} className="flex flex-col md:flex-row items-center gap-2">
            <input
              className="bg-[#FFF4E6] rounded-md p-2 w-full h-12 text-[#ff302d]"
              type="text"
              placeholder="Dive into a category!"
              value={formData.category}
              onChange={categoryChange}
            />
            <button className="bg-[#F25F5C] rounded-md h-12 w-full md:w-auto hover:bg-[#BFD8BD] duration-300">
              Dive In
            </button>
          </form>
        </div>

        {/* Name Search */}
        <div className="w-full md:w-1/4">
          <form onSubmit={nameHandler} className="flex flex-col md:flex-row items-center gap-2">
            <input
              className="bg-[#FFF4E6] rounded-md p-2 w-full h-12"
              id="text"
              type="text"
              placeholder="Craving something? Find it!"
              value={formData.name}
              onChange={nameChange}
            />
            <button className="bg-[#F25F5C] rounded-md h-12 w-full md:w-auto hover:bg-[#BFD8BD] duration-300">
              Let’s Cook!
            </button>
          </form>
        </div>

        {/* Area Search */}
        <div className="w-full md:w-1/5">
          <form onSubmit={areaHandler} className="flex flex-col md:flex-row items-center gap-2">
            <input
              className="bg-[#FFF4E6] rounded-md p-2 w-full h-12"
              type="text"
              placeholder="Explore global flavors!"
              value={formData.area}
              onChange={areaChange}
            />
            <button className="bg-[#F25F5C] rounded-md p-2 h-12 w-full md:w-auto hover:bg-[#BFD8BD] duration-300">
              Explore
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
