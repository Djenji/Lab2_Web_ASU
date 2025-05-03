// Импорт React - необходим для работы с JSX
import React from "react";

// Импорт утилит для тестирования из React Testing Library:
// - render: для "рендеринга" компонента в тестовой среде
// - screen: содержит методы для поиска элементов в DOM
import { render, screen } from "@testing-library/react";

// Импорт тестируемого компонента
import FBD from "./FBD";

// Блок describe группирует связанные тесты (тест-сьют)
describe("FBD Component", () => {
    // Первый тест-кейс: проверка отображения текста при отсутствии отзывов в режиме "Только сегодня"
    it('should display "Сегодня еще никто не оставил отзыв" when no feedbacks and showOnlyToday=true', () => {
        // Рендерим компонент с заданными пропсами
        render(
            <FBD
                filteredFeedbacks={[]} // Пустой массив отзывов
                isDarkTheme={false} // Светлая тема
                showOnlyToday={true} // Режим "Только сегодня"
                setShowOnlyToday={jest.fn()} // Mock-функция для setState
            />
        );

        // Проверяем, что отображается заголовок "Нет отзывов за сегодня"
        expect(screen.getByText("Нет отзывов за сегодня")).toBeInTheDocument();

        // Проверяем, что отображается поясняющий текст
        expect(
            screen.getByText("Сегодня еще никто не оставил отзыв")
        ).toBeInTheDocument();
    });

    // Второй тест-кейс: проверка отображения текста при отсутствии отзывов в обычном режиме
    it('should display "Будьте первым, кто оставит отзыв!" when no feedbacks and showOnlyToday=false', () => {
        render(
            <FBD
                filteredFeedbacks={[]}
                isDarkTheme={false}
                showOnlyToday={false} // Обычный режим (не "Только сегодня")
                setShowOnlyToday={jest.fn()}
            />
        );

        // Проверяем основной заголовок
        expect(
            screen.getByText("Нет отзывов для отображения")
        ).toBeInTheDocument();

        // Проверяем поясняющий текст
        expect(
            screen.getByText("Будьте первым, кто оставит отзыв!")
        ).toBeInTheDocument();
    });

    // Третий тест-кейс: проверка, что сообщения об отсутствии отзывов не показываются, когда отзывы есть
    it("should not display no feedback message when there are feedbacks", () => {
        // Тестовые данные - массив с одним отзывом
        const testFeedbacks = [
            {
                id: 1,
                name: "Test User",
                feedback: "Test feedback",
                date: new Date().toISOString(),
            },
        ];

        render(
            <FBD
                filteredFeedbacks={testFeedbacks} // Передаем тестовые отзывы
                isDarkTheme={false}
                showOnlyToday={false}
                setShowOnlyToday={jest.fn()}
            />
        );

        // Проверяем ОТСУТСТВИЕ сообщения "Нет отзывов для отображения"
        expect(
            screen.queryByText("Нет отзывов для отображения")
        ).not.toBeInTheDocument();

        // Проверяем ОТСУТСТВИЕ сообщения "Будьте первым..."
        expect(
            screen.queryByText("Будьте первым, кто оставит отзыв!")
        ).not.toBeInTheDocument();

        // Проверяем, что отображается имя тестового пользователя
        expect(screen.getByText("Test User")).toBeInTheDocument();
    });
});
