import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";

export function useCheckout() {
  const queryClient = useQueryClient();

  const { mutate: checkout, isloading: isCheckingOut } = useMutation({
    mutationFn: ({ bookingId }) =>
      updateBooking(bookingId, {
        status: "check-out",
      }),
    onSuccess: (data) => {
      toast.success(`Booking #${data.id} successfuly checked out`);
      queryClient.invalidateQueries({ active: true }); //ابطال جميع الاستعلامات النشطة في الصفحة
    },
    onError: () => toast.error("There was an error while checking out"),
  });
  return { checkout, isCheckingOut };
}
