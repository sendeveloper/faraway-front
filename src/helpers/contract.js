import { ethers } from "ethers"
import { BigNumber } from "@ethersproject/bignumber"
import contractABI from "abis/NFTCollection.json"
import factoryABI from "abis/NFTFactory.json"
import { ENVS } from "configurations/index"

export const getContractWithSigner = (address) => {
  const infuraProvider = new ethers.providers.Web3Provider(window.ethereum)
  const signer = infuraProvider.getSigner()

  let abi =
    address === ENVS.FACTORY_CONTRACT_ADDRESS ? factoryABI.abi : contractABI.abi
  const contract = new ethers.Contract(address, abi, signer)

  return contract
}

const getContractWithoutSigner = (address) => {
  const infuraProvider = new ethers.providers.Web3Provider(window.ethereum)

  const contract = new ethers.Contract(address, contractABI.abi, infuraProvider)

  return contract
}

export const getTokenIdsOfWallet = async (collection, walletAddress) => {
  const contract = getContractWithoutSigner(collection)
  let tokenIds = []

  try {
    let ids = await contract.getTokenIdsOfWallet(walletAddress)
    for (let i = 0; i < ids.length; i++) {
      tokenIds.push(BigNumber.from(ids[i]).toNumber())
    }

    return tokenIds
  } catch (err) {
    return []
  }
}

export const getTokenURI = async (collection, tokenId) => {
  const contract = getContractWithoutSigner(collection)
  try {
    let tokenURI = await contract.tokenURI(tokenId)
    return tokenURI
  } catch (err) {
    return ""
  }
}

export const getCurrentTotalSupply = async (collection) => {
  const contract = getContractWithoutSigner(collection)

  try {
    let totalSupply = await contract.totalSupply()

    return BigNumber.from(totalSupply).toNumber()
  } catch (err) {
    return 0
  }
}
