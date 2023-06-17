import getCurrentUser from "@/app/actoins/getCurrentUser";
import getListingById from "@/app/actoins/getListingById";
import { ClientOnly } from "@/app/components/ClientOnly";
import { EmptyState } from "@/app/components/EmptyState";
import { ListingClient } from "./ListingClient"; 

const ListingPage = async ({ params }) => {
    const { listingId } = params;
    const listing = await getListingById(listingId);
    const currentUser = await getCurrentUser();
    if (!listing) return <ClientOnly><EmptyState /></ClientOnly>
    return (
        <ClientOnly>
            <ListingClient listing={listing} currentUser={currentUser} />
        </ClientOnly>
    );
};

export default ListingPage
