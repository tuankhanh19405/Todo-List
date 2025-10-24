import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children, requiresAuth }) => {
  const token = localStorage.getItem("token");
  const location = useLocation();

  // Nếu cần xác thực nhưng không có token, chuyển đến trang đăng nhập
  if (requiresAuth && !token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Nếu không cần xác thực nhưng có token, chuyển đến trang todos
  if (!requiresAuth && token) {
    return <Navigate to="/" replace />;
  }

  // Nếu không thỏa mãn các điều kiện trên, hiển thị nội dung
  return children;
};

export default ProtectedRoute;