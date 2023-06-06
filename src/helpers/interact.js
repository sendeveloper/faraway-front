import { ethers } from "ethers"
import { BigNumber } from "@ethersproject/bignumber"
import { getContractWithSigner } from "./contract"
import { ENVS } from "configurations"

export const createCollection = async (
  name,
  symbol,
  baseURI,
  setCreateLoading,
  fetchCollections
) => {
  const contract = getContractWithSigner(ENVS.FACTORY_CONTRACT_ADDRESS)

  try {
    let txhash = await contract.createCollection(name, symbol, baseURI)

    let res = await txhash.wait()
    setCreateLoading(false)

    if (res.transactionHash) {
      setTimeout(() => fetchCollections(), 5000)
      return {
        success: true,
        status: `Successfully created a NFT collection`,
      }
    } else {
      return {
        success: false,
        status: "Transaction failed",
      }
    }
  } catch (err) {
    console.log(err)
    setCreateLoading(false)
    return {
      success: false,
      status: err.message,
    }
  }
}

export const mintNFT = async (
  collection,
  walletAddress,
  setMintLoading,
  setNewMint
) => {
  const contract = getContractWithSigner(collection)

  contract.on(
    "TokenMinted(address, address, uint256, string)",
    (collection, recipient, tokenId, tokenURI) => {
      const address = ethers.utils.getAddress(recipient)
      const newMintId = BigNumber.from(tokenId).toNumber()

      setNewMint([address, newMintId])
    }
  )

  try {
    let txhash = await contract.mint(walletAddress, {
      value: BigNumber.from(1e9).mul(BigNumber.from(1e9).mul(5).div(100)),
    })

    let res = await txhash.wait()
    setMintLoading(false)

    if (res.transactionHash) {
      return {
        success: true,
        status: `Successfully minted a NFT`,
      }
    } else {
      return {
        success: false,
        status: "Transaction failed",
      }
    }
  } catch (err) {
    console.log(err)
    setMintLoading(false)
    return {
      success: false,
      status: err.message,
    }
  }
}
