import { EmptyState } from "../components/EmptyState";
import { ClientOnly } from "../components/ClientOnly";
import getCurrentUser from "../actoins/getCurrentUser";
import getReservations from "../actoins/getResesrvations";
import { TripsClient } from "./TripsClient";

const TripsPage = async () => {
    const currentUser = await getCurrentUser()
    if (!currentUser) return <ClientOnly><EmptyState title="Unauthorised" subtitle="Please login" /></ClientOnly>
    const reservations = await getReservations({ userId: currentUser.id });
    if (reservations.length === 0) return <ClientOnly><EmptyState title="No trips found" subtitle="Looks like you havent any trips" /></ClientOnly>
    return (
        <ClientOnly>
            <TripsClient reservations={reservations} currentUser={currentUser} />
        </ClientOnly>
    );
};

export default TripsPage
