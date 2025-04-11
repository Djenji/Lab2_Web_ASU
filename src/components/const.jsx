import React from 'react';
import Lab1 from './components menu/StrLab1';
import Lab2 from './components menu/StrLab2';
import Lab3 from './components menu/StrLab3';
import Lab4 from './components menu/StrLab4';
import Lab5 from './components menu/StrLab5';
import Lab6 from './components menu/StrLab6';
import Lab7 from './components menu/StrLab7';
import Lab8 from './components menu/StrLab8';
import Lab9 from './components menu/StrLab9';
import FeedbackPage from './feedback/FeedbackPage';

export const pages = [
    { linktitle: 'Лабораторная работа 1', path: 'StrLab1', element: <Lab1 /> },
    { linktitle: 'Лабораторная работа 2', path: 'StrLab2', element: <Lab2 /> },
    { linktitle: 'Лабораторная работа 3', path: 'StrLab3', element: <Lab3 /> },
    { linktitle: 'Лабораторная работа 4', path: 'StrLab4', element: <Lab4 /> },
    { linktitle: 'Лабораторная работа 5', path: 'StrLab5', element: <Lab5 /> },
    { linktitle: 'Лабораторная работа 6', path: 'StrLab6', element: <Lab6 /> },
    { linktitle: 'Лабораторная работа 7', path: 'StrLab7', element: <Lab7 /> },
    { linktitle: 'Лабораторная работа 8', path: 'StrLab8', element: <Lab8 /> },
    { linktitle: 'Лабораторная работа 9', path: 'StrLab9', element: <Lab9 /> },
    { linktitle: 'Отзывы', path: 'otzyv', element: <FeedbackPage /> },
];