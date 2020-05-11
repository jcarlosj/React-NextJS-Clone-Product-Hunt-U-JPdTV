import Head from 'next/head'

export default function Home() {
  return (
    <div className="container">
        <Head>
            <title>Inicio</title>
            <link rel="icon" href="/favicon.ico" />
        </Head>

        <main>
            <h1 className="title">
                Inicio
            </h1>
        </main>

        {/* Hojas de estilo por componente usando JSX */}
        <style jsx>{`
            .title {
                background-color: orange;
                color: white;
                margin: 0;
                padding: .5rem 1rem;
                text-align: center
            }
        `}</style>
    </div>
  )
}
