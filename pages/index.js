import Head from 'next/head'
import styles from '../styles/Home.module.css'
import 'bulma/css/bulma.css'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Lotterify - Lottery Dapp based on Ethereum and Solidity</title>
        <meta name="description" content="Lottery dApp based on Ethereum and Solidity" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="main">
        <nav className="navbar mt-5">
          <div className="container">
            <div className="navbar-brand">
              <h1>LOTTERIFY</h1>
            </div>
            <div className="navbar-end">
              <button className="button is-link">
                Connect a Wallet
              </button>
            </div>
          </div>
        </nav>
        <div className="container">
          <section className="mt-5">
            <div className="columns">
              <div className="column is-two-thirds">
                <section className="mt-5">
                  <p>Participate in the lottery for fee 0.5 Ether</p>
                  <button className="button is-link is-large is-light mt-3">Play Now</button>
                </section>
                <section className="mt-6">
                  <p><b>Admin only : </b> Pick Winner </p>
                  <button className="button is-primary is-large is-light mt-3">Pick Winner</button>
                </section>
              </div>
              <div className="column is-one-thirds">
                <section className="mt-5">
                  <div className="mt-5">
                    <div className="card">
                      <div className="card-content">
                        <div className="content">
                          <h2>Lottery History</h2>
                          <div className="history-entry">
                            <div>Lottery #1 winner:</div>
                            <a href="https://etherscan.io/address/0xb65C27Fe6Ee50B9C215356F18e6c674a278dCc23" target="_blank" rel="noreferrer">0xb65C27Fe6Ee50B9C215356F18e6c674a278dCc23</a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
                <section className="mt-5">
                  <div className="mt-5">
                    <div className="card">
                      <div className="card-content">
                        <div className="content">
                          <h2>Players (1)</h2>
                          <div>
                            <a href="https://etherscan.io/address/0xb65C27Fe6Ee50B9C215356F18e6c674a278dCc23" target="_blank" rel="noreferrer">0xb65C27Fe6Ee50B9C215356F18e6c674a278dCc23</a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
                <section className="mt-5">
                  <div className="mt-5">
                    <div className="card">
                      <div className="card-content">
                        <div className="content">
                          <h2>Pot</h2>
                          <h2>1O Ether</h2>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </section>
        </div>
      </main>

      <footer className={styles.footer}>
        <p>&copy; Copyright; Karan Chauhan 2022.</p>
      </footer>
    </div>
  )
}
