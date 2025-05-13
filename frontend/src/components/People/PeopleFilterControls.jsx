import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionIcon,
    AccordionPanel,
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

const departments = [
    "Acting",
    "Crew",
    "Directing",
    "Production",
    "Sound",
    "Visual Effects",
    "Writing"
];

const genders = ["Male", "Female"];

const PeopleFilterControls = ({ setPageNumber, setCurrentPeople, setPeopleFilter }) => {
    const [selectedGenders, setSelectedGenders] = useState(genders);
    const [selectedDepartments, setSelectedDepartments] = useState([]);
    const allSelectedGenders = selectedGenders.length === 0;

    useEffect(() => {
        setPeopleFilter({ genders: selectedGenders, departments: selectedDepartments });
    }, [selectedGenders, selectedDepartments, setPeopleFilter]);


    const toggleDepartment = (dept) => {
        setSelectedDepartments((current) => {
            const updatedDepartments = current.includes(dept)
                ? current.filter((d) => d !== dept)
                : [...current, dept];

            return updatedDepartments;
        });

        setPageNumber(1);
        setCurrentPeople([]);
    };

    const toggleGender = (gender) => {
        setSelectedGenders(current => {
            let updated = current.includes(gender)
                ? current.filter(g => g !== gender)
                : [...current, gender];

            if (updated.length === 0) {
                updated = [...genders];
            }

            return updated;
        });

        setPageNumber(1);
        setCurrentPeople([]);
    };


    const { isOpen, onOpen, onClose } = useDisclosure();
    const btnRef = useRef();

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
                    content: `""`,
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    backgroundColor: 'secondary.100',
                    transition: 'transform 500ms ease-in-out',
                    transform: 'scaleX(0)',
                    transformOrigin: 'left',
                }}
                _hover={{
                    _before: { transform: 'scaleX(1)' }
                }}
            >
                <Text zIndex='1' color='#fff'>Filters</Text>
            </Button>

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
                    <DrawerHeader color='#fff'>Filters</DrawerHeader>
                    <Divider />
                    <DrawerBody p={0}>
                        <Accordion
                            allowMultiple
                            index={[0, 1, 2]}
                            flexDirection='column'
                            position='sticky'
                            top="1rem"
                            width='100%'
                            alignSelf='flex-start'
                            zIndex='100'>
                            <AccordionItem>
                                <AccordionButton backgroundColor='background.200' cursor="default" _hover={{ backgroundColor: 'background.200' }}>
                                    <Box as="span" flex='1' textAlign='left' color='#fff' fontWeight='bold'>
                                        Gender
                                    </Box>
                                </AccordionButton>
                                <AccordionPanel p='1rem 2rem'>
                                    <Flex gap={4} wrap='wrap' p={2}>
                                        {genders.map(gender => (
                                            <Button
                                                as="span"
                                                cursor="pointer"
                                                key={gender}
                                                onClick={() => toggleGender(gender)}
                                                bg={allSelectedGenders || selectedGenders.includes(gender) ? 'main.100' : 'gray.600'}
                                                color='white'
                                                _hover={{ bg: 'main.200' }}
                                                borderRadius='20px'
                                            >
                                                {gender}
                                            </Button>
                                        ))}
                                    </Flex>
                                </AccordionPanel>
                            </AccordionItem>

                            <AccordionItem>
                                <h2>
                                    <AccordionButton backgroundColor='background.200' cursor="default" _hover={{ backgroundColor: 'background.200' }} mb={2}>
                                        <Box as="span" flex='1' textAlign='left' color='#fff' fontWeight='bold'>
                                            Department
                                        </Box>
                                    </AccordionButton>
                                </h2>
                                <AccordionPanel padding='0'>
                                    <Flex direction='column' maxHeight='400px' overflowY='auto'
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
                                        }}>
                                        {departments.map(dept => (
                                            <Box
                                                key={dept}
                                                width='100%'
                                                padding='0.5rem 2rem'
                                                cursor='pointer'
                                                marginTop='0.2rem'
                                                color='#fff'
                                                backgroundColor={selectedDepartments.includes(dept) ? 'main.100' : 'none'}
                                                _hover={{ backgroundColor: '#5e5d5d' }}
                                                onClick={() => toggleDepartment(dept)}
                                            >
                                                {dept}
                                            </Box>
                                        ))}
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
                <AccordionItem>
                    <h2>
                        <AccordionButton>
                            <Box as='span' flex='1' textAlign='left' color='#fff' fontWeight='bold'>
                                Gender
                            </Box>
                            <AccordionIcon color='#fff' />
                        </AccordionButton>
                    </h2>
                    <AccordionPanel p='1rem 2rem'>
                        <Flex gap={4}>
                            {genders.map(gender => (
                                <Button
                                    as="span"
                                    cursor="pointer"
                                    key={gender}
                                    onClick={() => toggleGender(gender)}
                                    bg={allSelectedGenders || selectedGenders.includes(gender) ? 'main.100' : 'gray.600'}
                                    color='white'
                                    _hover={{ bg: 'main.200' }}
                                    borderRadius='20px'
                                >
                                    {gender}
                                </Button>
                            ))}
                        </Flex>
                    </AccordionPanel>
                </AccordionItem>

                <AccordionItem>
                    <h2>
                        <AccordionButton>
                            <Box as='span' flex='1' textAlign='left' color='#fff' fontWeight='bold'>
                                Department
                            </Box>
                            <AccordionIcon color='#fff' />
                        </AccordionButton>
                    </h2>
                    <AccordionPanel padding='0'>
                        <Flex direction='column' maxHeight='350px' overflowY='auto'
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
                            }}>
                            {departments.map(dept => (
                                <Box
                                    key={dept}
                                    width='100%'
                                    padding='0.5rem 2rem'
                                    cursor='pointer'
                                    color='#fff'
                                    backgroundColor={selectedDepartments.includes(dept) ? 'main.100' : 'none'}
                                    _hover={{ backgroundColor: '#5e5d5d' }}
                                    onClick={() => toggleDepartment(dept)}
                                >
                                    {dept}
                                </Box>
                            ))}
                        </Flex>
                    </AccordionPanel>
                </AccordionItem>
            </Accordion>
        </>
    );
};

export default PeopleFilterControls;
