import * as React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

export default function Footer() {
    return (
        <footer>
            <nav>
                <ul>
                    <li><Link to="/otzyv">Отзывы</Link></li>
                    <li>butkeeva.42012</li>
                </ul>
            </nav>
        </footer>
    );
}