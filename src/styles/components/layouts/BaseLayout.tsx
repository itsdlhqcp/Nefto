import { FunctionComponent, ReactNode } from 'react'
 
type Props = {
  children: ReactNode | ReactNode[]
}
 
const BaseLayout: FunctionComponent<Props> = ({ children }) => {
  return(
    <>
    
    <div className='PY-16 bg-gray-50 overflow-auto min-h-screen'>
      <div className='max-w-7xl mx-auto px-4 space-y-8 sm:px-6 lg:px-8'>
    {children}
    </div>
    </div>
    </>
    
  ) 
}
export default BaseLayout