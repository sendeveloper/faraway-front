import Ticker from "./ticker"
import "./style.scss"

const Hero = ({
  maxSupply,
  soldOutCounts,
  walletAddress,
  collectionList,
  onConnectWalletHandler,
  onCollectionChangeHandler,
}) => {
  return (
    <div className="hero flex flex-column">
      <h1>
        <span className="highlight">Albert's test project</span>
      </h1>
      <div className="hero-wallet flex flex-column">
        <Ticker
          maxSupply={maxSupply}
          soldOutCounts={soldOutCounts}
          walletAddress={walletAddress}
          collectionList={collectionList}
          onConnectWalletHandler={onConnectWalletHandler}
          onCollectionChangeHandler={onCollectionChangeHandler}
        />
      </div>
    </div>
  )
}

export default Hero
