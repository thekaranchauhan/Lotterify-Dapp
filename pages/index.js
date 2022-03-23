import Head from 'next/head'
import styles from '../styles/Home.module.css'
import 'bulma/css/bulma.css'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Lottery Dapp</title>
        <meta name="description" content="Lottery dApp based on Ethereum and Solidity" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
      </main>

      <footer className={styles.footer}>
      <p>&copy; Copyright; Karan Chauhan 2022.</p>
      </footer>
    </div>
  )
}
