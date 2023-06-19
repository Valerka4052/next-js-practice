
import getCurrentUser from "../actoins/getCurrentUser";
import { ClientOnly } from "../components/ClientOnly";
import { EmptyState } from "../components/EmptyState";
import getFaforiteListings from "../actoins/getFaforiteListings";
import { FavoritesClient } from "./FavoritesClient";

const FavoritesPage = async () => {
    const currentUser = await getCurrentUser();
    if (!currentUser) return <ClientOnly><EmptyState title="Unauthorised" subtitle="Please login" /></ClientOnly>
    const listings = await getFaforiteListings({ authorId: currentUser.id });
    if (listings.length === 0) return <ClientOnly><EmptyState title="No favorites found" subtitle="Looks like you have no favorite listings" /></ClientOnly>
    return (
        <ClientOnly>
            <FavoritesClient listings={listings} currentUser={currentUser} />
        </ClientOnly>
    );
};

export default FavoritesPage
