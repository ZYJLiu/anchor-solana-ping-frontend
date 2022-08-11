import { NextPage } from "next"
import styles from "../styles/Home.module.css"
import { AppBar } from "../components/AppBar"
import { useWallet } from "@solana/wallet-adapter-react"
import { Initialize } from "../components/Initialize"
import { Increment } from "../components/Increment"
import { Decrement } from "../components/Decrement"
import { useState } from "react"
import Head from "next/head"

const Home: NextPage = (props) => {
  const [counter, setCounter] = useState("")
  const wallet = useWallet()

  return (
    <div className={styles.App}>
      <Head>
        <title>Anchor Frontend Example</title>
      </Head>
      <AppBar />
      <div className={styles.AppBody}>
        {wallet.connected ? (
          <Initialize setCounter={setCounter} />
        ) : (
          <>Connect Wallet</>
        )}
        {counter && (
          <div>
            <Increment counter={counter} />
            <Decrement counter={counter} />
          </div>
        )}
      </div>
    </div>
  )
}

export default Home
