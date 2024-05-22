import { useContext } from "react";
import { SearchContext } from "../contexts/SearchContext";

const useSearchContext = () => {
  const context = useContext(SearchContext);

  if (!context) {
    throw Error("useSearchContext must be inside a SearchContextProvider");
  }

  return context;
};

export default useSearchContext;
