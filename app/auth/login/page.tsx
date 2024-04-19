"use client"
import Image from 'next/image'
import React from 'react'
import SelectSection from './features/selectSection/SelectSection'
import { useLoginStore } from '@/store/auth/login/LoginStore';
import GalleryLoginForm from './features/galleryForm/Form';
import IndividualLoginForm from './features/individualForm/Form';

function Page() {
    const { current } = useLoginStore();
    
    return (
        <section className="h-[100vh] w-full grid place-items-center overflow-x-hidden">
            <div className="w-full h-full md:grid grid-cols-[1fr_1.3fr]">
                {/* Side section */}
                <div className='w-full h-full bg-authSideDark relative hidden md:block'>
                    <Image
                        fill={true}
                        src={'/authSideImage.svg'}
                        objectFit="cover"
                        alt="auth side image"
                    />
                    <div className='absolute h-[100vh] w-full py-10 px-7 flex flex-col'>
                        <div className='flex-1' />
                        <div className='pb-10 text-white'>
                            <h1 className='text-2xl font-medium'>Enter your login details</h1>
                            <p className='mt-2'>If you are really interested in getting artworks for reasonable prices, then sign up</p>
                        </div>
                    </div>
                </div>
                {/* Form section */}
                <div className='w-full h-full p-5 md:px-[50px] overflow-x-hidden'>
                    {/* removed initial selection page */}
                    {/* {current === 0 && <SelectSection />} */}
                    {current === 0 && <IndividualLoginForm />}
                    {current === 1 && <GalleryLoginForm /> }
                </div>
            </div>
        </section>
    )
}

export default Page