import { useState, useEffect } from "react"
import axios from "axios"
import { mintNFT, createCollection } from "helpers/interact"
import {
  getTokenIdsOfWallet,
  getCurrentTotalSupply,
  getTokenURI,
} from "helpers/contract"
import { connectWallet, getCurrentWalletConnected } from "helpers/wallet"
import DashboardComponent from "components/dashboard"

const Dashboard = () => {
  const [walletAddress, setWalletAddress] = useState("")
  const [collection, setCollection] = useState("")
  const [collectionList, setCollectionList] = useState([])
  const [soldOutCounts, setSoldOutCounts] = useState(0)
  const [newMint, setNewMint] = useState([])
  const [mintLoading, setMintLoading] = useState(false)
  const [createLoading, setCreateLoading] = useState(false)
  const [loading, setLoading] = useState(false)
  const [metadatas, setMetadatas] = useState([])

  useEffect(() => {
    const initDatas = async () => {
      if (window.ethereum) {
        const { address } = await getCurrentWalletConnected()

        setWalletAddress(address)

        onChangeWalletListener()
        onConnectWalletHandler()
      } else {
        setWalletAddress("No Provider")
      }
    }
    initDatas()
    fetchCollections()
  }, [])

  useEffect(() => {
    const getIdsFromWallet = async () => {
      if (!!walletAddress) {
        let totalSupply = await getCurrentTotalSupply(collection)
        setSoldOutCounts(totalSupply)

        let tokenIdsOfWallet = await getTokenIdsOfWallet(
          collection,
          walletAddress
        )
        fetchMetaDatas(tokenIdsOfWallet)
      }
    }
    getIdsFromWallet()
  }, [collection, walletAddress, newMint])

  const onConnectWalletHandler = async () => {
    const walletResponse = await connectWallet()
    setWalletAddress(walletResponse.address)
  }

  const onChangeWalletListener = () => {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts) => {
        if (accounts.length) {
          setWalletAddress(accounts[0])
        } else {
          setWalletAddress("")
        }
      })

      window.ethereum.on("chainChanged", () => {
        onConnectWalletHandler()
      })
    }
  }

  const fetchMetaDatas = async (ids) => {
    setLoading(true)

    let metadatas = []

    for (let i = 0; i < ids.length; i++) {
      let tokenURI = await getTokenURI(collection, ids[i])
      await axios
        .get(tokenURI)
        .then((response) => {
          metadatas.push(response.data)
        })
        .catch((err) => {
          console.log(err)
        })
    }

    setMetadatas(metadatas)
    setLoading(false)
  }

  const fetchCollections = async () => {
    axios.get("http://localhost:8000/api/getCollections").then((res) => {
      let data = res.data.NFTCollections

      let collections = data.map((collection) => collection.addr)
      setCollectionList(collections)
      setCollection(collections[0] || "")
      console.log(collections)
    })
  }

  const onMintHandler = async () => {
    if (!!walletAddress) {
      setMintLoading(true)
      await mintNFT(collection, walletAddress, setMintLoading, setNewMint)
    }
  }

  const onCreateHandler = async () => {
    if (!!walletAddress) {
      setCreateLoading(true)

      let name = window.prompt("New NFT Collection Name")
      let symbol = window.prompt("New NFT Collection Symbol")
      let baseURI = window.prompt("New NFT Collection Base URI")

      await createCollection(
        name,
        symbol,
        baseURI,
        setCreateLoading,
        fetchCollections
      )
    }
  }

  const onCollectionChangeHandler = (e) => {
    setCollection(e.target.value)
  }

  return (
    <DashboardComponent
      metadatas={metadatas}
      loading={loading}
      maxSupply={20}
      mintLoading={mintLoading}
      createLoading={createLoading}
      walletAddress={walletAddress}
      soldOutCounts={soldOutCounts}
      collectionList={collectionList}
      onMintHandler={onMintHandler}
      onCreateHandler={onCreateHandler}
      onConnectWalletHandler={onConnectWalletHandler}
      onCollectionChangeHandler={onCollectionChangeHandler}
    />
  )
}

export default Dashboard
