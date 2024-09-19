// import { defineStore } from "pinia";
// import Swal from "vue-sweetalert2";

// export const useAlertStore = defineStore("swal", {
//   actions: {
//     async confirm(
//       text,
//       onConfirm = null,
//       onCancel = null,
//       icon = "question",
//       showCancelButton = true,
//       confirmButtonText = "확인",
//       cancelButtonText = "취소",
//       confirmButtonColor = "#3085d6",
//       cancelButtonColor = "#d33"
//     ) {
//       try {
//         const result = await Swal.fire({
//           text: text,
//           icon: icon,
//           showCancelButton: showCancelButton,
//           confirmButtonText: confirmButtonText,
//           cancelButtonText: cancelButtonText,
//           confirmButtonColor: confirmButtonColor,
//           cancelButtonColor: cancelButtonColor,
//         });

//         if (result.isConfirmed && onConfirm) {
//           onConfirm();
//         } else if (!result.isConfirmed && onCancel) {
//           onCancel();
//         }
//       } catch (error) {
//         console.error("An error occurred while showing the alert:", error);
//       }
//     },
//   },
// });
