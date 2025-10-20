import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { API_BASE } from "../../api";

const loginSchema = z.object({
  email: z.string().email({ message: "Email không hợp lệ" }).nonempty({message:"Không được để trống"}),
  password: z.string().min(6, { message: "Mật khẩu tối thiểu 6 ký tự" }).nonempty({message:"Không được để trống"}),
});

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });
  const nav = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(`${API_BASE}/auth/login`, data);
      toast.success("Đăng nhập thành công!", {
        position: "top-right",
        autoClose: 3000,
      });
      // Store user data (assuming response contains user data)
      localStorage.setItem("user", JSON.stringify(response.data));
       nav("/todos");
    } catch (error) {
      toast.error(
        "Đăng nhập thất bại: " + (error.response?.data?.message || error.message),
        {
          position: "top-right",
          autoClose: 3000,
        }
      );
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-body">
              <h2 className="card-title text-center mb-4">Đăng Nhập</h2>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    className={`form-control ${errors.email ? "is-invalid" : ""}`}
                    id="email"
                    placeholder="Nhập email"
                    {...register("email")}
                  />
                  {errors.email && (
                    <div className="invalid-feedback">{errors.email.message}</div>
                  )}
                </div>

                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Mật khẩu
                  </label>
                  <input
                    type="password"
                    className={`form-control ${errors.password ? "is-invalid" : ""}`}
                    id="password"
                    placeholder="Nhập mật khẩu"
                    {...register("password")}
                  />
                  {errors.password && (
                    <div className="invalid-feedback">{errors.password.message}</div>
                  )}
                </div>

                <button type="submit" className="btn btn-primary w-100">
                  Đăng Nhập
                </button>
              </form>
              <div className="text-center mt-3">
                <p>
                  Chưa có tài khoản?{" "}
                  <a href="/register" className="text-primary">
                    Đăng ký
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default LoginPage;
