import { useContext } from "react";
import ReceipeItem from "../../components/receipe-item";
import { GlobalContext } from "../../context";

export default function Favorites() {
  const { favoritesList } = useContext(GlobalContext);

  return (
    <div className="py-8 container mx-auto">
      <h2 className="text-3xl font-bold text-center mb-10 text-black">
        Your Favorites
      </h2>
      {favoritesList && favoritesList.length > 0 ? (
        <div className="flex flex-wrap justify-center gap-10">
          {favoritesList.map((item) => {
            const recipeData = item?.recipe || item;
            return (
              <ReceipeItem
                key={recipeData.id}
                item={recipeData}
              />
            );
          })}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="lg:text-4xl text-xl text-center text-black font-extrabold">
            Nothing is added in favorites yet
          </p>
        </div>
      )}
    </div>
  );
}
