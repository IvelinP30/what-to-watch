import { Flex, Spinner } from "@chakra-ui/react"
import ProviderCard from "../Providers/ProviderCard"

const ProvidersGrid = ({ providers = [] }) => {
    return (
        <Flex flexWrap='wrap' gap={10} mt={10} justifyContent="center" pb="50px">
            {
                providers.length > 0 ?
                    providers?.map(provider => {
                        return (
                            <ProviderCard provider={provider} key={provider.id} />
                        )
                    })
                    :
                    <Spinner
                        thickness='4px'
                        speed='0.65s'
                        emptyColor='gray.200'
                        color='main.100'
                        size='xl'
                        margin='200px auto'
                    />
            }
        </Flex>
    )
}

export default ProvidersGrid