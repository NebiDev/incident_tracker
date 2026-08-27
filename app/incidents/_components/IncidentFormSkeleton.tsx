import { Box } from "@radix-ui/themes";
import { Skeleton } from "@/app/components";

const IncidentFormSkeleton = () => {
    return (
        <>
            <Box className='max-w-4xl '>
                <Skeleton height='2rem' />
                <Skeleton height='25rem' />

            </Box>

        </>
    )
}

export default IncidentFormSkeleton
