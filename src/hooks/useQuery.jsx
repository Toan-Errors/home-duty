import { useQuery, useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import axiosInstance from "utils/axios";

export function useCustomQuery(queryKey, method = "get", options = {}) {
  const { data, isLoading, error, refetch } = useQuery(
    queryKey,
    () => {
      return axiosInstance[method](queryKey).then((res) => res.data);
    },
    options
  );

  return { data, isLoading, error, refetch };
}

export function useCustomMutation(queryKey, method = "post", options = {}) {
  const { mutate, isLoading, error, isSuccess } = useMutation({
    mutationFn: (data) => {
      console.log(method, queryKey, data);
      return axiosInstance[method](queryKey, data).then((res) => res.data);
    },
    onError: (error) => {
      if (error?.response?.data?.message) {
        toast.error(error?.response?.data?.message);
      } else {
        console.log(error);
        toast.error("Có lỗi xảy ra");
      }
    },
    ...options,
  });

  return { mutate, isLoading, error, isSuccess };
}
