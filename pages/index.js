import Head from 'next/head';
import styled from '@emotion/styled';

/** Define Style Components */
const Heading = styled .h1 `
    background-color: green;
    color: white;
    margin: 0;
    padding: .5rem 1rem;
    text-align: center;
`;

export default function Home() {
  return (
    <div className="container">
        <Head>
            <title>Inicio</title>
            <link rel="icon" href="/favicon.ico" />
        </Head>

        <main>
            <Heading>
                Inicio
            </Heading>
        </main>

    </div>
  )
}
