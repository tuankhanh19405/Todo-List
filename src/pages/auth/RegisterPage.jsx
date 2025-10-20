import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { API_BASE } from "../../api";


const registerSchema = z
  .object({
    userName: z.string().min(3, { message: "Tối thiểu 3 ký tự" }).max(30,{message: "Tối đa 30 ký tự"}).nonempty({message:"Không được để trống"}),
    email: z.string().email({ message: "Email không hợp lệ" }).nonempty({message:"Không được để trống"}),
    password: z
      .string()
      .min(6, { message: "Tối thiểu 6 ký tự" })
      .max(20, { message: "Tối đa 20 ký tự" })
      .nonempty({message:"Không được để trống"}),
    passwordConfirm: z.string().min(6, { message: "Tối thiểu 6 ký tự" }).nonempty({message:"Không được để trống"}),
    agreeToTerms: z
      .boolean()
      .refine((val) => val === true, {
        message: "Bạn phải đồng ý với các điều khoản",
      }),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "Mật khẩu xác nhận không khớp",
    path: ["passwordConfirm"],
  });

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: { agreeToTerms: false },
  });
  const nav = useNavigate();

  const onSubmit = async (data) => {
    const { passwordConfirm, agreeToTerms, ...dataNew } = data;
    try {
      await axios.post(`${API_BASE}/auth/register`, dataNew);
      toast.success("Đăng ký thành công!", {
        position: "top-right",
        autoClose: 3000,
      });
      setTimeout(() => nav("/login"), 3000);
    } catch (error) {
      toast.error("Đăng ký thất bại: " + (error.response?.data?.message || error.message), {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-body">
              <h2 className="card-title text-center mb-4">Đăng Ký</h2>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-3">
                  <label htmlFor="userName" className="form-label">
                    Tên người dùng
                  </label>
                  <input
                    type="text"
                    className={`form-control ${errors.userName ? "is-invalid" : ""}`}
                    id="userName"
                    placeholder="Nhập tên người dùng"
                    {...register("userName")}
                  />
                  {errors.userName && (
                    <div className="invalid-feedback">{errors.userName.message}</div>
                  )}
                </div>

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

                <div className="mb-3">
                  <label htmlFor="passwordConfirm" className="form-label">
                    Xác nhận mật khẩu
                  </label>
                  <input
                    type="password"
                    className={`form-control ${errors.passwordConfirm ? "is-invalid" : ""}`}
                    id="passwordConfirm"
                    placeholder="Xác nhận mật khẩu"
                    {...register("passwordConfirm")}
                  />
                  {errors.passwordConfirm && (
                    <div className="invalid-feedback">{errors.passwordConfirm.message}</div>
                  )}
                </div>

                <div className="mb-3 form-check">
                  <input
                    type="checkbox"
                    className={`form-check-input ${errors.agreeToTerms ? "is-invalid" : ""}`}
                    id="agreeToTerms"
                    {...register("agreeToTerms")}
                  />
                  <label className="form-check-label" htmlFor="agreeToTerms">
                    Tôi đồng ý với các điều khoản sử dụng
                  </label>
                  {errors.agreeToTerms && (
                    <div className="invalid-feedback d-block">{errors.agreeToTerms.message}</div>
                  )}
                </div>

                <button type="submit" className="btn btn-primary w-100">
                  Đăng Ký
                </button>
              </form>
              <div className="text-center mt-3">
                <p>
                  Đã có tài khoản?{" "}
                  <a href="/login" className="text-primary">
                    Đăng nhập
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

export default RegisterPage;