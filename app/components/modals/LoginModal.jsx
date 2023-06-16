'use client'
import { signIn } from "next-auth/react"

import { AiFillGithub } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { useCallback, useState } from 'react';
import { Fieldvalues, SubmitHandler, useForm } from 'react-hook-form';
import { Modal } from './Modal';
import { Heading } from '../Heading';
import { Input } from '../inputs/Input';
import { toast } from 'react-hot-toast';
import { Button } from '../Button';
import useLoginModal from '@/app/hooks/useLoginModal';
import { useRouter } from 'next/navigation';
import useRegisterModal from "@/app/hooks/useRegisterModal";

export const LoginModal = () => {
    const router = useRouter()
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const [isLoading, setisLoading] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: { email: '', password: '', } });
    const toggle = useCallback(
        () => {
            loginModal.onClose();
            registerModal.onOpen();
        },
        [loginModal, registerModal],
    );

    const onSubmit = (data) => {
        console.log('data', data)
        setisLoading(true);
        signIn('credentials', { ...data, redirect: false })
            .then((callback) => {
                console.log('res', callback); setisLoading(false);
                if (callback?.error) return toast.error(callback.error);
                if (callback?.ok) {
                    toast.success('Logged in');
                    router.refresh();
                    loginModal.onClose();
                };
            });
    };

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Heading title='Welcome back' subtitle='log in to your account!' />
            <Input id={'email'} label={'Email'} disabled={isLoading} register={register} errors={errors} required />
            <Input id={'password'} label={'Password'} type='password' disabled={isLoading} register={register} errors={errors} required />
        </div>
    );
    const footerContent = (
        <div className="flex flex-col gap-4 mt-3">
            <hr />
            <Button outline label='Continue with Google' icon={FcGoogle} onClick={() => signIn('google')} />
            <Button outline label='Continue with Github' icon={AiFillGithub} onClick={() => signIn("github")} />
            <div className="text-neutral-500 text-center mt-4 font-light">
                <div onClick={toggle} className=' justify-center flex flex-row items-center gap-2'>
                    <div>First time using Airbnb?</div>
                    <div className='text-neutral-800 cursor-pointer hover:underline' >Create account</div>
                </div>
            </div>
        </div>
    );
    return <Modal disabled={isLoading} isOpen={loginModal.isOpen} title={'Log in'} actionLabel={'Continue'} onClose={loginModal.onClose} onSubmit={handleSubmit(onSubmit)} footer={footerContent} body={bodyContent} />
};

