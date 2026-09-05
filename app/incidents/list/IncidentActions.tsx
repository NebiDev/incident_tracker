
import NextLink from 'next/link'
import { Button } from '@radix-ui/themes'
import { Plus } from 'lucide-react';
import { Flex } from '@radix-ui/themes'
import IncidentStatusFilter from './IncidentStatusFilter'

const IncidentActions = () => {
  return (
    <Flex justify="between" >
        <IncidentStatusFilter/>
      <Button>
        <NextLink href="/incidents/new" className='flex items-center gap-2'>
          <Plus size={16} />
          New Incident
        </NextLink>
      </Button>
      
    </Flex>
  )
}

export default IncidentActions
