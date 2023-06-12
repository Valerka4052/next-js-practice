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

export const LoginModal = () => {
    const router = useRouter()
    const loginModal = useLoginModal();
    const [isLoading, setisLoading] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: { email: '', password: '', } });

    const onSubmit = (data) => {
        console.log('data', data)
        // setisLoading(true);
        signIn('credentials', { ...data, redirect: false })
        //     .then((res) => {console.log('res',res)});
        // if (callback?.ok) {
        //     toast.success('Logged in');
        //     router.refresh();
        //     loginModal.onClose();
        // };
        // if (callback?.error) toast.error(callback.error);
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
            <Button outline label='Continue with Google' icon={FcGoogle} onClick={() => console.log('google')} />
            <Button outline label='Continue with Github' icon={AiFillGithub} onClick={() => console.log('Github')} />
            <div className="text-neutral-500 text-center mt-4 font-light">
                <div onClick={loginModal.onClose} className=' justify-center flex flex-row items-center gap-2'>
                    <div>Already have account?</div>
                    <div className='text-neutral-800 cursor-pointer hover:underline' >Log in</div>
                </div>
            </div>
        </div>
    );
    return <Modal disabled={isLoading} isOpen={loginModal.isOpen} title={'Log in'} actionLabel={'Continue'} onClose={loginModal.onClose} onSubmit={handleSubmit(onSubmit)} footer={footerContent} body={bodyContent} />
};

