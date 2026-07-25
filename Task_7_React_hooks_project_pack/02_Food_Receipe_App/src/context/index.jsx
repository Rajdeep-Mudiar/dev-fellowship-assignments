import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const GlobalContext = createContext(null);

export default function GlobalState({ children }) {
  const [searchParam, setSearchParam] = useState(null);
  const [loading, setLoading] = useState(false);
  const [receipeList, setReceipeList] = useState([]);
  const [receipeDetailsData, setReceipeDetailsData] = useState(null);
  const [favoritesList, setFavoritesList] = useState([]);

  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    if (!searchParam || !searchParam.trim()) return;
    setLoading(true);
    try {
      const res = await fetch(
        `https://forkify-api.herokuapp.com/api/v2/recipes?search=${searchParam}`,
      );

      const data = await res.json();
      if (data?.data?.recipes) {
        setReceipeList(data?.data?.recipes);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
      setSearchParam("");
      navigate("/");
    }
  }

  function handleAddToFavorite(getCurrentItem) {
    let cpyFavoritesList = [...favoritesList];
    const index = cpyFavoritesList.findIndex(
      (item) => item.id === getCurrentItem.id,
    );

    // If not present push it to favorites if already present splice(remove) it
    if (index === -1) {
      cpyFavoritesList.push(getCurrentItem);
    } else {
      cpyFavoritesList.splice(index);
    }

    setFavoritesList(cpyFavoritesList);
  }
  return (
    <GlobalContext.Provider
      value={{
        searchParam,
        loading,
        receipeList,
        setSearchParam,
        handleSubmit,
        setReceipeDetailsData,
        handleAddToFavorite,
        favoritesList,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
