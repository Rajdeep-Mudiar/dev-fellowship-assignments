import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { assets, facilityIcons, roomsDummyData } from "../assets/assets";
import StarRating from "../components/StarRating";
import { getHotels, searchHotels } from "../services/api";

const CheckBox = ({ label, selected = false, onChange = () => {} }) => {
  return (
    <label className="flex gap-3 items-center cursor-pointer mt-2 text-sm text-gray-700 select-none">
      <input
        type="checkbox"
        checked={selected}
        onChange={(e) => onChange(e.target.checked, label)}
        className="rounded text-black cursor-pointer"
      />
      <span className="font-light"> {label} </span>
    </label>
  );
};

const RadioButton = ({ label, selected = false, onChange = () => {} }) => {
  return (
    <label className="flex gap-3 items-center cursor-pointer mt-2 text-sm text-gray-700 select-none">
      <input
        type="radio"
        name="sortOptions"
        checked={selected}
        onChange={() => onChange(label)}
        className="text-black cursor-pointer"
      />
      <span className="font-light"> {label} </span>
    </label>
  );
};

const AllRooms = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const cityParam = searchParams.get("city") || "";
  const checkInParam = searchParams.get("checkIn") || "";
  const checkOutParam = searchParams.get("checkOut") || "";
  const guestsParam = searchParams.get("guests") || "1";

  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openFilters, setOpenFilters] = useState(false);

  const [selectedRoomTypes, setSelectedRoomTypes] = useState([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState("");
  const [selectedSort, setSelectedSort] = useState("Newest First");

  const roomTypes = ["Single Bed", "Double Bed", "Luxury Room", "Family Suite"];
  const priceRanges = ["0 to 250", "250 to 500", "500 to 1000", "1000 to 2000"];
  const sortOptions = [
    "Newest First",
    "Price Low to High",
    "Price High to Low",
    "Rating",
  ];

  useEffect(() => {
    const fetchCatalog = async () => {
      setLoading(true);
      try {
        const query = {};
        if (cityParam) query.city = cityParam;
        if (checkInParam) query.checkIn = checkInParam;
        if (checkOutParam) query.checkOut = checkOutParam;
        if (guestsParam) query.guests = guestsParam;

        if (selectedPriceRange) {
          const [min, max] = selectedPriceRange.replace("$ ", "").split(" to ");
          if (min) query.minPrice = min.trim();
          if (max) query.maxPrice = max.trim();
        }

        if (selectedSort) {
          query.sort = selectedSort;
        }

        const res = cityParam || checkInParam ? await searchHotels(query) : await getHotels(query);
        if (res.success && res.data && res.data.length > 0) {
          setHotels(res.data);
        } else {
          // Fallback to dummy data mapped to hotel schema
          const fallbackData = roomsDummyData.map((r) => ({
            _id: r._id,
            name: r.hotel.name,
            city: r.hotel.city,
            address: r.hotel.address,
            pricePerNight: r.pricePerNight,
            amenities: r.amenities,
            images: r.images,
            rating: 4.8,
            reviewsCount: 180,
            rooms: [{ roomType: r.roomType, pricePerNight: r.pricePerNight }],
          }));
          setHotels(fallbackData);
        }
      } catch (err) {
        // Fallback gracefully on local preview
        const fallbackData = roomsDummyData.map((r) => ({
          _id: r._id,
          name: r.hotel.name,
          city: r.hotel.city,
          address: r.hotel.address,
          pricePerNight: r.pricePerNight,
          amenities: r.amenities,
          images: r.images,
          rating: 4.8,
          reviewsCount: 180,
          rooms: [{ roomType: r.roomType, pricePerNight: r.pricePerNight }],
        }));
        setHotels(fallbackData);
      } finally {
        setLoading(false);
      }
    };

    fetchCatalog();
  }, [cityParam, checkInParam, checkOutParam, guestsParam, selectedPriceRange, selectedSort]);

  const handleRoomTypeChange = (checked, label) => {
    setSelectedRoomTypes((prev) =>
      checked ? [...prev, label] : prev.filter((item) => item !== label)
    );
  };

  const handleClearFilters = () => {
    setSelectedRoomTypes([]);
    setSelectedPriceRange("");
    setSelectedSort("Newest First");
  };

  // Client-side filtering if multiple room types are ticked
  const filteredHotels = hotels.filter((hotel) => {
    if (selectedRoomTypes.length === 0) return true;
    return hotel.rooms?.some((r) => selectedRoomTypes.includes(r.roomType));
  });

  return (
    <div className="flex flex-col-reverse lg:flex-row items-start justify-between pt-28 md:pt-36 px-4 md:px-16 lg:px-24 xl:px-32 gap-10 max-w-7xl mx-auto pb-24">
      {/* Hotels Catalog List */}
      <div className="flex-1 w-full">
        <div className="flex flex-col items-start text-left mb-6">
          <h1 className="font-playfair text-3xl md:text-4xl font-bold text-gray-900">
            {cityParam ? `Hotels in ${cityParam}` : "Available Accommodations"}
          </h1>
          <p className="text-sm md:text-base text-gray-500 mt-1 max-w-xl">
            {filteredHotels.length} properties found matching your preferences. Book directly for the best rates.
          </p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-24">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-black"></div>
          </div>
        ) : filteredHotels.length === 0 ? (
          <div className="text-center py-16 bg-gray-50 rounded-2xl border border-dashed border-gray-300">
            <p className="text-gray-600 font-medium">No hotels found matching your search.</p>
            <button
              onClick={handleClearFilters}
              className="mt-4 px-6 py-2 bg-black text-white text-xs font-semibold rounded-full"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="space-y-8">
            {filteredHotels.map((hotel) => (
              <div
                key={hotel._id}
                className="flex flex-col md:flex-row items-start p-5 bg-white border border-gray-200 rounded-2xl gap-6 shadow-sm hover:shadow-md transition-all"
              >
                <img
                  onClick={() => {
                    navigate(`/rooms/${hotel._id}`);
                    window.scrollTo(0, 0);
                  }}
                  src={hotel.images?.[0] || assets.regImage}
                  alt={hotel.name}
                  className="w-full md:w-64 h-52 rounded-xl object-cover cursor-pointer hover:opacity-95 transition-opacity"
                />

                <div className="flex-1 flex flex-col justify-between h-full">
                  <div>
                    <div className="flex items-center justify-between">
                      <p className="text-xs uppercase tracking-wider font-bold text-blue-600">
                        {hotel.city}
                      </p>
                      <div className="flex items-center gap-1 text-sm font-semibold text-gray-800">
                        <StarRating rating={hotel.rating || 4.5} />
                        <span className="ml-1 text-xs text-gray-500">
                          ({hotel.reviewsCount || 120}+ reviews)
                        </span>
                      </div>
                    </div>

                    <h2
                      onClick={() => {
                        navigate(`/rooms/${hotel._id}`);
                        window.scrollTo(0, 0);
                      }}
                      className="text-gray-900 text-2xl font-playfair font-bold cursor-pointer hover:text-blue-600 transition-colors mt-1"
                    >
                      {hotel.name}
                    </h2>

                    <div className="flex items-center gap-1.5 text-gray-500 mt-1 text-xs">
                      <img src={assets.locationIcon} alt="" className="w-3.5 h-3.5" />
                      <span>{hotel.address}</span>
                    </div>

                    {/* Amenities Badges */}
                    <div className="flex flex-wrap items-center mt-4 gap-2">
                      {hotel.amenities?.slice(0, 4).map((amenity, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-gray-100 text-gray-700 text-xs font-medium"
                        >
                          <img
                            src={facilityIcons[amenity] || assets.homeIcon}
                            alt=""
                            className="w-3.5 h-3.5"
                          />
                          <span>{amenity}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Price & Booking Button */}
                  <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-100">
                    <div>
                      <span className="text-xs text-gray-400 block">Starting from</span>
                      <p className="text-xl font-bold text-gray-900">
                        ${hotel.pricePerNight} <span className="text-xs font-normal text-gray-500">/ night</span>
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        navigate(`/rooms/${hotel._id}`);
                        window.scrollTo(0, 0);
                      }}
                      className="px-5 py-2.5 bg-black hover:bg-gray-800 text-white text-xs font-medium rounded-xl transition-all cursor-pointer active:scale-95"
                    >
                      View Details & Reserve
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Filter Sidebar */}
      <div className="bg-white w-full lg:w-80 border border-gray-200 rounded-2xl p-6 shadow-sm">
        <div className="flex items-center justify-between pb-4 border-b border-gray-100">
          <p className="text-base font-bold text-gray-900">FILTERS</p>
          <button
            onClick={handleClearFilters}
            className="text-xs font-semibold text-blue-600 hover:underline cursor-pointer"
          >
            CLEAR ALL
          </button>
        </div>

        <div className="mt-5 space-y-6">
          {/* Room Types */}
          <div>
            <p className="font-semibold text-gray-800 text-xs uppercase tracking-wider mb-2">
              Room Type
            </p>
            {roomTypes.map((type, index) => (
              <CheckBox
                key={index}
                label={type}
                selected={selectedRoomTypes.includes(type)}
                onChange={handleRoomTypeChange}
              />
            ))}
          </div>

          {/* Price Range */}
          <div className="pt-4 border-t border-gray-100">
            <p className="font-semibold text-gray-800 text-xs uppercase tracking-wider mb-2">
              Price Range ($)
            </p>
            {priceRanges.map((range, index) => (
              <CheckBox
                key={index}
                label={`$ ${range}`}
                selected={selectedPriceRange === `$ ${range}`}
                onChange={(checked) => setSelectedPriceRange(checked ? `$ ${range}` : "")}
              />
            ))}
          </div>

          {/* Sort By */}
          <div className="pt-4 border-t border-gray-100">
            <p className="font-semibold text-gray-800 text-xs uppercase tracking-wider mb-2">
              Sort By
            </p>
            {sortOptions.map((option, index) => (
              <RadioButton
                key={index}
                label={option}
                selected={selectedSort === option}
                onChange={(label) => setSelectedSort(label)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllRooms;
