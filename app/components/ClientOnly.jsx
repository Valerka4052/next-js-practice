'use client'

import { useEffect, useState } from "react";

export const ClientOnly = ({ children }) => {
    const [hasMounted, sethasMounted] = useState(false);
    useEffect(() => sethasMounted(true), []);
    if (!hasMounted) return;
    return <>{children}</>
};

