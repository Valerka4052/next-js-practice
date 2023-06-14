'use client'

import Image from "next/image";

export const Avatar = ({src}) => {
  return (
    <Image className="rounded-full" width={30} height={30} alt="Avatar" src={src || '/images/placeholder.jpg'} />
  );
};
  
