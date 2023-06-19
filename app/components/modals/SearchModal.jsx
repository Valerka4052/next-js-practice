'use client'
import useSearchModal from "@/app/hooks/useSearchModal"
import { Modal } from "./Modal";
import qs from 'query-string'
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useMemo, useState } from "react";
import dynamic from 'next/dynamic';
import { formatISO } from "date-fns";
import {stringifyUrl } from "query-string";
import { Heading } from "../Heading";
import { CountrySelect } from "../inputs/CountrySelect";
import { Calendar } from "../inputs/Calendar";
import { Counter } from "../inputs/Counter";
const steps = {
    location: 0,
    date: 1,
    info: 2
};

export const SearchModal = () => {
    const router = useRouter();
    const params = useSearchParams();
    const { onClose, isOpen } = useSearchModal();
    const [step, setStep] = useState(steps.location);
    const [guestCount, setGuestCount] = useState(1);
    const [roomCount, setRoomCount] = useState(1);
    const [bathroomCount, setBathroomCount] = useState(1);
    const [dateRange, setDateRange] = useState({ startDate: new Date(), endDate: new Date(), key: 'selection' });
    const [location, setLocation] = useState(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const Map = useMemo(() => dynamic(() => import('../Map'), { ssr: false }), [location]);

    const onBack = () => setStep(prev => prev - 1);
    const onNext = () => setStep(prev => prev + 1);

    const onSubmit = useCallback(async () => {
        if (step !== steps.info) return onNext();
        let currentQuery = {}
        if (params) currentQuery = qs.parse(params.toString());
        const updatedQuery = { ...currentQuery, locationValue: location?.value, guestCount, roomCount, bathroomCount };
        if (dateRange.startDate) updatedQuery.startDate = formatISO(dateRange.startDate);
        if (dateRange.endDate) updatedQuery.endDate = formatISO(dateRange.endDate);
        const url = qs.stringifyUrl({ url: '/', query: updatedQuery }, { skipNull: true });
        setStep(steps.location);
        onClose();
        router.push(url);
    }, [bathroomCount, dateRange.endDate, dateRange.startDate, guestCount, location?.value, onClose, params, roomCount, router, step]);

    const actionLabel = useMemo(() => {
        if (step === steps.info) return 'Search';
        return 'Next';
    }, [step]);
    const secondaryActionLabel = useMemo(() => {
        if (step === steps.location) return undefined;
        return 'Back'
    }, [step]);

    let bodyContent = (
        <div className="flex flex-col gap-8">
            <Heading title='Where do you wanna go?' subtitle='Find the perfect location' />
            <CountrySelect value={location} onChange={(value) => setLocation(value)} />
            <hr />
            <Map center={location?.latlng} />
        </div>
    );
    if (step === steps.date) bodyContent = (
        <div className="flex flex-col gap-8">
            <Heading title='When do you plan to go?' subtitle='Make shure everyone is free' />
            <Calendar value={dateRange} onChange={(value) => setDateRange(value.selection)} />
        </div>
    );
    if (step === steps.info) bodyContent = (
        <div className="flex flex-col gap-8">
            <Heading title='More information' subtitle='Find your perfect place' />
            <Counter title='Guests' subtitle='How many guests are coming?' value={guestCount} onChange={(value) => setGuestCount(value)} />
            <hr />
            <Counter title='Rooms' subtitle='How many rooms do you need?' value={roomCount} onChange={(value) => setRoomCount(value)} />
            <hr />
            <Counter title='Bathrooms' subtitle='How many bathrooms do you need?' value={bathroomCount} onChange={(value) => setBathroomCount(value)} />
        </div>
    );

    return <Modal
        body={bodyContent}
        secondaryActionLabel={secondaryActionLabel}
        secondaryAction={step === steps.location ? undefined : onBack}
        actionLabel={actionLabel}
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={onSubmit}
        title='Filters'
    />;
};
