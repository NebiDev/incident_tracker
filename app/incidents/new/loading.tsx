import { Skeleton } from '@/app/components'
import {Box, Flex } from '@radix-ui/themes'


const LoadingNewIncidentPage = () => {
  return (
    <Box className='max-w-4xl '>
        <Skeleton/>
        <Flex gap="2" align="center" className='mb-3'>
            <Skeleton width='5rem' />
            <Skeleton width='10rem' />
        </Flex>
        {/* <Box className='prose max-w-none mt-4'>
            <Skeleton count={5} />
        </Box> */}
        
      
    </Box>
  )
}

export default LoadingNewIncidentPage
