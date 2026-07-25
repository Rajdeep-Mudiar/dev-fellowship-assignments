import { useContext } from "react";
import { GlobalContext } from "../../context";
import ReceipeItem from "../../components/receipe-item";

export default function Home() {
  const { receipeList, loading } = useContext(GlobalContext);

  if (loading) {
    return <div className="text-center py-12 text-xl">Loading... Please wait</div>;
  }
  return (
    <div className="py-8 container mx-auto flex flex-wrap justify-center gap-10">
      {receipeList && receipeList.length > 0 ? (
        receipeList.map((item) => <ReceipeItem key={item.id} item={item} />)
      ) : (
        <div>
          <p className="lg:text-4xl text-xl text-center text-black font-extrabold">
            Nothing to show here ... Please type something
          </p>
        </div>
      )}
    </div>
  );
}
