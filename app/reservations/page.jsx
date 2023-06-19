import getReservations from "../actoins/getResesrvations";
import { ReservationsClient } from "./ReservationsClient";
import getCurrentUser from "../actoins/getCurrentUser";
// import getListings from "./actoins/getListings";
import { ClientOnly } from "../components/ClientOnly";
import { Container } from "../components/Container";
import { EmptyState } from "../components/EmptyState";

const ReservationsPage = async () => {
 const currentUser = await getCurrentUser()
    if (!currentUser) return <ClientOnly><EmptyState title="Unauthorised" subtitle="Please login" /></ClientOnly>
    const reservations = await getReservations({ authorId: currentUser.id });
    if (reservations.length === 0) return <ClientOnly><EmptyState title="No reservatins found" subtitle="Looks like you have no reservations on your properties" /></ClientOnly>
    

    return (
        <ClientOnly>
           <ReservationsClient reservations={reservations} currentUser={currentUser} />
        </ClientOnly>
    );
}

export default ReservationsPage
