import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionIcon,
    AccordionPanel,
    RangeSlider,
    RangeSliderTrack,
    RangeSliderFilledTrack,
    RangeSliderThumb,
    Text,
    Box,
    Flex,
    Button,
    Drawer,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    DrawerHeader,
    DrawerBody,
    useDisclosure,
    Divider

} from "@chakra-ui/react";

import { useState, useEffect, useRef } from "react";
import { genres } from '../../common/genres'

const FilterControlls = ({ setPageNumber, setCurrentItems, setItemsFilter }) => {

    const [minYearValue, setMinYearValue] = useState(1901);
    const [maxYearValue, setMaxYearValue] = useState(2025);
    const [yearRange, setYearRange] = useState([1901, 2025]);
    const [minScoreValue, setMinScoreValue] = useState(1);
    const [maxScoreValue, setMaxScoreValue] = useState(10);
    const [scoreRange, setScoreRange] = useState([1, 10]);
    const [selectedGeneres, setSelectedGeneres] = useState([]);

    useEffect(() => {
        setItemsFilter({ yearRange, scoreRange, selectedGeneres })
    }, [yearRange, scoreRange, selectedGeneres, setItemsFilter])

    const changeYearRange = () => {
        setYearRange([minYearValue, maxYearValue])
        setPageNumber(1);
        setCurrentItems([]);
    }

    const changeScoreRange = () => {
        setScoreRange([minScoreValue, maxScoreValue])
        setPageNumber(1);
        setCurrentItems([]);
    }

    const toggleGenre = (e) => {
        const genreId = Object.keys(genres).find(key => genres[key].genre === e.target.innerText);

        if (selectedGeneres.includes(genreId)) {
            setSelectedGeneres(currentGenres => currentGenres.filter(genre => genre !== genreId))
        } else {
            setSelectedGeneres(currentGenres => [...currentGenres, genreId]);
        }
        setPageNumber(1);
        setCurrentItems([]);

    }

    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = useRef()

    return (
        <>

            <Button
                ref={btnRef}
                onClick={onOpen}
                border='0'
                position='fixed'
                backgroundColor='main.100'
                color='#fff'
                bottom='200px'
                overflow="hidden"
                boxShadow='1px 1px 50px -11px rgba(0,0,0,0.75)'
                borderRadius='0 40px 40px 0'
                zIndex='100'
                display={{ base: 'flex', md: 'none' }}
                _before={{
                    position: "absolute",
                    content: `""`,
                    width: "100%",
                    height: "100%",
                    backgroundColor: 'secondary.100',
                    transition: 'transform 500ms ease-in-out',
                    transform: 'scaleX(0)',
                    transformOrigin: 'left',

                }}
                _hover={{
                    _before: { transform: 'scaleX(1)' }
                }}>
                <Text zIndex='1' color='#fff'>Categories & Filters</Text>
            </Button >

            <Drawer
                isOpen={isOpen}
                placement='left'
                onClose={onClose}
                finalFocusRef={btnRef}
                display={{ base: 'flex', md: 'none' }}
            >
                <DrawerOverlay />
                <DrawerContent backgroundColor='background.100'>
                    <DrawerCloseButton backgroundColor='main.100' color='#fff' top='0' right='0' borderRadius='0 0 0 10px' />
                    <DrawerHeader color='#fff'>Categories & Filters</DrawerHeader>
                    <Divider />
                    <DrawerBody padding='0'>
                        <Accordion
                            allowMultiple
                            index={[0, 1, 2]}
                            flexDirection='column'
                            position='sticky'
                            top="1rem"
                            width='100%'
                            alignSelf='flex-start'
                            zIndex='100'
                        >
                            <AccordionItem>
                                <h2>
                                    <AccordionButton backgroundColor='background.200' cursor="default" _hover={{ backgroundColor: 'background.200' }} mb={5}>
                                        <Box as="span" flex='1' textAlign='left' color='#fff' fontWeight='bold'>
                                            Year
                                        </Box>
                                    </AccordionButton>
                                </h2>
                                <AccordionPanel padding='1rem 2rem'>
                                    <RangeSlider
                                        aria-label={['min', 'max']}
                                        defaultValue={[1901, 2025]}
                                        min={1901}
                                        max={2025}
                                        onChange={(val) => { setMinYearValue(val[0]); setMaxYearValue(val[1]); }}
                                        onChangeEnd={() => changeYearRange()}
                                    >
                                        <RangeSliderTrack height='.5rem' borderRadius='30px'>
                                            <RangeSliderFilledTrack backgroundColor='main.100' />
                                        </RangeSliderTrack>
                                        <RangeSliderThumb index={0} value={minYearValue} textAlign='center'
                                            backgroundColor='main.100'
                                            color='white'


                                        ><Text fontSize='xs' margin='0 0 2.5rem -2rem'>{minYearValue}</Text></RangeSliderThumb>
                                        <RangeSliderThumb index={1} value={maxYearValue} textAlign='center'
                                            backgroundColor='main.100'
                                            color='white'
                                        ><Text fontSize='xs' margin='0 0 2.5rem 2rem'>{minYearValue === maxYearValue ? '' : maxYearValue}</Text></RangeSliderThumb>
                                    </RangeSlider>
                                </AccordionPanel>
                            </AccordionItem>
                            <AccordionItem >
                                <h2>
                                    <AccordionButton backgroundColor='background.200' cursor="default" _hover={{ backgroundColor: 'background.200' }} mb={5}>
                                        <Box as="span" flex='1' textAlign='left' color='#fff' fontWeight='bold'>
                                            Score
                                        </Box>
                                    </AccordionButton>
                                </h2>
                                <AccordionPanel padding='1rem 2rem'>
                                    <RangeSlider
                                        aria-label={['min', 'max']}
                                        defaultValue={[1, 10]}
                                        min={1}
                                        max={10}
                                        onChange={(val) => { setMinScoreValue(val[0]); setMaxScoreValue(val[1]); }}
                                        onChangeEnd={() => changeScoreRange()}
                                    >
                                        <RangeSliderTrack height='.5rem' borderRadius='30px'>
                                            <RangeSliderFilledTrack backgroundColor='main.100' />
                                        </RangeSliderTrack>
                                        <RangeSliderThumb index={0} value={minScoreValue} textAlign='center'
                                            backgroundColor='main.100'
                                            color='white'


                                        ><Text fontSize='xs' margin='0 0 2.5rem 0'>{minScoreValue}</Text></RangeSliderThumb>
                                        <RangeSliderThumb index={1} value={maxScoreValue} textAlign='center'
                                            backgroundColor='main.100'
                                            color='white'
                                        ><Text fontSize='xs' margin='0 0 2.5rem 0'>{minScoreValue === maxScoreValue ? '' : maxScoreValue}</Text></RangeSliderThumb>
                                    </RangeSlider>
                                </AccordionPanel>
                            </AccordionItem>
                            <AccordionItem >
                                <h2>
                                    <AccordionButton backgroundColor='background.200' cursor="default" _hover={{ backgroundColor: 'background.200' }} mb={2}>
                                        <Box as="span" flex='1' textAlign='left' color='#fff' fontWeight='bold'>
                                            Genre
                                        </Box>
                                    </AccordionButton>
                                </h2>
                                <AccordionPanel padding='0'>
                                    <Flex
                                        flexDirection='column'
                                        maxHeight='400px'
                                        overflowY='scroll'
                                        sx={{
                                            "::-webkit-scrollbar": {
                                                width: "10px",
                                            },
                                            "::-webkit-scrollbar-track": {
                                                background: 'main.100',
                                                borderRadius: '3px'
                                            },
                                            "::-webkit-scrollbar-thumb": {
                                                background: 'main.200',
                                                borderRadius: '3px'
                                            }
                                        }}
                                    >
                                        {

                                            Object.values(genres).map(genre => (<Box key={genre.id} width='100%' padding='0.5rem 2rem' cursor='pointer' color='#fff' marginTop='0.2rem' _hover={{ 'backgroundColor': '#5e5d5d' }} backgroundColor={selectedGeneres.includes(genre.id.toString()) ? 'main.100' : 'none'} onClick={(e) => toggleGenre(e)}>{genre.genre}</Box>))
                                        }
                                    </Flex>
                                </AccordionPanel>
                            </AccordionItem>

                        </Accordion>
                    </DrawerBody>


                </DrawerContent>
            </Drawer>

            <Accordion
                allowMultiple
                flexDirection='column'
                position='sticky'
                top='10rem'
                margin='14.5rem 2rem 2rem 2rem'
                width={{ base: '70%', md: '35%', lg: '20%' }}
                alignSelf='flex-start'
                background='rgba(255, 255, 255, 0.16)'
                boxShadow='0 4px 10px rgba(0, 0, 0, 0.1)'
                backdropFilter='blur(4.6px)'
                border='1px solid rgba(255, 255, 255, 0.1)'
                display={{ base: 'none', md: 'flex' }}
                zIndex='99'
            >
                <AccordionItem >
                    <h2>
                        <AccordionButton>
                            <Box as="span" flex='1' textAlign='left' color='#fff' fontWeight='bold'>
                                Year
                            </Box>
                            <AccordionIcon color='#fff' />
                        </AccordionButton>
                    </h2>
                    <AccordionPanel padding='1rem 2rem' height='60px' display='flex' alignItems='end'>
                        <RangeSlider
                            aria-label={['min', 'max']}
                            defaultValue={[1901, 2025]}
                            min={1901}
                            max={2025}
                            onChange={(val) => { setMinYearValue(val[0]); setMaxYearValue(val[1]); }}
                            onChangeEnd={() => changeYearRange()}
                        >
                            <RangeSliderTrack height='.5rem' borderRadius='30px'>
                                <RangeSliderFilledTrack backgroundColor='main.100' />
                            </RangeSliderTrack>
                            <RangeSliderThumb index={0} value={minYearValue} textAlign='center'
                                backgroundColor='main.100'
                                color='white'


                            ><Text fontSize='xs' margin='0 0 2.5rem -2rem'>{minYearValue}</Text></RangeSliderThumb>
                            <RangeSliderThumb index={1} value={maxYearValue} textAlign='center'
                                backgroundColor='main.100'
                                color='white'
                            ><Text fontSize='xs' margin='0 0 2.5rem 2rem'>{minYearValue === maxYearValue ? '' : maxYearValue}</Text></RangeSliderThumb>
                        </RangeSlider>
                    </AccordionPanel>
                </AccordionItem>
                <AccordionItem >
                    <h2>
                        <AccordionButton>
                            <Box as="span" flex='1' textAlign='left' color='#fff' fontWeight='bold'>
                                Score
                            </Box>
                            <AccordionIcon color='#fff' />
                        </AccordionButton>
                    </h2>
                    <AccordionPanel padding='1rem 2rem' height='60px' display='flex' alignItems='end'>
                        <RangeSlider
                            aria-label={['min', 'max']}
                            defaultValue={[1, 10]}
                            min={1}
                            max={10}
                            onChange={(val) => { setMinScoreValue(val[0]); setMaxScoreValue(val[1]); }}
                            onChangeEnd={() => changeScoreRange()}
                        >
                            <RangeSliderTrack height='.5rem' borderRadius='30px'>
                                <RangeSliderFilledTrack backgroundColor='main.100' />
                            </RangeSliderTrack>
                            <RangeSliderThumb index={0} value={minScoreValue} textAlign='center'
                                backgroundColor='main.100'
                                color='white'


                            ><Text fontSize='xs' margin='0 0 2.5rem 0'>{minScoreValue}</Text></RangeSliderThumb>
                            <RangeSliderThumb index={1} value={maxScoreValue} textAlign='center'
                                backgroundColor='main.100'
                                color='white'
                            ><Text fontSize='xs' margin='0 0 2.5rem 0'>{minScoreValue === maxScoreValue ? '' : maxScoreValue}</Text></RangeSliderThumb>
                        </RangeSlider>
                    </AccordionPanel>
                </AccordionItem>
                <AccordionItem >
                    <h2>
                        <AccordionButton>
                            <Box as="span" flex='1' textAlign='left' color='#fff' fontWeight='bold'>
                                Genre
                            </Box>
                            <AccordionIcon color='#fff' />
                        </AccordionButton>
                    </h2>
                    <AccordionPanel padding='0'>
                        <Flex
                            flexDirection='column'
                            maxHeight='350px'
                            overflowY='scroll'
                            sx={{
                                "::-webkit-scrollbar": {
                                    width: "10px",
                                },
                                "::-webkit-scrollbar-track": {
                                    background: 'main.100',
                                },
                                "::-webkit-scrollbar-thumb": {
                                    background: 'main.200',
                                }
                            }}
                        >
                            {

                                Object.values(genres).map(genre => (
                                    <Box key={genre.id} width='100%' padding='0.5rem 2rem' cursor='pointer' color='#fff' marginTop='0.2rem' _hover={{ 'backgroundColor': '#5e5d5d' }} backgroundColor={selectedGeneres.includes(genre.id.toString()) ? 'main.100' : 'none'} onClick={(e) => toggleGenre(e)}>{genre.genre}
                                    </Box>
                                ))
                            }

                        </Flex>
                    </AccordionPanel>
                </AccordionItem>

            </Accordion>
        </>

    )
}

export default FilterControlls