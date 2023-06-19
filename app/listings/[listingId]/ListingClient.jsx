'use client'

import { useCallback, useEffect, useMemo, useState } from "react";
import { categories } from "@/app/components/navbar/Categories";
import { Container } from "@/app/components/Container";
import { ListingHead } from "@/app/components/listings/ListingHead";
import { ListingInfo } from "@/app/components/listings/ListingInfo";
import useLoginModal from "@/app/hooks/useLoginModal";
import { useRouter } from 'next/navigation';
import { differenceInCalendarDays, differenceInDays, eachDayOfInterval } from "date-fns";
import axios from "axios";
import { toast } from "react-hot-toast";
import { ListingReservation } from "@/app/components/listings/ListingReservation";

const initialDateRange = {
    startDate: new Date,
    endDate: new Date,
    key: 'selection'
};

export const ListingClient = ({ currentUser, listing, reservations = [] }) => {
    const { imageSrc, description, locationValue, id, title, category, user, roomCount, guestCount, bathroomCount, price } = listing;
    const {loginModal} = useLoginModal();
    const router = useRouter();
    const disabledDates = useMemo(() => {
        let dates = [];
        reservations.forEach(({ startDate, endDate }) => {
            const range = eachDayOfInterval({ start: new Date(startDate), end: new Date(endDate) });
            dates = [...dates, ...range];
        })
        return dates;
    }, [reservations]);

    const [isLoading, setIsLoading] = useState(false);
    const [totalPrice, settotalPrice] = useState(price);
    const [dateRange, setdateRange] = useState(initialDateRange);

    const createReservation = useCallback(
      () => {
            if (!currentUser) return loginModal.onOpen();
            setIsLoading(true);
            axios.post('/api/reservations', { totalPrice, startDate: dateRange.startDate, endDate: dateRange.endDate, listingId: listing?.id })
                .then(() => { toast.success('Listing reserved!'); setdateRange(initialDateRange); router.push('/trips') })
                .catch((error) => { toast.error('Something went wrong') })
                .finally(() => setIsLoading(false));
      },
      [currentUser, dateRange.endDate, dateRange.startDate, listing?.id, loginModal, router, totalPrice],
    )

    useEffect(() => {
        if (dateRange.startDate && dateRange.endDate) {
            const dayCount = differenceInDays(dateRange.endDate, dateRange.startDate);
        
        if (dayCount && price) {
            settotalPrice(dayCount * price);
        } else {
            settotalPrice(price);
        }}
    }, [dateRange.endDate, dateRange.startDate, price]);
    
    

    const categori = useMemo(() => categories.find(({ label }) => label === category), [category]);

    return (
        <Container>
            <div className="max-w-screen mx-auto">
                <div className="flex flex-col gap-6">
                    <ListingHead title={title} imageSrc={imageSrc} locationValue={locationValue} id={id} currentUser={currentUser} />
                    <div className="grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6">
                        <ListingInfo  user={user} category={categori} locationValue={locationValue} description={description} roomCount={roomCount} bathroomCount={bathroomCount} guestCount={guestCount} />
                        <div className="order-first mb-10 md:order-last md:col-span-3">
                            <ListingReservation price={price} totalPrice={totalPrice} onChangeDate={(value)=>setdateRange(value)} dateRange={dateRange} onSubmit={createReservation} disabled={isLoading} disabledDates={disabledDates} />
                   </div>
                    </div>
                </div>
            </div>
        </Container>
    );
};

