import { useState } from "react"
import Button from "components/button"

const abbreviateAddress = (address) => {
  const walletAddress = address
  return walletAddress.slice(0, 6) + " ... " + walletAddress.slice(38)
}

const Ticker = ({
  maxSupply,
  soldOutCounts,
  walletAddress,
  collectionList,
  onConnectWalletHandler,
  onCollectionChangeHandler,
}) => {
  return (
    <div className="hero-wallet-purchase flex">
      {walletAddress === "No Provider" ? (
        <Button to={"https://metamask.io/"} children="Install Metamask" />
      ) : (
        <>
          <select onChange={onCollectionChangeHandler}>
            {collectionList.map((collectionAddr, idx) => (
              <option key={idx}>{collectionAddr}</option>
            ))}
          </select>

          <div className="hero-wallet-purchase-ticker flex">
            <span>Total Minted: </span>
            <span className="hero-wallet-purchase-ticker-counts">{`${soldOutCounts} / ${maxSupply}`}</span>
          </div>
          <Button
            children={
              walletAddress !== ""
                ? abbreviateAddress(walletAddress)
                : "Connect Metamask"
            }
            onClick={
              soldOutCounts !== maxSupply && walletAddress === ""
                ? onConnectWalletHandler
                : () => {}
            }
          />
        </>
      )}
    </div>
  )
}

export default Ticker
