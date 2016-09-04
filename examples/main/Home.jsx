import React from 'react';
import { Link } from '../../src/index.js';


export default function Home({url, title}) {
    return (
        <section className="home">
            <h2>Welcome to my {title}</h2>
            <p>current link: {url}</p>
            <Link href="/account/123">go account</Link>
        </section>
    );
}
