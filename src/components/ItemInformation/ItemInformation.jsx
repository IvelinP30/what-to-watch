import { Flex, Image, Text } from "@chakra-ui/react";
import {isoLangs} from "../../common/isoLangs"

const ItemInformation = ({item, type}) => {

    return (
        item?.success !== false ?
        <Flex flexDirection={{ base: 'column', md: 'row', lg: 'column' }} flexBasis='25%' alignItems={{ base: 'center', md: 'bold' }} zIndex='100'>
            <Image src={`https://image.tmdb.org/t/p/original/${item?.poster_path}`} fallbackSrc="/placeholder.jpg" fit='contain' width={{ base: '60%', lg: '100%' }} marginRight={{ base: '1rem', lg: '0' }} />
            <Flex flexDirection='column' margin='0.5rem 0'>
                <Text as='h2' fontSize='2.5rem' fontWeight='black' color='#fff' padding='0.5rem 0'>{item?.title}</Text>
                <Text as='h3' fontSize='1.5rem' fontWeight='bold' color='#C0C0C0' padding='0 0 1rem 0'>{item.tagline}</Text>
                <Flex gap='0.5rem'>
                    <Text color='#e1e1e1' fontWeight='bold'>Score: </Text>
                    <Text color='#afafaf'>{item?.vote_average?.toFixed(1)}</Text>
                </Flex>
                <Flex gap='0.5rem'>
                    <Text color='#e1e1e1' fontWeight='bold'>Language: </Text>
                    <Text color='#afafaf'>{isoLangs[item?.original_language]?.name}</Text>
                </Flex>
                <Flex gap='0.5rem'>
                    <Text color='#e1e1e1' fontWeight='bold'>Genere:</Text>
                    <Text color='#afafaf'>{item?.genres?.map((genre) => genre.name).join(", ")}</Text>
                </Flex>
                <Flex gap='0.5rem'>
                    <Text color='#e1e1e1' fontWeight='bold'>Status:</Text>
                    <Text color='#afafaf'>{item.status}</Text>
                </Flex>
                <Flex gap='0.5rem'>
                    <Text color='#e1e1e1' fontWeight='bold'>Released on:</Text>
                    {
                        type === 'movie'
                            ? <Text color='#afafaf'>{new Date(item.release_date).toLocaleDateString("en-US") }</Text>
                            : <Text color='#afafaf'>{new Date(item?.first_air_date).toLocaleDateString("en-US")}</Text>
                    }

                </Flex>
                <Flex gap='0.5rem'>
                    {
                        type === 'movie'
                            ?
                            <>
                                <Text color='#e1e1e1' fontWeight='bold'>Duration:</Text>
                                <Text color='#afafaf'>{item?.runtime} mins</Text>
                            </>
                            :
                            <>
                                <Text color='#e1e1e1' fontWeight='bold'>Number of episodes:</Text>
                                <Text color='#afafaf'>{item?.number_of_episodes}</Text>
                            </>
                    }

                </Flex>
                {item.budget && (
                    <Flex gap='0.5rem' marginTop='2rem'>
                        <Text color='#e1e1e1' fontWeight='bold'>Budget:</Text>
                        <Text color='#afafaf'>{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(item.budget)}</Text>
                    </Flex>
                )}
                {item.revenue && (
                    <Flex gap='0.5rem' marginBottom='1.5rem'>
                        <Text color='#e1e1e1' fontWeight='bold'>Revenue:</Text>
                        <Text color='#afafaf'>{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(item.revenue)}</Text>
                    </Flex>
                )}
                {item?.production_companies &&
                    <Flex flexDirection='column' marginTop='20px'>
                        <Text color='#e1e1e1' fontWeight='bold'>Production Companies:</Text>
                        <Flex flexWrap='wrap' width='100%' gap='10px'>
                            {item?.production_companies.map(company =>
                                <Image key={company.link + company.logo_path} src={`https://image.tmdb.org/t/p/original/${company.logo_path}`} backgroundColor='white' borderRadius='10px' marginTop='10px' padding='5px' width={{ base: '20%', md: '35%', lg: '40%' }} fallbackSrc="/placeholder.jpg" />
                            )}
                        </Flex>
                    </Flex>
                }
                {item?.providers?.results?.US?.buy &&
                    <Flex flexDirection='column' marginTop='20px'>
                        <Text color='#e1e1e1' fontWeight='bold' marginBottom='5px'>Available to buy on:</Text>
                        <Flex flexWrap='wrap' gap='4px'>
                            {item?.providers?.results?.US?.buy.map(provider =>
                                <Image key={provider.link + provider.logo_path} src={`https://image.tmdb.org/t/p/original/${provider.logo_path}`} width={{ base: '10%', md: '15%', lg: '20%' }} fallbackSrc="/placeholder.jpg" />
                            )}
                        </Flex>
                    </Flex>
                }
                {item?.providers?.results?.US?.rent &&
                    <Flex flexDirection='column' marginTop='10px'>
                        <Text color='#e1e1e1' fontWeight='bold' marginBottom='5px'>Available to rent on:</Text>
                        <Flex flexWrap='wrap' gap='4px'>
                            {item?.providers?.results?.US?.rent.map(provider =>
                                <Image key={provider.link + provider.logo_path} src={`https://image.tmdb.org/t/p/original/${provider.logo_path}`} width={{ base: '10%', md: '15%', lg: '20%' }} fallbackSrc="/placeholder.jpg" />
                            )}
                        </Flex>
                    </Flex>
                }
                {
                    item?.providers?.success === false ? 
                        <Text color='#e1e1e1' fontWeight='bold' marginTop='10px'>There was an error showing the providers. Please try again.</Text>
                        :
                    item?.providers?.results?.US?.buy === undefined && item?.providers?.results?.US?.rent === undefined ?
                    <Text color='#e1e1e1' fontWeight='bold' marginTop='10px'>*Not available online</Text>
                    :
                    <></>
                    
                }
            </Flex>
            
        </Flex>
        :
        <Flex color='#fff' fontSize='3xl' justifyContent='center' alignItems='center' flexBasis='20%'>
            <Text>There was an error loading the information. Please try again.</Text>
        </Flex>
    )
}

export default ItemInformation