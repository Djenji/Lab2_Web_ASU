import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import "../../App.css";

export default function LoginForm({ onLogin, onSwitchToRegister }) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const [loginError, setLoginError] = useState(null);
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
            await onLogin({
                email: data.email,
                password: data.password
            });
            navigate("/");
        } catch (err) {
            setLoginError(err.message);
        }
    };

    return (
        <div className="auth-container">
            <h2>Вход</h2>
            {loginError && (
                <div className="error-message" style={{ color: 'red', marginBottom: '15px' }}>
                    {loginError}
                </div>
            )}
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
                    <input
                        {...register("email", { required: "Email обязателен" })}
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
                        })}
                        placeholder="Пароль"
                        type="password"
                    />
                    {errors.password && (
                        <span className="error">{errors.password.message}</span>
                    )}
                </div>

                <button type="submit" className="auth-button">
                    Войти
                </button>
            </form>

            <p className="auth-switch">
                Нет аккаунта?{" "}
                <button type="button" onClick={onSwitchToRegister}>
                    Зарегистрироваться
                </button>
            </p>
        </div>
    );
}