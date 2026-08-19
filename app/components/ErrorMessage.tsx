import { PropsWithChildren, ReactNode } from 'react'
import { Text } from '@radix-ui/themes'

const ErrorMessage = ({ children }: PropsWithChildren) => {
    if (!children) return null;
  return (
    
          <Text color="red" as="p" size="2" weight="medium">
              {children}
          </Text>  

  )
}

export default ErrorMessage
