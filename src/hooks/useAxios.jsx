// useAxios
import { useEffect, useState } from "react";
import axiosInstance from "utils/axios";

const useAxios = (options) => {
  const [state, setState] = useState({
    isLoading: true,
    error: null,
    data: null,
  });
  const [trigger, setTrigger] = useState(0);

  if (!options.url) {
    return;
  }

  const refetch = () => {
    setState({
      ...state,
      isLoading: true,
    });
    setTrigger(Date.now());
  };

  useEffect(() => {
    axiosInstance(options)
      .then((data) => {
        if (data?.data) {
          setState({
            ...state,
            isLoading: false,
            data: data.data,
          });
        } else {
          setState({
            ...state,
            isLoading: false,
            data: data,
          });
        }
      })
      .catch((error) => {
        setState({
          ...state,
          isLoading: false,
          error,
        });
      });
  }, [trigger]);

  return { ...state, refetch };
};

export default useAxios;
