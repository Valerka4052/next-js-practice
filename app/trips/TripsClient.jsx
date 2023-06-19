'use client'
import { useRouter } from 'next/navigation';
import { Container } from "../components/Container";
import { Heading } from "../components/Heading";
import { useCallback, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { ListingCard } from '../components/listings/ListingCard';

export const TripsClient = ({ reservations, currentUser }) => {
  const router = useRouter();
  const [deletingId, setdeletingId] = useState('');
  const onCancel = useCallback((id) => {
    setdeletingId(id);
    axios.delete(`/api/reservations/${id}`)
      .then(() => { toast.success('reservation cancelled'); router.refresh() })
      .catch((error) => toast.error(error?.response?.data?.error))
      .finally(() => setdeletingId(''));
  }, [router],);


  return (
    <Container>
      <Heading title='Trips' subtitle='Where have you been and where you going' />
      <div className='mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8'>
        {reservations.map(reservation => <ListingCard
          key={reservation.id}
          data={reservation.listing}
          reservation={reservation}
          actionId={reservation.id}
          onAction={onCancel}
          disabled={deletingId === reservation.id}
          actionLabel='Cancel reservation'
          currentUser={currentUser}
        />)}
      </div>
    </Container>
  );
};

