import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { GlobalContext } from "../../context";

export default function Details() {
  const { id } = useParams();
  const {
    receipeDetailsData,
    setReceipeDetailsData,
    favoritesList,
    handleAddToFavorite,
  } = useContext(GlobalContext);

  useEffect(() => {
    if (!id) return;
    async function getReceipeDetails() {
      setReceipeDetailsData(null);
      try {
        const response = await fetch(
          `https://forkify-api.herokuapp.com/api/v2/recipes/${id}`,
        );
        const data = await response.json();

        if (data?.data) {
          setReceipeDetailsData(data?.data);
        }
      } catch (err) {
        console.error(err);
      }
    }

    getReceipeDetails();
  }, [id, setReceipeDetailsData]);

  if (!receipeDetailsData?.recipe) {
    return (
      <div className="container mx-auto py-12 text-center text-xl">
        Loading recipe details...
      </div>
    );
  }

  const isFavorite =
    favoritesList &&
    favoritesList.length > 0 &&
    favoritesList.findIndex(
      (item) => (item?.recipe?.id || item?.id) === receipeDetailsData?.recipe?.id,
    ) !== -1;

  return (
    <div className="container mx-auto py-10 grid grid-cols-1 lg:grid-cols-2 gap-10">
      <div className="row-start-2 lg:row-start-auto">
        <div className="h-96 overflow-hidden rounded-xl group ">
          <img
            src={receipeDetailsData?.recipe?.image_url}
            className="w-full h-full object-cover block group-hover:scale-105 duration-300"
            alt={receipeDetailsData?.recipe?.title}
          />
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <span className="text-sm text-cyan-700 font-medium">
          {receipeDetailsData?.recipe?.publisher}
        </span>

        <h3 className="font-bold text-2xl text-black">
          {receipeDetailsData?.recipe?.title}
        </h3>

        {receipeDetailsData?.recipe?.cooking_time && (
          <p className="text-gray-600">
            Cooking time: {receipeDetailsData.recipe.cooking_time} mins
          </p>
        )}
        {receipeDetailsData?.recipe?.servings && (
          <p className="text-gray-600">
            Servings: {receipeDetailsData.recipe.servings}
          </p>
        )}

        <div>
          <button
            onClick={() => handleAddToFavorite(receipeDetailsData)}
            className={`p-3 px-8 rounded-lg text-sm uppercase font-medium tracking-wider mt-3 inline-block shadow-md transition-colors duration-300 ${
              isFavorite
                ? "bg-red-600 hover:bg-red-700 text-white"
                : "bg-black hover:bg-gray-800 text-white"
            }`}
          >
            {isFavorite ? "Remove from favorites" : "Add to favorites"}
          </button>
        </div>

        <div className="mt-4">
          <span className="text-2xl font-semibold text-black block mb-4">
            Ingredients:
          </span>
          <ul className="flex flex-col gap-3">
            {receipeDetailsData?.recipe?.ingredients?.map((ingredient, idx) => (
              <li
                key={idx}
                className="flex items-start gap-3 border-b border-gray-100 pb-2"
              >
                <span className="text-lg font-semibold text-cyan-700 whitespace-nowrap">
                  {ingredient.quantity} {ingredient.unit}
                </span>
                <span className="text-lg text-gray-700">
                  {ingredient.description}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
