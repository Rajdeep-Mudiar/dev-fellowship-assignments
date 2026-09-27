import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { assets, cities } from "../assets/assets";
import { useApp } from "../context/AppContext";

const Hero = () => {
  const navigate = useNavigate();
  const { searchParams, updateSearch } = useApp();

  const [formData, setFormData] = useState({
    destination: searchParams.city || "",
    checkIn: searchParams.checkIn || "",
    checkOut: searchParams.checkOut || "",
    guests: searchParams.guests || 1,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    updateSearch({
      city: formData.destination,
      checkIn: formData.checkIn,
      checkOut: formData.checkOut,
      guests: Number(formData.guests) || 1,
    });

    const params = new URLSearchParams();
    if (formData.destination) params.append("city", formData.destination);
    if (formData.checkIn) params.append("checkIn", formData.checkIn);
    if (formData.checkOut) params.append("checkOut", formData.checkOut);
    if (formData.guests) params.append("guests", formData.guests);

    navigate(`/rooms?${params.toString()}`);
    window.scrollTo(0, 0);
  };

  return (
    <div className='flex flex-col items-start justify-center px-6 md:px-16 lg:px-24 xl:px-32 text-white bg-[url("/src/assets/heroImage.png")] bg-no-repeat bg-cover bg-center h-screen'>
      <p className="bg-[#49B9FF]/50 px-3.5 py-1 rounded-full mt-20 text-xs md:text-sm font-medium backdrop-blur-sm">
        The Ultimate Hotel Experience
      </p>

      <h1 className="font-playfair text-2xl md:text-5xl md:text-[56px] md:leading-[56px] font-bold md:font-extrabold max-w-xl mt-4">
        Discover your Perfect Gateway Destination
      </h1>

      <p className="max-w-130 mt-2 text-sm md:text-base text-white/90">
        Unparalleled luxury and comfort await at the world's most exclusive
        hotels and resorts. Start your journey today.
      </p>

      <form
        onSubmit={handleSearch}
        className="mt-8 flex w-full max-w-4xl flex-col gap-3 rounded-lg bg-white p-4 text-gray-600 shadow-xl md:flex-row md:items-end md:gap-4 md:p-5"
      >
        <div className="flex min-w-0 flex-1 flex-col gap-1">
          <label htmlFor="destination" className="text-xs font-semibold text-gray-700">
            Destination
          </label>
          <input
            id="destination"
            name="destination"
            list="destinations"
            placeholder="Where are you going?"
            value={formData.destination}
            onChange={handleChange}
            className="w-full rounded border border-gray-200 px-3 py-2 text-sm outline-none focus:border-[#49B9FF] text-gray-800"
          />
          <datalist id="destinations">
            {cities.map((city, index) => (
              <option value={city} key={index} />
            ))}
          </datalist>
        </div>

        <div className="flex min-w-0 flex-1 flex-col gap-1">
          <label htmlFor="check-in" className="text-xs font-semibold text-gray-700">
            Check in
          </label>
          <div className="flex items-center rounded border border-gray-200 px-3 focus-within:border-[#49B9FF]">
            <input
              id="check-in"
              name="checkIn"
              type="date"
              value={formData.checkIn}
              onChange={handleChange}
              className="min-w-0 flex-1 py-2 text-sm outline-none text-gray-800"
            />
            <img src={assets.calenderIcon} alt="" className="h-4 w-4" />
          </div>
        </div>

        <div className="flex min-w-0 flex-1 flex-col gap-1">
          <label htmlFor="check-out" className="text-xs font-semibold text-gray-700">
            Check out
          </label>
          <div className="flex items-center rounded border border-gray-200 px-3 focus-within:border-[#49B9FF]">
            <input
              id="check-out"
              name="checkOut"
              type="date"
              value={formData.checkOut}
              onChange={handleChange}
              className="min-w-0 flex-1 py-2 text-sm outline-none text-gray-800"
            />
            <img src={assets.calenderIcon} alt="" className="h-4 w-4" />
          </div>
        </div>

        <div className="flex w-full flex-col gap-1 md:w-24">
          <label htmlFor="guests" className="text-xs font-semibold text-gray-700">
            Guests
          </label>
          <input
            id="guests"
            name="guests"
            type="number"
            min="1"
            max="10"
            placeholder="1"
            value={formData.guests}
            onChange={handleChange}
            className="w-full rounded border border-gray-200 px-3 py-2 text-sm outline-none focus:border-[#49B9FF] text-gray-800"
          />
        </div>

        <button
          type="submit"
          className="flex h-10 items-center justify-center gap-2 rounded bg-black px-6 text-sm font-medium text-white transition-all hover:bg-gray-800 active:scale-95 cursor-pointer"
        >
          <img src={assets.searchIcon} alt="" className="h-4 w-4 invert" />
          Search
        </button>
      </form>
    </div>
  );
};

export default Hero;
