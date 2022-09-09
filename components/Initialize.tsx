import {
  useConnection,
  useWallet,
  useAnchorWallet,
} from "@solana/wallet-adapter-react"
import * as anchor from "@project-serum/anchor"
import { FC, useState } from "react"
import styles from "../styles/Button.module.css"
import idl from "../idl.json"

const PROGRAM_ID = `DAawMXRAqu61iU7ZAkXMsz6jjmonT3Qr9HraHvoMo7iF`

export interface Props {
  setCounter
}

export const Initialize: FC<Props> = ({ setCounter }) => {
  const [url, setUrl] = useState("")
  const { sendTransaction } = useWallet()

  const { connection } = useConnection()
  const wallet = useAnchorWallet()

  const provider = new anchor.AnchorProvider(connection, wallet, {})
  anchor.setProvider(provider)

  const programId = new anchor.web3.PublicKey(PROGRAM_ID)
  const program = new anchor.Program(idl as anchor.Idl, programId)

  const newAccount = anchor.web3.Keypair.generate()

  const onClick = async () => {
    const transaction = await program.methods
      .initialize(new anchor.BN(1))
      .accounts({
        counter: newAccount.publicKey,
        user: wallet.publicKey,
        systemAccount: anchor.web3.SystemProgram.programId,
      })
      .transaction()

    sendTransaction(transaction, connection, { signers: [newAccount] }).then(
      (sig) => {
        console.log(
          `Transaction: https://explorer.solana.com/tx/${sig}?cluster=devnet`
        )
        setUrl(`https://explorer.solana.com/tx/${sig}?cluster=devnet`)
        setCounter(newAccount.publicKey)
      }
    )
  }

  return (
    <div>
      <div className={styles.buttonContainer} onClick={onClick}>
        <button className={styles.button}>Initialize Counter</button>
      </div>
      {url && (
        <a href={url} target="_blank">
          View Transaction
        </a>
      )}
    </div>
  )
}
