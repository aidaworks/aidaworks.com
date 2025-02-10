import React, { useState } from 'react';
import {
    Card,
    CardContent,
    Typography,
    Paper,
    Box,
    ThemeProvider,
    createTheme,
    responsiveFontSizes,
    CircularProgress
} from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';

// Animations
const float = keyframes`
  0% { transform: translateY(0px) translateX(0px); }
  50% { transform: translateY(-20px) translateX(10px); }
  100% { transform: translateY(0px) translateX(0px); }
`;

const connectDots = keyframes`
  0% { opacity: 0; }
  50% { opacity: 0.3; }
  100% { opacity: 0; }
`;

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

// Create a custom theme
let theme = createTheme({
    palette: {
        primary: {
            main: '#000000',
        },
        background: {
            default: '#191919',
            paper: '#ffffff',
        },
    },
    typography: {
        fontFamily: [
            'Roboto',
            'system-ui',
            'sans-serif',
        ].join(','),
    },
});

theme = responsiveFontSizes(theme);

// Styled components
const AnimatedBackground = styled(Box)({
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    overflow: 'hidden',
    background: '#191919',
    '&::before': {
        content: '""',
        position: 'absolute',
        width: '200%',
        height: '200%',
        top: -100,
        left: -100,
        background: 'radial-gradient(circle, rgba(255,255,255,0.1) 2px, transparent 4px)',
        backgroundSize: '50px 50px',
        animation: `${float} 15s infinite linear`,
    },
    '&::after': {
        content: '""',
        position: 'absolute',
        width: '100%',
        height: '100%',
        top: 0,
        left: 0,
        background: `
            linear-gradient(45deg, transparent 45%, rgba(255,255,255,0.1) 50%, transparent 55%) 0 0 / 100px 100px,
            linear-gradient(-45deg, transparent 45%, rgba(255,255,255,0.1) 50%, transparent 55%) 0 0 / 100px 100px
        `,
        animation: `${connectDots} 8s infinite ease-in-out`,
    }
});

const LoadingOverlay = styled(Box)({
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    backdropFilter: 'blur(5px)',
    animation: `${fadeIn} 0.3s ease-in-out`,
    zIndex: 10,
});

const ContentWrapper = styled(Box)({
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
});

const StyledCard = styled(Card)(({ theme }) => ({
    position: 'relative',
    maxWidth: 400,
    width: '90%',
    margin: 'auto',
    padding: theme.spacing(2),
    transition: 'all 0.3s ease-in-out',
    backgroundColor: '#ffffff',
    '&:hover': {
        transform: 'scale(1.02)',
        boxShadow: theme.shadows[8],
    },
}));

const App = () => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <ThemeProvider theme={theme}>
            <AnimatedBackground />
            <ContentWrapper>
                <StyledCard
                    elevation={4}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    {isHovered && (
                        <LoadingOverlay>
                            <Box sx={{ textAlign: 'center' }}>
                                <CircularProgress sx={{ mb: 2 }} />
                                <Typography variant="h6">Próximamente...</Typography>
                            </Box>
                        </LoadingOverlay>
                    )}
                    <CardContent>
                        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                            <Paper
                                elevation={0}
                                sx={{
                                    p: 2,
                                    backgroundColor: 'transparent',
                                }}
                            >
                                <img
                                    src="src/assets/AIDAWORKS_1.png"
                                    alt="AIDAWORKS Logo"
                                    className="w-40 h-40 object-contain"
                                />
                            </Paper>
                        </Box>
                    </CardContent>
                </StyledCard>
            </ContentWrapper>
        </ThemeProvider>
    );
};

export default App;