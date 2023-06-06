import Hero from "components/hero"
import Minter from "components/minter"
import "./style.scss"

const Dashboard = ({
  metadatas,
  loading,
  maxSupply,
  mintLoading,
  createLoading,
  walletAddress,
  soldOutCounts,
  collectionList,
  onMintHandler,
  onCreateHandler,
  onConnectWalletHandler,
  onCollectionChangeHandler,
}) => (
  <div className="dashboard">
    <Hero
      maxSupply={maxSupply}
      soldOutCounts={soldOutCounts}
      walletAddress={walletAddress}
      collectionList={collectionList}
      onConnectWalletHandler={onConnectWalletHandler}
      onCollectionChangeHandler={onCollectionChangeHandler}
    />
    {walletAddress !== "" && walletAddress !== "No Provider" && (
      <Minter
        metadatas={metadatas}
        loading={loading}
        mintLoading={mintLoading}
        createLoading={createLoading}
        walletAddress={walletAddress}
        onMintHandler={onMintHandler}
        onCreateHandler={onCreateHandler}
      />
    )}
  </div>
)

export default Dashboard
