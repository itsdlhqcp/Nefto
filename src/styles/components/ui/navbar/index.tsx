// /* eslint-disable @next/next/no-img-element */

// ///Navbar UI render from here
// import { Fragment } from 'react'
// import { Disclosure, Menu, Transition } from '@headlessui/react'
// import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
// import ActiveLink from '../nft/link'
// import Link from 'next/link'
// // import { useAccount } from '../hooks'
// import { useWeb3 } from '@/provider/web3'
// import { useAccount } from '../hooks/web3'
// import Walletbar from './Walletbar'



// ///Routing and connection of navbar with differnt pages is navigated from here
// const navigation = [
//   { name: 'Explore', href: '/', current: true },
//   { name: 'Add', href: '/nft/create', current: false },
//   // { name: 'Projects', href: '#', current: false },
//   // { name: 'Calendar', href: '#', current: false },
// ]

// function classNames(...classes: string[]) {
//   return classes.filter(Boolean).join(' ')
// }

// export default function Navbar() {
//   // const { hooks } = useWeb3();  ///account is extracted from browser to webapk here 
//   // const { data } = hooks.useAccount("");

//   const { account } = useAccount();

//   console.log(account.data);           /// Account data fetched and published here and passed at return dev
   
//   // console.log(data);

//   return (
//     <Disclosure as="nav" className="bg-gray-800">
//       {({ open }) => (
//         <>
//         {account.data}
        
//           <div className="px-2 mx-auto max-w-7xl sm:px-6 lg:px-8">
//             <div className="relative flex items-center justify-between h-16">
//               <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
//                 {/* Mobile menu button*/}
//                 <Disclosure.Button className="inline-flex items-center justify-center p-2 text-gray-400 rounded-md hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
//                   <span className="sr-only">Open main menu</span>
//                   {open ? (
//                     <XMarkIcon className="block w-6 h-6" aria-hidden="true" />
//                   ) : (
//                     <Bars3Icon className="block w-6 h-6" aria-hidden="true" />
//                   )}
//                 </Disclosure.Button>
//               </div>
//               <div className="flex items-center justify-center flex-1 sm:items-stretch sm:justify-start">
//                 <div className="flex items-center flex-shrink-0">
//                   <img
//                     className="block w-auto h-8 lg:hidden"
//                     src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
//                     alt="Your Company"
//                   />
//                   <img
//                     className="hidden w-auto h-8 lg:block"
//                     src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
//                     alt="Your Company"
//                   />
//                 </div>
//                 <div className="hidden sm:ml-6 sm:block">
//                   <div className="flex space-x-4">
//                     {navigation.map((item) => (

//                        <ActiveLink
//                        legacyBehavior
//                           key={item.name}
//                           href={item.href}
//                           activeClass="bg-gray-900 text-white"
//                         >
//                             <a
//                              className="px-3 py-2 text-sm font-medium text-gray-300 rounded-md hover:bg-gray-700 hover:text-white"
//                              aria-current={item.current ? 'page' : undefined}
//                            >
//                              {item.name}
//                            </a>
//                         </ActiveLink>



//                       // <a
//                       //   key={item.name}
//                       //   href={item.href}
//                       //   className={classNames(
//                       //     item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
//                       //     'px-3 py-2 rounded-md text-sm font-medium'
//                       //   )}
//                       //   aria-current={item.current ? 'page' : undefined}
//                       // >
//                       //   {item.name}
//                       // </a>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//               <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
//                 {/* <button
//                   type="button"
//                   className="p-1 text-gray-400 bg-gray-800 rounded-full hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
//                 >
//                   <span className="sr-only">View notifications</span>
//                   <BellIcon className="w-6 h-6" aria-hidden="true" />
//                 </button> */}

//                 {/* Profile dropdown */}

// {/* 
//                 {
//                   false ?

// <Menu as="div" className="relative ml-3">
// <div>
//   <Menu.Button className="flex text-sm bg-gray-800 rounded-full focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
//     <span className="sr-only">Open user menu</span>
//     <img
//       className="w-8 h-8 rounded-full"
//       src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
//       alt=""
//     />
//   </Menu.Button>
// </div>
// <Transition
//   as={Fragment}
//   enter="transition ease-out duration-100"
//   enterFrom="transform opacity-0 scale-95"
//   enterTo="transform opacity-100 scale-100"
//   leave="transition ease-in duration-75"
//   leaveFrom="transform opacity-100 scale-100"
//   leaveTo="transform opacity-0 scale-95"
// >
//   <Menu.Items className="absolute right-0 z-10 w-48 py-1 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
//     <Menu.Item>

