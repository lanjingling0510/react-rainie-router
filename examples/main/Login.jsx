import React from 'react';
import { Link } from '../../src/index.js';


export default function Login({url}) {
    return (
        <section className="login">
            <h2>Welcome to my login</h2>
            <p>current link: {url}</p>
            <Link href="/">go homepage</Link>
        </section>
    );
}
