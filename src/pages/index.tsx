
// import { Inter } from '@next/font/google'


// const inter = Inter({ subsets: ['latin'] })

// export default function Home() {
//   return (
//     <>HELLO WORLD</>
//   )
// }

import { NextPage } from 'next'
import BaseLayout from '@/styles/components/layouts/BaseLayout'


const Home: NextPage = () => {

  return (
    <BaseLayout>
    <div >
      Helooooooo
    </div>
    </BaseLayout>
  )
}
export default Home
