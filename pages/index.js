import { useState, useEffect } from 'react'
import Head from 'next/head'
import Web3 from 'web3'
import lotteryContract from '../blockchain/lottery'
import styles from '../styles/Home.module.css'
import 'bulma/css/bulma.css'

export default function Home() {
  const [web3, setWeb3] = useState()
  const [address, setAddress] = useState()
  const [lcContract, setLcContract] = useState()
  const [lotteryPot, setLotteryPot] = useState()
  const [lotteryPlayers, setPlayers] = useState([])
  const [lotteryHistory, setLotteryHistory] = useState([])
  const [lotteryId, setLotteryId] = useState()
  const [error, setError] = useState('')
  const [successMsg, setSuccessMsg] = useState('')

  useEffect(() => {
    updateState()
  }, [lcContract])

  const updateState = () => {
    if (lcContract) getPot()
    if (lcContract) getPlayers()
    if (lcContract) getLotteryId()
  }

  const getPot = async () => {
    const pot = await lcContract.methods.getBalance().call()
    setLotteryPot(web3.utils.fromWei(pot, 'ether'))
  }

  const getPlayers = async () => {
    const players = await lcContract.methods.getPlayers().call()
    setPlayers(players)
  }

  const getHistory = async (id) => {
    setLotteryHistory([])
    for (let i = parseInt(id); i > 0; i--) {
      const winnerAddress = await lcContract.methods.lotteryHistory(i).call()
      const historyObj = {}
      historyObj.id = i
      historyObj.address = winnerAddress
      setLotteryHistory(lotteryHistory => [...lotteryHistory, historyObj])
    }
  }

  const getLotteryId = async () => {
    const lotteryId = await lcContract.methods.lotteryId().call()
    setLotteryId(lotteryId)
    await getHistory(lotteryId)
  }

  const enterLotteryHandler = async () => {
    setError('')
    setSuccessMsg('')
    try {
      await lcContract.methods.enter().send({
        from: address,
        value: '15000000000000000',
        gas: 300000,
        gasPrice: null
      })
      updateState()
    } catch(err) {
      setError(err.message)
    }
  }

  const pickWinnerHandler = async () => {
    setError('')
    setSuccessMsg('')
    console.log(`address from pick winner :: ${address}`)
    try {
      await lcContract.methods.pickWinner().send({
        from: address,
        gas: 300000,
        gasPrice: null
      })
    } catch(err) {
      setError(err.message)
    }
  }

  const payWinnerHandler = async () => {
    setError('')
    setSuccessMsg('')
    try {
      await lcContract.methods.payWinner().send({
        from: address,
        gas: 300000,
        gasPrice: null
      })
      console.log(`lottery id :: ${lotteryId}`)
      const winnerAddress = await lcContract.methods.lotteryHistory(lotteryId).call()
      setSuccessMsg(`The winner is ${winnerAddress}`)
      updateState()
    } catch(err) {
      setError(err.message)
    }
  }

  const connectWalletHandler = async () => {
    setError('')
    setSuccessMsg('')
    /* check if MetaMask is installed */
    if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
      try {
        /* request wallet connection */
        await window.ethereum.request({ method: "eth_requestAccounts"})
        /* create web3 instance & set to state */
        const web3 = new Web3(window.ethereum)
        /* set web3 instance in React state */
        setWeb3(web3)
        /* get list of accounts */
        const accounts = await web3.eth.getAccounts()
        /* set account 1 to React state */
        setAddress(accounts[0])

        /* create local contract copy */
        const lc = lotteryContract(web3)
        setLcContract(lc)

        window.ethereum.on('accountsChanged', async () => {
          const accounts = await web3.eth.getAccounts()
          console.log(accounts[0])
          /* set account 1 to React state */
          setAddress(accounts[0])
        })
      } catch(err) {
        setError(err.message)
      }
    } else {
      /* MetaMask is not installed */
      console.log("Please install MetaMask")
    }
  }


  return (
    <div>
      <Head>
        <title>Lotterify</title>
        <meta name="description" content="Decentralised lottery application based on Ethereum and smart contracts" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <nav className="navbar  mb-4 has-background-grey-darker">
          <div className="container">
            <div className="navbar-brand">
              <h1 className="has-text-primary">Lotterify</h1>
            </div>
            <div className="navbar-end mt-4 ">
              <button onClick={connectWalletHandler} className="button is-link has-background-primary">Connect Wallet</button>
            </div>
          </div>
        </nav>
        <div className="container">
          <section className="mt-5">
        <h3 className="has-text-white subtitle has-text-weight-bold">Step: 1 - Connect your metamask wallet.</h3>
        <h3 className="has-text-white subtitle has-text-weight-bold">Step: 2 - On connecting wallet you can see past winners, pot amount and list of participants.</h3>
        <h3 className="has-text-white subtitle has-text-weight-bold">Step: 3 - On clicking play now, 0.01 Eth + gas fee will be deducted from your wallet.</h3>
        <h3 className="has-text-white subtitle has-text-weight-bold">Step: 4 - Winner is picked by only admin.</h3>
        <h3 className="has-text-white subtitle has-text-weight-bold">Step: 5 - Lucky Winner will get the total pot amount to their connected account 🎉.</h3>
            <div className="columns">
              <div className="column is-two-thirds">
                <section className="mt-5">
                  <p className="has-text-primary">Enter the lottery by sending <b>0.01 Ether</b></p>
                  <button onClick={enterLotteryHandler} className="button is-link is-large is-light mt-3">Play now</button>
                </section>
                <section className="mt-6">
                  <p className="has-text-primary"><b>Admin only:</b> Pick winner</p>
                  <button onClick={pickWinnerHandler} className="button is-primary is-large is-light mt-3">Pick Winner</button>
                </section>
                <section className="mt-6">
                  <p className="has-text-primary"><b>Admin only:</b> Pay winner</p>
                  <button onClick={payWinnerHandler} className="button is-success is-large is-light mt-3">Pay Winner</button>
                </section>
                <section>
                  <div className="container has-text-danger mt-6">
                    <p>{error}</p>
                  </div>
                </section>
                <section>
                  <div className="container has-text-success mt-6">
                    <p>{successMsg}</p>
                  </div>
                </section>
              </div>
              <div className="column is-one-thirds">
                <section className="mt-5">
                  <div className="mt-5">
                    <div className="card">
                      <div className="card-content">
                        <div className="content">
                          <h2>Lottery History</h2>
                        {
                          (lotteryHistory && lotteryHistory.length > 0) && lotteryHistory.map(item => {
                            if (lotteryId != item.id) {
                              return <div className="history-entry mt-3" key={item.id}>
                                <div>Lottery #{item.id} winner:</div>
                                <div>
                                  <a href={`https://etherscan.io/address/${item.address}`} target="_blank">
                                    {item.address}
                                  </a>
                                </div>
                              </div>
                            }
                          })
                        }
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
                <section className="mt-5">
                  <div className="card">
                    <div className="card-content">
                      <div className="content">
                        <h2>Players ({lotteryPlayers.length})</h2>
                        <ul className="ml-0">
                          {
                            (lotteryPlayers && lotteryPlayers.length > 0) && lotteryPlayers.map((player, index) => {
                              return <li key={`${player}-${index}`}>
                                <a href={`https://etherscan.io/address/${player}`} target="_blank">
                                  {player}
                                </a>
                              </li>
                            })
                          }
                        </ul>
                      </div>
                    </div>
                  </div>
                </section>
                <section className="mt-5">
                  <div className="card">
                    <div className="card-content">
                      <div className="content">
                        <h2>Pot</h2>
                        <h2>{lotteryPot}♦ Ether</h2>
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
        <p className="has-text-primary">&copy; 2022 Karan Chauhan. Made with Solidity, Next.js and Chainlink</p>
      </footer>
    </div>
  )
}