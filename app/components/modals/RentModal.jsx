'use client'
import useRentModal from "@/app/hooks/useRentModal"
import { Modal } from "./Modal"
import { useMemo, useState } from "react";
import { Heading } from "../Heading";
import { categories } from "../navbar/Categories";
import { CategoryInput } from "../inputs/CategoryInput";
import { useForm } from "react-hook-form";
import { CountrySelect } from "../inputs/CountrySelect";
import dynamic from 'next/dynamic'
import { Counter } from "../inputs/Counter";
import { ImageUpload } from "../inputs/ImageUpload";
import { Input } from "../inputs/Input";
import axios from "axios";
import { toast } from "react-hot-toast";
import {useRouter} from 'next/navigation'
const steps = {
    category: 0,
    location: 1,
    info: 2,
    images: 3,
    description: 4,
    price: 5,
};

export const RentModal = () => {
    const rentModal = useRentModal();
    const [step, setStep] = useState(steps.category);
    const defaultValues = { category: '', location: null, guestCount: 1, roomCount: 1, bathroomCount: 1, imageSrc: '', price: 1, title: '', description: '' };
    const { register, handleSubmit, setValue, watch, formState: { errors }, reset } = useForm({ defaultValues });  
    const [isLoading, setisLoading] = useState(false);
    const router = useRouter();
    const category = watch('category');
    const location = watch('location');
    const guestCount = watch('guestCount');
    const roomCount = watch('roomCount');
    const bathroomCount = watch('bathroomCount');
    const imageSrc = watch('imageSrc');

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const Map = useMemo(() => dynamic(() => import('../Map'), { ssr: false }), [location]);
    const setCustomValue = (id, value) => setValue(id, value, { shouldValidate: true, shouldDirty: true, shouldTouch: true, });

    const onBack = () => setStep(prev => prev - 1);
    const onNext = () => setStep(prev => prev + 1);

    const onSubmit = (data) => {
        if (step !== steps.price) return onNext();
        setisLoading(true);
        console.log('data', data)
        axios.post('/api/listings', data)
            .then(() => { toast.success('Listing created!'); router.refresh(); reset(); setStep(steps.category); rentModal.onClose(); })
            .catch(() => { toast.error('Somethig went wrong') })
            .finally(() => setisLoading(false));
    };
       
    const actionLabel = useMemo(() => {
        if (step === steps.price) return 'Create';
        return 'Next'
    }, [step]);
    const secondaryActionLabel = useMemo(() => {
        if (step === steps.category) return undefined;
        return 'Back'
    }, [step]);

    let bodyContent = (
        <div className="flex flex-col gap-8" >
            <Heading title='Which of this best describes your place' subtitle='Pick a category' />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
                {categories.map(({ label, icon }) => (<div key={label} className="col-span-1">
                    <CategoryInput onClick={(category) => setCustomValue('category', category)} selected={category === label} label={label} icon={icon} />
                </div>))}
            </div>
        </div>
    );

    if (step === steps.location) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading title='Where is your place located?' subtitle='Help guests find you!' />
                <CountrySelect value={location} onChange={(value => setCustomValue('location', value))} />
                <Map center={location?.latlng} />
            </div>
        );
    };

    if (step === steps.info) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading title='Share same basics about your place' subtitle='What amenities do you have?' />
                <Counter title='Guests' subtitle='How many guests do you allow?' value={guestCount} onChange={(value) => setCustomValue('guestCount', value)} />
                <hr />
                <Counter title='Rooms' subtitle='How many rooms do you have?' value={roomCount} onChange={(value) => setCustomValue('roomCount', value)} />
                <hr />
                <Counter title='Bathrooms' subtitle='How many bathrooms do you have?' value={bathroomCount} onChange={(value) => setCustomValue('bathroomCount', value)} />
            </div>
        );
    };
        if (step === steps.images) {
            bodyContent = (
                <div className="flex flex-col gap-8">
                    <Heading title='Add a photo of your place' subtitle='Show guests what your place looks like!' />
                    <ImageUpload onChange={(value) => setCustomValue('imageSrc', value)} value={imageSrc} />
                </div>
            );
    };
      if (step === steps.description) {
          bodyContent = (
              <div className="flex flex-col gap-8">
                  <Heading title='How would you describe your place?' subtitle='Short and sweet works best!' />
                  <Input id='title' label='Title' disabled={isLoading} required register={register} errors={errors} />
                  <hr />
                  <Input id='description' label='Descripton' disabled={isLoading} required register={register} errors={errors} />
              </div>
          );
    };
      if (step === steps.price) {
          bodyContent = (
              <div className="flex flex-col gap-8">
                  <Heading title='Set your prise' subtitle='How much do you charge per night?' />
                  <Input id='price' label='Price' disabled={isLoading} type='number' required register={register} formatPrice errors={errors} />
              </div>
          );
    };

    return (
        <Modal title='Airbnb your home'
            body={bodyContent}
            isOpen={rentModal.isOpen}
            onClose={rentModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            actionLabel={actionLabel}
            secondaryActionLabel={secondaryActionLabel}
            secondaryAction={step === steps.category ? undefined : onBack}
        />
    );
};