//       {({ active }) => (
//         <Link
//           href="/profile"
//           className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
//         >
//           Your Profile
//         </Link>
//       )}
//     </Menu.Item> */}
//     {/* <Menu.Item>
//       {({ active }) => (
//         <a
//           href="#"
//           className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
//         >
//           Settings
//         </a>
//       )}
//     </Menu.Item>
//     <Menu.Item>
//       {({ active }) => (
//         <a
//           href="#"
//           className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
//         >
//           Sign out
//         </a>
//       )}
//     </Menu.Item> */}
//   {/* </Menu.Items>
// </Transition>
// </Menu>:
//    <button
//    onClick={() => {
//      // in the next lecture!
//      account.connect();
//    }}
//    type="button"
//    className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//  >
//    Connect Wallet
//  </button>
//                 } */}

// <Walletbar
//                   isInstalled={account.isInstalled}
//                   isLoading={account.isLoading}
//                   connect={account.connect}
//                   account={account.data}
//                 />
                
//               </div>
//             </div>
//           </div>

//           <Disclosure.Panel className="sm:hidden">
//             <div className="px-2 pt-2 pb-3 space-y-1">
//               {navigation.map((item) => (
//                 <Disclosure.Button
//                   key={item.name}
//                   as="a"
//                   href={item.href}
//                   className={classNames(
//                     item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
//                     'block px-3 py-2 rounded-md text-base font-medium'
//                   )}
//                   aria-current={item.current ? 'page' : undefined}
//                 >
//                   {item.name}
//                 </Disclosure.Button>
//               ))}
//             </div>
//           </Disclosure.Panel>
//         </>
//       )}
//     </Disclosure>
//   )
// }



/* eslint-disable @next/next/no-img-element */

import { Disclosure, Menu } from '@headlessui/react';
// import { BellIcon, MenuIcon, XIcon } from '@heroicons/react/outline';
 import { Bars3Icon, BellIcon, CubeIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { useAccount } from '../hooks/web3';
import Link from 'next/link';
import ActiveLink from '../nft/link';

const navigation = [
  { name: 'Marketplace', href: '/', current: true },
  { name: 'Create', href: '/nft/create', current: false }
]

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function Navbar() {
  const { account } = useAccount();

  return (
    <Disclosure as="nav" className="bg-gray-800">
      {({ open }) => (
        <>
          <div className="px-2 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="relative flex items-center justify-between h-16">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu butt*/}
                <Disclosure.Button className="inline-flex items-center justify-center p-2 text-gray-400 rounded-md hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block w-6 h-6" aria-hidden="true" />
                  ) : (
                    <CubeIcon className="block w-6 h-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex items-center justify-center flex-1 sm:items-stretch sm:justify-start">
                <div className="flex items-center flex-shrink-0">
                  <img
                    className="hidden w-auto h-10 lg:block"
                    src="/images/page_logo.png"
                    alt="Workflow"
                  />
                </div>
                <div className="hidden sm:block sm:ml-6">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <ActiveLink
                                           legacyBehavior
                                                key={item.name}
                                                href={item.href}
                                                activeClass="bg-gray-900 text-white"
                                              >
                                                  <a
                                                   className="px-3 py-2 text-sm font-medium text-gray-300 rounded-md hover:bg-gray-700 hover:text-white"
                                                   aria-current={item.current ? 'page' : undefined}
                                                  >
                                                   {item.name}
                                                 </a>
                                              </ActiveLink>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <button
                  type="button"
                  className="p-1 text-gray-400 bg-gray-800 rounded-full hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                >
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="w-6 h-6" aria-hidden="true" />
                </button>

                {/* Profile dropdown */}

                {
                false ?
                <Menu as="div" className="relative z-10 ml-3">
                  <div>
                    <Menu.Button className="flex text-sm bg-gray-800 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="w-8 h-8 rounded-full"
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt=""
                      />
                    </Menu.Button>
                  </div>
                  <Menu.Items className="absolute right-0 w-48 py-1 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <Menu.Item>
                      {({ active }) => (
                        <Link href="/profile">
                          <a
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                          >
                            Your Profile
                          </a>
                        </Link>
                      )}
                    </Menu.Item>
                  </Menu.Items>
                </Menu> :
                <button
                  onClick={() => {
                    account.connect();
                  }}
                  type="button"
                  className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Connect Wallet
                </button>
                }


              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                    'block px-3 py-2 rounded-md text-base font-medium'
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}