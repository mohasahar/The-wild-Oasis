import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteCabin as deleteCabinApi } from "../../services/apiCabins";

export function useDeleteCabin() {
  const queryClient = useQueryClient();
  const { isLoading: isDeleting, mutate: deleteCabin } = useMutation({
    mutationFn: deleteCabinApi,

    //Telling the ReactQuery what to do as soon as the mutation was successful
    onSuccess: () => {
      toast.success("Cabin successfully deleted");
      queryClient.invalidateQueries({
        //Invalidating queries so it can be re-fetched again using the unique query key
        queryKey: ["cabins"],
      });
    },
    onError: (err) => toast.error(err.message), //when an error happens ,ReactQuery will try to fetch more than one time
  });
  return { isDeleting, deleteCabin };
}
