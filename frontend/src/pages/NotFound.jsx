import React from 'react'
import { useRouteError } from "react-router-dom";

export default function NotFound() {
    const error = useRouteError();
    
  return (
    <div>
        <div>
            <h1>Oops!</h1>
            <p>Sorry, an unexpected error has occurred.</p>
            <p>{error.statusText || error.message}</p>
        </div>
    </div>
  )
}
