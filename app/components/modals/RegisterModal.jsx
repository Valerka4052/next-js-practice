'use client'

import axios from 'axios';
import { AiFillGithub } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { useCallback, useState } from 'react';
import { Fieldvalues, SubmitHandler, useForm } from 'react-hook-form';
import useRegisterModal from '@/app/hooks/useRegisterModal';
import { Modal } from './Modal';
import { Heading } from '../Heading';
import { Input } from '../inputs/Input';
import { toast } from 'react-hot-toast';
import { Button } from '../Button';


export const RegisterModal = () => {
    const registerModal = useRegisterModal();
    const [isLoading, setisLoading] = useState(false);
    console.log('registerModal', registerModal);
    const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: { name: '', email: '', password: '', } });
    const onSubmit = (data) => {
        setisLoading(true);
        axios.post('/api/register', data).then(() => registerModal.onClose())
            .catch((error) => toast.error('Something went wrong'))
            .finally(setisLoading(false));
    };
    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Heading title='Welcome to Airbnb' subtitle='Create account!' />
            <Input id={'email'} label={'Email'} disabled={isLoading} register={register} errors={errors} required />
            <Input id={'name'} label={'Name'} disabled={isLoading} register={register} errors={errors} required />
            <Input id={'password'} label={'Password'} type='password' disabled={isLoading} register={register} errors={errors} required />
        </div>
    );
    const footerContent = (
        <div className="flex flex-col gap-4 mt-3">
            <hr />
            <Button outline label='Continue with Google' icon={FcGoogle} onClick={()=>console.log('google')} />
                        <Button outline label='Continue with Github' icon={AiFillGithub} onClick={()=>console.log('Github')} />
            <div className="text-neutral-500 text-center mt-4 font-light">
                <div onClick={registerModal.onClose} className=' justify-center flex flex-row items-center gap-2'><div>Already have account?</div><div className='text-neutral-800 cursor-pointer hover:underline' >Log in</div> </div>
</div>
        </div>
    )
    return <Modal disabled={isLoading} isOpen={registerModal.isOpen} title={'Register'} onClose={registerModal.onClose} onSubmit={handleSubmit(onSubmit)} footer={footerContent} body={bodyContent} />
};

