'use client'
import { AiOutlineMenu } from 'react-icons/ai';
import { Avatar } from '../Avatar';
import { useCallback, useState } from 'react';
import { MenuItem } from './MenuItem';
import useRegisterModal from '@/app/hooks/useRegisterModal';
import useLoginModal from '@/app/hooks/useLoginModal';
import useRentModal from '@/app/hooks/useRentModal';
import {signOut} from 'next-auth/react'

export const UserMenu = ({currentUser}) => {
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const rentModal = useRentModal();
    const [isOpen, setIsOpen] = useState(false);
        const onRent = useCallback(
        () => {
                if (!currentUser) return loginModal.onOpen();
                rentModal.onOpen();
        },
        [currentUser, loginModal, rentModal],
    );
    const toggleOpen = useCallback(
        () => {
            setIsOpen(prev => !prev);
        },
        [],
    );
    
    return (
        <div className="relative">
            <div className="flex flex-row items-center gap-3">
                <div className="hidden md:block text:sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer" onClick={onRent}>
                    Airbnb your home
                </div>
                <div className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition" onClick={toggleOpen}>
                    <AiOutlineMenu />
                    <div className='hidden md:block'>
                        <Avatar src={currentUser?.image} />
                    </div>
                </div>
            </div>
            {isOpen && (<div className='absolute rounded-xl shadow-md w-[40vw] md:w3/4 bg-white overflow-hidden right-0 top-12 text-sm'>
                <div className='flex flex-col cursor-pointer'>
                    {currentUser ? (
                        <>
                            <MenuItem label={'My trips'} onClick={() => { }} />
                            <MenuItem label={'My favorites'} onClick={() => { }} />
                            <MenuItem label={'My reservations'} onClick={() => { }} />
                            <MenuItem label={'My properties'} onClick={() => { }} />
                            <MenuItem label={'Airbnb is my home'} onClick={rentModal.onOpen} />
                            <hr />
                            <MenuItem label={'Log out'} onClick={() => signOut()} />
                        </>
                    ) : (
                        <>
                            <MenuItem label={'Login'} onClick={loginModal.onOpen} />
                            <MenuItem label={'Sign Up'} onClick={registerModal.onOpen} />

                        </>)}
                </div>
            </div>)}
        </div>
    );
};


