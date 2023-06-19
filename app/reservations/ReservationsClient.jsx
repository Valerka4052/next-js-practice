'use client'
import { useRouter } from 'next/navigation';
import { Container } from "../components/Container";
import { Heading } from "../components/Heading";
import { ListingCard } from '../components/listings/ListingCard';
import { toast } from 'react-hot-toast'
import axios from 'axios';
import { useCallback,useState } from 'react';

export const ReservationsClient = ({ reservations, currentUser }) => {
    const router = useRouter();
    const [deletingId, setdeletingId] = useState('');
    const onCancel = useCallback((id) => {
        setdeletingId(id);
        axios.delete(`/api/reservations/${id}`)
            .then(() => { toast.success('reservation cancelled'); router.refresh() })
            .catch((error) => toast.error('Something went wrong'))
            .finally(() => setdeletingId(''));
    }, [router],);

    return (
        <Container>
            <Heading title='Reservations' subtitle='Bookings on your properties' />
            <div className='mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8'>
                {reservations.map(reservation => <ListingCard
                    key={reservation.id}
                    data={reservation.listing}
                    reservation={reservation}
                    actionId={reservation.id}
                    onAction={onCancel}
                    disabled={deletingId === reservation.id}
                    actionLabel='Cancel guest reservation'
                    currentUser={currentUser}
                />)}
            </div>
        </Container>
    );
};

