"use strict";

// -------------------------
// 1. Function chạy sau khi load
// -------------------------
function initPage() {
  console.log("Trang đã load xong!");
}

// -------------------------
// 2. Function xử lý khi submit form
// -------------------------
async function handleFormSubmit(e) {
  e.preventDefault();

  const form = e.target;
  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());
  console.log("🚀 ~ handleFormSubmit ~ data:", data);

  const {
    confirm: confirm,
    name: name,
    guest_number: guest_number,
    guest_name: guest_name,
    phone: phone,
    message: message,
  } = data;
  console.log("🚀 ~ handleFormSubmit 2~ data:", data);

  // Thông báo khi bắt đầu gửi
  Swal.fire({
    title: "Đang gửi /Sending/...",
    text: "Vui lòng chờ trong giây lát /Please wait a moment/",
    icon: "info",
    allowOutsideClick: false,
    didOpen: () => {
      Swal.showLoading();
    },
  });

  const url =
    "?sheet=sheet-1";

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        name,
        confirm,
        guest_number,
        guest_name,
        phone,
        message,
      }),
    });

    const result = await res.json().catch(() => ({}));
    console.log("Server response:", result);

    form.reset();

    // Thông báo thành công
    Swal.fire({
      title: "Thành công /Success/!",
      text: "Cảm ơn bạn đã gửi phản hồi, thông tin đã được gửi đến dâu rể rồi nha /Thank you for your feedback, the information has been sent to the bride and groom./",
      icon: "success",
      confirmButtonText: "OK",
      confirmButtonColor: "#3f4122ff",
    });
  } catch (error) {
    console.error("Error:", error);

    // Thông báo lỗi
    Swal.fire({
      title: "Lỗi!",
      text: "OPPS! Đã xảy ra lỗi: " + error.message,
      icon: "error",
      confirmButtonText: "Thử lại",
      confirmButtonColor: "#3f4122ff",
    });
  }
}

// -------------------------
// 3. Gắn sự kiện khi DOM ready
// -------------------------
document.addEventListener("DOMContentLoaded", () => {
  initPage();

  const form = document.forms["rsvp-form"];
  if (form) {
    form.addEventListener("submit", handleFormSubmit);
  }
});
