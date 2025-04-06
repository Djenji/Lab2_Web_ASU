import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import { Link } from 'react-router-dom';
import '../App.css';

export default function FixedBottomNavigation() {
    const [value, setValue] = React.useState(0);
    const ref = React.useRef(null);

    return (
    <Box sx={{ pb: 7 }} ref={ref}>
        <CssBaseline />
        <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, display: 'flex', justifyContent: 'center'}} elevation={3}>
        <nav>
                <ul>
                    <li><Link to="/about">О нас</Link></li>
                    <li><Link to="/contact">Контакты</Link></li>
                    butkeeva.42012
                </ul>
                </nav>
        </Paper>
    </Box>
    );
}