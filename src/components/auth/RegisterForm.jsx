import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import "../../App.css";

export default function RegisterForm({ onRegister, onSwitchToLogin }) {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();
    const navigate = useNavigate();
    const password = watch("password", "");

    // В методе onSubmit
    const onSubmit = (data) => {
        onRegister({
            name: data.name || data.email.split("@")[0] || "Пользователь",
            email: data.email,
            password: data.password, // Важно: передаем пароль
        });
        navigate("/");
    };

    return (
        <div className="auth-container">
            <h2>Регистрация</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
                    <input
                        {...register("name")}
                        placeholder="Имя (необязательно)"
                    />
                </div>

                <div className="form-group">
                    <input
                        {...register("email", {
                            required: "Email обязателен",
                            pattern: {
                                value: /^\S+@\S+$/i,
                                message: "Некорректный email",
                            },
                        })}
                        placeholder="Email"
                        type="email"
                    />
                    {errors.email && (
                        <span className="error">{errors.email.message}</span>
                    )}
                </div>

                <div className="form-group">
                    <input
                        {...register("password", {
                            required: "Пароль обязателен",
                            minLength: {
                                value: 6,
                                message: "Минимум 6 символов",
                            },
                        })}
                        placeholder="Пароль"
                        type="password"
                    />
                    {errors.password && (
                        <span className="error">{errors.password.message}</span>
                    )}
                </div>

                <div className="form-group">
                    <input
                        {...register("confirmPassword", {
                            validate: (value) =>
                                value === password || "Пароли не совпадают",
                        })}
                        placeholder="Повторите пароль"
                        type="password"
                    />
                    {errors.confirmPassword && (
                        <span className="error">
                            {errors.confirmPassword.message}
                        </span>
                    )}
                </div>

                <button type="submit" className="auth-button">
                    Зарегистрироваться
                </button>
            </form>

            <p className="auth-switch">
                Уже есть аккаунт?{" "}
                <button type="button" onClick={onSwitchToLogin}>
                    Войти
                </button>
            </p>
        </div>
    );
}
