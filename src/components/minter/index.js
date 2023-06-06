import Button from "components/button"
import Loading from "components/loading"
import "./style.scss"

const generateNFTDatas = (metadatas) => {
  return metadatas.map((data, index) => {
    return (
      <div key={index} className="minter-gallery-show-item flex flex-column">
        <img src={data.image || ""} alt="nft" loading="lazy" />
        <div className="minter-gallery-show-item-info flex felx-column">
          <p className="name">{data.name}</p>
        </div>
      </div>
    )
  })
}

const Minter = ({
  metadatas,
  loading,
  mintLoading,
  createLoading,
  walletAddress,
  onMintHandler,
  onCreateHandler,
}) => {
  return (
    <div className="minter">
      {walletAddress !== "" && (
        <div className="minter-wrapper flex">
          <Button
            children="Create NFT Collection"
            loading={createLoading}
            onClick={() => {
              if (!createLoading) {
                return onCreateHandler()
              }
            }}
          />
          <Button
            children="Mint NFT For 0.05 AGOR"
            loading={mintLoading}
            onClick={() => {
              if (!mintLoading) {
                return onMintHandler()
              }
            }}
          />
        </div>
      )}
      {metadatas.length !== 0 ? (
        <div className="minter-gallery flex flex-column">
          <span>Your Gallery</span>
          <div className="minter-gallery-show flex">
            {generateNFTDatas(metadatas)}
          </div>
        </div>
      ) : (
        loading && <Loading />
      )}
    </div>
  )
}

export default Minter
