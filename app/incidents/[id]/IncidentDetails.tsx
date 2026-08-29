import { Heading, Card, Flex, Text } from '@radix-ui/themes'
import ReactMarkdown from 'react-markdown'
import IncidentStatusBadge from '../../components/IncidentStatusBadge'
import { Incident } from '@/app/generated/prisma/client' 



const IncidentDetails = ({ incident }: { incident: Incident }) => {
    return (
        < >
            <Heading>{incident.title}</Heading>
            <Flex gap="2" align="center" className='mb-3'>
                <IncidentStatusBadge status={incident.status} />
                <Text>{incident.createdAt.toDateString()}</Text>
            </Flex>
            <Card className='prose max-w-full mt-4'>
                <ReactMarkdown>{incident.description}</ReactMarkdown>
            </Card>

        </>
    )
}

export default IncidentDetails
