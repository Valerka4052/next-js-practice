
import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { toast } from 'react-hot-toast';
import useLoginModal from "./useLoginModal";

const useFavorite = ({ listingId, currentUser }) => {
    const router = useRouter();
    const loginModal = useLoginModal();
    const hasFavorite = useMemo(() => {
        const list = currentUser?.favoriteIds || [];
        return list.includes(listingId);
    }, [currentUser, listingId]);
    const toggleFavorite = useCallback(
        async (e) => {
            e.stopPropagation();
            if (!currentUser) return loginModal.onOpen();
            try {
                let request;
                if (hasFavorite) {
                    request = () => axios.delete(`api/favorites/${listingId}`);
                } else {
                    request = () => axios.post(`api/favorites/${listingId}`);
                }
                await request();
                router.refresh();
                toast.success('Success')
            } catch (error) {
                toast.error('Something went wrong');
            }
        },
        [currentUser, hasFavorite, listingId, loginModal, router],
    );
    return { toggleFavorite, hasFavorite };
};

export default useFavorite

