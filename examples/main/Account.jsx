import React from 'react';
import { Link } from '../../src/index.js';


export default function Account({url, matches, name}) {
    return (
        <section className="account">
            <h2>Welcome to my Account</h2>
            <p>my ID is : {matches.id}</p>
            <p>my name is : {name}</p>
            <pre>current link: {url}</pre>
            <Link href="/">go homepage</Link>
        </section>
    );
}
