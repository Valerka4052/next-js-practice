'use client'

import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import useFavorite from "../hooks/useFavorite";

export const HeartButton = ({ currentUser, listingId }) => {
    const { toggleFavorite, hasFavorite } = useFavorite({ listingId, currentUser });

    return (
        <div onClick={toggleFavorite} className="relative hover:opcity-80 transition cursor-pointer" >
            <AiOutlineHeart size={28} className="fill-white absolute -top-[2px] -right-[2px] " />
            <AiFillHeart size={24} className={`${hasFavorite ? 'fill-rose-500' : 'fill-neutral-500/70'}`} />
        </div>
    );
};

