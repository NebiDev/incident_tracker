
import NextLink from 'next/link'
import { Button } from '@radix-ui/themes'
import React from 'react'
import { Flex } from '@radix-ui/themes'
import IncidentStatusFilter from './IncidentStatusFilter'

const IncidentActions = () => {
  return (
    <Flex mb="5" justify="between" align="center">
        <IncidentStatusFilter/>
      <Button >
        <NextLink href="/incidents/new" className='flex items-center gap-2'>
          New Incident
        </NextLink>
      </Button>
      
    </Flex>
  )
}

export default IncidentActions
