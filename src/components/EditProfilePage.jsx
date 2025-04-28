import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLoginState } from "../hooks/useLoginState";
import {
    TextField,
    Button,
    Container,
    Typography,
    Box,
    Paper,
    CircularProgress,
    Alert,
} from "@mui/material";
import { updateUserProfile } from "../api";

function EditProfilePage() {
    const { updateUser } = useLoginState();
    const { userId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);

    const [formData, setFormData] = useState({ name: "", email: "" });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const effectiveUserId = userId || user?.id;

    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name || user.username || "",
                email: user.email || "",
            });
        }
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Проверяем, что ID является числом от 1 до 100
        if (
            isNaN(effectiveUserId) ||
            effectiveUserId < 1 ||
            effectiveUserId > 100
        ) {
            setError(
                "Некорректный ID пользователя. Допустимые значения: 1-100."
            );
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const updatedData = {
                id: effectiveUserId,
                username: formData.name,
                name: formData.name,
                email: formData.email,
            };

            const result = await dispatch(
                updateUserProfile(updatedData)
            ).unwrap();
            updateUser({
                name: result.username || result.name,
                email: result.email,
            });
            setSuccess(true);
            setTimeout(() => navigate("/profile"), 1000);
        } catch (err) {
            setError(err.message || "Ошибка сохранения");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container maxWidth="sm">
            <Box sx={{ mt: 4 }}>
                <Paper elevation={3} sx={{ p: 4 }}>
                    <Typography variant="h4" gutterBottom>
                        Редактирование профиля
                    </Typography>

                    {error && (
                        <Alert severity="error" sx={{ mb: 2 }}>
                            {error}
                        </Alert>
                    )}
                    {success && (
                        <Alert severity="success" sx={{ mb: 2 }}>
                            Профиль успешно обновлен!
                        </Alert>
                    )}

                    <form onSubmit={handleSubmit}>
                        <TextField
                            fullWidth
                            margin="normal"
                            label="Имя"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            disabled={loading}
                        />
                        <TextField
                            fullWidth
                            margin="normal"
                            label="Email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            disabled={loading}
                        />
                        <Box
                            sx={{
                                mt: 3,
                                display: "flex",
                                justifyContent: "space-between",
                            }}
                        >
                            <Button
                                variant="outlined"
                                onClick={() => navigate(-1)}
                                disabled={loading}
                            >
                                Отмена
                            </Button>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                disabled={loading}
                                startIcon={
                                    loading ? (
                                        <CircularProgress size={20} />
                                    ) : null
                                }
                            >
                                {loading ? "Сохранение..." : "Сохранить"}
                            </Button>
                        </Box>
                    </form>
                </Paper>
            </Box>
        </Container>
    );
}

export default EditProfilePage;
