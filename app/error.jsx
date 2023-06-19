'use client'
import { useEffect } from "react"
import { EmptyState } from "./components/EmptyState";
const ErrorState = ({ error }) => {
    useEffect(() => {
      console.error(error);
    
        }, [error])
    
  return (
    <EmptyState title="Ohh..." subtitle="Something went wrong" />
  )
}

export default ErrorState
