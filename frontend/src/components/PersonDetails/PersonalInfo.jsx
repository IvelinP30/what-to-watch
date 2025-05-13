import { Flex, Image, Text } from "@chakra-ui/react";
import SocialLinks from "../SocialLinks/SocialLinks";
import { genders } from '../../common/genders';

const PersonalInfo = ({ person }) => {

    const formatDateAndAge = (date, deathday = null) => {
        const dateObject = new Date(date);
        const formattedDate = dateObject.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
        });

        let age;
        if (deathday) {
            const deathDate = new Date(deathday);
            age = deathDate.getFullYear() - dateObject.getFullYear();

            const isBirthdayPassed = new Date(deathDate.setFullYear(deathDate.getFullYear(), dateObject.getMonth(), dateObject.getDate())) < deathDate;
            age = isBirthdayPassed ? age : age - 1;

            return `Day of Death: ${formattedDate} (${age} years old)`;
        } else {
            const currentYear = new Date().getFullYear();
            age = currentYear - dateObject.getFullYear();

            const isBirthdayPassed = new Date().setFullYear(currentYear, dateObject.getMonth(), dateObject.getDate()) < new Date();
            const finalAge = isBirthdayPassed ? age : age - 1;

            return `${formattedDate} (${finalAge} years old)`;
        }
    };


    return (
        person?.success !== false ?
            <Flex flexDirection={{ base: 'column', md: 'row', lg: 'column' }} flexBasis='30%' alignItems={{ base: 'center', md: 'bold' }} zIndex='100'>
                <Image src={`https://image.tmdb.org/t/p/original/${person?.profile_path}`} borderRadius={15} fallbackSrc="/placeholder.jpg" fit='contain' width={{ base: '60%', lg: '100%' }} marginRight={{ base: '1rem', lg: '0' }} />
                <Flex flexDirection='column' margin='1.5rem 0' gap={3}>
                    <Flex width="100%" justifyContent="flex-end" mb={4}>
                        {(person.externalIds || person.homepage) && <SocialLinks externalIds={person.externalIds} homepage={person.homepage} />}
                    </Flex>
                    <Text as='h2' fontSize='2rem' fontWeight='black' color='#fff' padding='0.5rem 0'>Personal Info</Text>
                    <Flex gap='0.5rem'>
                        <Text color='#e1e1e1' fontWeight='bold'>Known For: </Text>
                        <Text color='#afafaf'>{person?.known_for_department}</Text>
                    </Flex>
                    <Flex gap='0.5rem'>
                        <Text color='#e1e1e1' fontWeight='bold'>Gender: </Text>
                        <Text color='#afafaf'>{genders[person?.gender]?.gender}</Text>
                    </Flex>
                    <Flex gap='0.5rem'>
                        <Text color='#e1e1e1' fontWeight='bold'>Birthdate:</Text>
                        <Text color='#afafaf'>{formatDateAndAge(person.birthday) ?? '-'}</Text>
                    </Flex>
                    {person.deathday && (
                        <Flex gap='0.5rem'>
                            <Text color='#e1e1e1' fontWeight='bold'>Day of Death:</Text>
                            <Text color='#afafaf'>{formatDateAndAge(person.deathday)}</Text>
                        </Flex>
                    )}
                    <Flex gap='0rem' flexDirection='column'>
                        <Text color='#e1e1e1' fontWeight='bold'>Place of Birth:</Text>
                        <Text color='#afafaf'>{person.place_of_birth ?? '-'}</Text>
                    </Flex>
                    {person?.also_known_as?.length > 0 && (
                        <Flex direction="column" gap="0.25rem" maxWidth="100%">
                            <Text color='#e1e1e1' fontWeight='bold'>Also Known As:</Text>
                            {person.also_known_as.map((name, index) => (
                                <Text key={index} color='#afafaf'>{name}</Text>
                            ))}
                        </Flex>
                    )}
                </Flex>
            </Flex>
            :
            <Flex color='#fff' fontSize='3xl' justifyContent='center' alignItems='center' flexBasis='20%'>
                <Text>There was an error loading the information. Please try again.</Text>
            </Flex>
    )
}

export default PersonalInfo