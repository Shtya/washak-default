import toast from "react-hot-toast";

const config = (type) => {
  return {
    position: "top-center",
    duration: 3000,
    style: {
      background: type === "success" ? "#E8F5E9" : "#FFEBEE", // Light green for success, light red for error
      color: type === "success" ? "#2E7D32" : "#C62828", // Dark green for success, dark red for error
      minWidth: "200px",
      width: "fit-content",
      border: type === "success" ? "1px solid #3EA051" : "1px solid #E10000",
      borderRadius: "8px",
      boxShadow: "0px 2px 4px 0px #00000040",
      justifyContent: "start !important",
      zIndex: 500000000000000000000,
      padding: "12px 16px",
      fontSize: "14px",
      fontWeight: "500",
      display: "flex",
      alignItems: "center",
      gap: "8px",
    },
    iconTheme: {
      primary: type === "success" ? "#4CAF50" : "#EF5350", // Icon color for success and error
      secondary: "#FFFFFF", // Icon background color
    },
  };
};

export function Notification(msg, type) {
  if (type === "success") {
    toast.success(msg, config("success"));
  } else {
    toast.error(msg, config("error"));
  }
}