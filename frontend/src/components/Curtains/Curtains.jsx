import { Box, keyframes } from "@chakra-ui/react";
import { useState } from "react";

const Curtains = () => {
    const [isAnimationFinished, setIsAnimationFinished] = useState(false);

    const openRight = keyframes`
        0% { right: 0; }
        60% { right: -90%; filter: blur(5px); }
        100% { right: -100vw; filter: blur(0); }
    `;

    const openLeft = keyframes`
        0% { left: 0; }
        60% { left: -90%; filter: blur(5px); }
        80% { left: -90%; filter: blur(2px); }
        100% { left: -100vw; filter: blur(0); }
    `;


    const openRightAnimation = `${openRight} 2.5s ease-in-out forwards`;
    const openLeftAnimation = `${openLeft} 2.5s ease-in-out forwards 0.3s`;

    const handleAnimationEnd = () => {
        setIsAnimationFinished(true);
    };

    return (
        <Box position="absolute" height="100vh" width="100vw">
            <Box
                position="absolute"
                right="0"
                width="100%"
                height="200%"
                animation={openRightAnimation}
                onAnimationEnd={handleAnimationEnd}
                zIndex={isAnimationFinished ? -1 : 9999}
            >
                {[...Array(10)].map((_, i) => (
                    <Box
                        key={i}
                        position="absolute"
                        top="-30%"
                        right={`${-10 * (i + 1)}%`}
                        backgroundColor={i % 2 === 0 ? "main.200" : "main.100"}
                        borderRadius="50% 0% 0% 100% / 0% 0% 0% 100%"
                        width="100%"
                        height="100%"
                        onAnimationEnd={handleAnimationEnd}
                        zIndex={isAnimationFinished ? -1 : 9999}
                    />
                ))}
            </Box>

            {/* Left Curtain */}
            <Box
                position="absolute"
                left="0"
                width="100%"
                height="200%"
                animation={openLeftAnimation}
                onAnimationEnd={handleAnimationEnd}
                zIndex={isAnimationFinished ? -1 : 9999}
            >
                {[...Array(10)].map((_, i) => (
                    <Box
                        key={i}
                        position="absolute"
                        top="-30%"
                        left={`${-10 * (i + 1)}%`}
                        backgroundColor={i % 2 === 0 ? "main.200" : "main.100"}
                        borderRadius="50% 0% 100% 0% / 0% 0% 100% 100%"
                        width="100%"
                        height="100%"
                        zIndex={990 + i}
                    />
                ))}
            </Box>
        </Box>
    );
};

export default Curtains;
