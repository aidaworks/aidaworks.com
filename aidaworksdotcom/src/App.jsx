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
const floatSlow = keyframes`
  0% { transform: translate(0, 0); }
  25% { transform: translate(15px, 15px); }
  50% { transform: translate(-10px, 20px); }
  75% { transform: translate(-20px, -10px); }
  100% { transform: translate(0, 0); }
`;

const floatFast = keyframes`
  0% { transform: translate(0, 0); }
  33% { transform: translate(-20px, 15px); }
  66% { transform: translate(20px, -20px); }
  100% { transform: translate(0, 0); }
`;

const twinkle = keyframes`
  0%, 100% { opacity: 0.2; }
  50% { opacity: 1; }
`;

// Theme
let theme = createTheme({
    palette: {
        primary: { main: '#000000' },
        background: {
            default: '#0A0A0F',
            paper: '#ffffff',
        },
    },
    typography: {
        fontFamily: ['Roboto', 'system-ui', 'sans-serif'].join(','),
    },
});

theme = responsiveFontSizes(theme);

// Styled Components
const PageWrapper = styled(Box)(({ isHovered }) => ({
    width: '100vw',
    height: '100vh',
    overflow: 'hidden',
    transition: 'all 0.5s ease-in-out',
    filter: isHovered ? 'blur(3px)' : 'none',
}));

const AnimatedBackground = styled(Box)(({ isHovered }) => ({
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: '#191919',
    overflow: 'hidden',
    transition: 'background 0.5s ease-in-out',
    backgroundColor: isHovered ? '#262625' : '#191919',
}));

const StarLayer = styled(Box)(({ depth = 1, color = 'white', isHovered = false }) => ({
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    animation: `${depth % 2 === 0 ? floatFast : floatSlow} ${25 + depth * 7}s infinite ease-in-out`,
    '&::before': {
        content: '""',
        position: 'absolute',
        width: '400%',
        height: '400%',
        top: '-150%',
        left: '-150%',
        background: `
            radial-gradient(circle at 50% 50%, ${color} ${depth * 0.3}px, transparent ${depth}px) ${depth * 5}px ${depth * 5}px / ${220 + depth * 50}px ${220 + depth * 50}px,
            radial-gradient(circle at 30% 70%, ${color} ${depth * 0.8}px, transparent ${depth * 2}px) ${60 + depth * 15}px ${60 + depth * 15}px / ${180 + depth * 40}px ${180 + depth * 40}px,
            radial-gradient(circle at 70% 30%, ${color} ${depth * 0.2}px, transparent ${depth * 0.6}px) ${30 + depth * 10}px ${30 + depth * 10}px / ${100 + depth * 20}px ${100 + depth * 20}px
        `,
        opacity: isHovered ? 0.9 : 0.5,
        animation: `${twinkle} ${4 + depth}s infinite ease-in-out alternate`,
        transition: 'opacity 0.5s ease-in-out',
        filter: isHovered ? 'brightness(1.3)' : 'none',
    }
}));

const ContentWrapper = styled(Box)({
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 20,
    pointerEvents: 'none',
});

const StyledCard = styled(Card)(({ theme }) => ({
    position: 'relative',
    maxWidth: 400,
    width: '90%',
    margin: 'auto',
    padding: theme.spacing(2),
    transition: 'all 0.3s ease-in-out',
    backgroundColor: '#ffffff',
    pointerEvents: 'auto',
    '&:hover': {
        transform: 'scale(1.02)',
        boxShadow: theme.shadows[8],
    },
}));

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
    zIndex: 10,
});

const App = () => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <ThemeProvider theme={theme}>
            <PageWrapper isHovered={isHovered}>
                <AnimatedBackground isHovered={isHovered}>
                    <StarLayer depth={1} color="rgba(135, 206, 235, 0.6)" isHovered={isHovered} />
                    <StarLayer depth={4} color="rgba(255, 223, 186, 0.5)" isHovered={isHovered} />
                    <StarLayer depth={2} color="rgba(255, 255, 255, 0.7)" isHovered={isHovered} />
                    <StarLayer depth={3} color="rgba(176, 224, 230, 0.4)" isHovered={isHovered} />
                </AnimatedBackground>
            </PageWrapper>
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
                                    src="img/AIDAWORKS_1.png"
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