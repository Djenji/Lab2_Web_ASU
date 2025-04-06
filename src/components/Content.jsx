import React from "react";
import { Box } from '@mui/material';
import '../App.css';

function Content({ content }) {
return (
    <Box sx={{ p: 3, mt: 2, mb: 2}}>
    {content}
    </Box>
);
}

export default Content;