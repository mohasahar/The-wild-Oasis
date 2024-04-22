import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteBooking as deleteBookingApi } from "../../services/apiBookings";

export function useDeleteBooking() {
  const queryClient = useQueryClient();

  const { isLoading: isDeleting, mutate: deleteBooking } = useMutation({
    mutationFn: deleteBookingApi,

    //Telling the ReactQuery what to do as soon as the mutation was successful
    onSuccess: () => {
      toast.success("Booking successfully deleted");

      queryClient.invalidateQueries({
        //Invalidating queries so it can be re-fetched again using the unique query key
        queryKey: ["bookings"],
      });
    },
    onError: (err) => toast.error(err.message), //when an error happens ,ReactQuery will try to fetch more than one time
  });

  return { isDeleting, deleteBooking };
}
