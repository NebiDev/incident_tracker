
import { Skeleton } from '@/app/components'
import {  Flex, Card, Box } from '@radix-ui/themes'




const LoadingIncidentDetailPage = () => {
  return (
      <Box className='max-w-4xl '>
          <Skeleton/>
          <Flex gap="2" align="center" className='mb-3'>
              <Skeleton width='5rem' />
              <Skeleton width='10rem' />
          </Flex>
          <Card className='prose max-w-none mt-4'>
              <Skeleton count={5} />
          </Card>

      </Box>
  )
}

export default LoadingIncidentDetailPage
