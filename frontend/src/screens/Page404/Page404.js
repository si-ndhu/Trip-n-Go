// Author: Rahul Saliya

import React from 'react';
import "./Page404.css";
import { PiSmileySadFill } from 'react-icons/pi';

export default function P404() {
    return (
        <div className='container-404'>
            <PiSmileySadFill />
            <p>404</p>
            <p>Page not found</p>
        </div>
    )
}
