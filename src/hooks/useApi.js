import { useEffect, useState } from "react";
import api from "../services/api";

const useApi = (url) => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!url) return;

    (async () => {
      try {
        setError(null);

        const res = await api.get(`${process.env.REACT_APP_BACKEND_URL}${url}`);

        setData(res.data.data);
        setIsPending(false);
      } catch (error) {
        console.error("Error while fetching data: ", error);

        let errorMessage;
        if (error.response) {
          errorMessage = error.response.statusText;
        } else {
          errorMessage = error.message;
        }

        setError(errorMessage);
        setIsPending(false);
      }
    })();
  }, [url]);

  return { data, isPending, error };
};

export default useApi;
