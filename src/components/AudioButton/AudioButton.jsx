import { useState, useEffect } from 'react';
import { IconButton, Tooltip, keyframes } from '@chakra-ui/react';
import { FaVolumeUp, FaStopCircle } from 'react-icons/fa';

const AudioButton = ({ text }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [selectedVoice, setSelectedVoice] = useState(null);
    const [voicesLoaded, setVoicesLoaded] = useState(false);

    useEffect(() => {
        const loadVoices = () => {
            const availableVoices = speechSynthesis.getVoices();
            const voice = availableVoices.find((voice) => voice.name === 'Daniel' && voice.lang === 'en-GB');

            if (voice) {
                setSelectedVoice(voice);
                setVoicesLoaded(true);
            } else {
                const defaultVoice = availableVoices.find((voice) => voice.lang === 'en-US');
                setSelectedVoice(defaultVoice);
                setVoicesLoaded(true);
            }
        };

        if (speechSynthesis.getVoices().length > 0) {
            loadVoices();
        } else {
            speechSynthesis.onvoiceschanged = loadVoices;
        }

        return () => {
            speechSynthesis.cancel();
        };
    }, []);

    const handleSpeechEnd = () => {
        setIsPlaying(false);
    };

    const handlePlayAudio = () => {
        if (!selectedVoice) return;

        if (isPlaying) {
            speechSynthesis.cancel();
            setIsPlaying(false);
        } else {
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.voice = selectedVoice;
            utterance.rate = 1;
            utterance.pitch = 1;
            utterance.volume = 1;

            speechSynthesis.speak(utterance);

            setIsPlaying(true);
            utterance.onend = handleSpeechEnd;
        }
    };

    const soundWave = keyframes`
        0% { transform: scale(1); opacity: 1; }
        50% { transform: scale(1.08); opacity: 0.7; }
        100% { transform: scale(1); opacity: 1; }
    `;

    return (
        <Tooltip label={isPlaying ? 'Stop Reading' : 'Start Reading'} hasArrow>
            <IconButton
                height="40px"
                width="50px"
                onClick={handlePlayAudio}
                icon={isPlaying ? <FaStopCircle /> : <FaVolumeUp />}
                colorScheme={isPlaying ? 'red' : 'blue'}
                aria-label={isPlaying ? 'Stop Reading' : 'Listen to Text'}
                size="md"
                isDisabled={!voicesLoaded}
                css={isPlaying ? { animation: `${soundWave} 1s infinite` } : {}}
            />
        </Tooltip>
    );
};

export default AudioButton;
