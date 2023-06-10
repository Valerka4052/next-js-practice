'use client'

import Image from "next/image";

export const Avatar = () => {
  return (
    <Image className="rounded-full" width={30} height={30} alt="Avatar" src={'/images/placeholder.jpg'} />
  );
};
  
