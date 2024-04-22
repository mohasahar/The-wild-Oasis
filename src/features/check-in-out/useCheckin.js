import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useCheckin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: checkin, isloading: isCheckingIn } = useMutation({
    mutationFn: (
      { bookingId, breakfast } //لأن التابع يقبل بوسيط واحد فقط لذلك ندخل غرض كـ وسيط ثم بداخل الغرض نمرر  غرضين
    ) =>
      updateBooking(bookingId, {
        status: "checked-in",
        isPaid: true,
        ...breakfast, //هنا قمنا بنشر الغرض وتمديده  كي يستوعب باقي الميزات
      }),
    onSuccess: (data) => {
      toast.success(`Booking #${data.id} successfuly checked in`);
      queryClient.invalidateQueries({ active: true }); //ابطال جميع الاستعلامات النشطة في الصفحة
      navigate("/");
    },
    onError: () => toast.error("There was an error while checking in"),
  });
  return { checkin, isCheckingIn };
}
