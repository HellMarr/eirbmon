import './App.css';
import Unity, { UnityContext } from "react-unity-webgl";
import detectEthereumProvider from '@metamask/detect-provider';
import React, { useState } from 'react';
import Web3 from "web3/dist/web3.min.js";
const getBalance = require("./blockchain").getBalance;

const contract = require("./mintNft.json");
const contractAddress = "0x70DCf436b3F8B9b0B7507727b63fe0deaf257aFC";

const unityContext = new UnityContext({
  loaderUrl: "./EirbmonWebGl/Build/EirbmonWebGl.loader.js",
  dataUrl: "./EirbmonWebGl/Build/EirbmonWebGl.data",
  frameworkUrl: "./EirbmonWebGl/Build/EirbmonWebGl.framework.js",
  codeUrl: "./EirbmonWebGl/Build/EirbmonWebGl.wasm",
});

const getAddr = async (provider) => {
  const addr = await provider.request({ method: 'eth_requestAccounts' });
  return addr[0];
}

let rendered = false

function initialisationData(wallet) {
  if(rendered === false){
    unityContext.send("GameController", "initialisationData", wallet);
    rendered = true;
  }
}


function render(authorized, wallet, setRendered) {
  if (authorized === "authorized") {
    setTimeout(() => {initialisationData(wallet)}, 5000);
    return (
      <div>
        <Unity
          unityContext={unityContext}
          style={{
            width: "1000px",
            height: "750px",
            border: "2px solid black",
            background: "white",
          }}
        />
      </div>
    )
  } else if (authorized === "not authorized") {
    return <div>
      <h1>You must first buy an NFT before accessing the game</h1>
      <span style={{ marginBottom: "20px" }}><a id="marketplace" href="http://localhost:8080/?#/marketplace"></a></span>
    </div>
  } else if (authorized === "loading") {
    return <h1>Loading ...</h1>
  } else {
    return <div>
      <h1>Please install metamask before accessing the game</h1>
      <span style={{ marginBottom: "20px" }}><a id="metamask" href="https://metamask.io/download/"></a></span>
    </div>
  }
}

function App() {
  const [authorized, setAuthorized] = React.useState("loading");
  const [wallet, setWallet] = useState(null);

  React.useEffect(async () => {
    const prov = await detectEthereumProvider();
    if (!prov) {
      setAuthorized("not metamask");
      return;
    }
    const addr = await getAddr(prov);
    setWallet(addr);
    const web3 = new Web3(prov);
    const mintContract = new web3.eth.Contract(contract.abi, contractAddress);
    const balance = await getBalance(mintContract, addr);

    window.ethereum.on('accountsChanged', () => {
      window.location.reload();
    });

    if (balance > 0) {
      setAuthorized("authorized");
    } else {
      setAuthorized("not authorized");
    }
  }, []);



  return (
    <div className="App">
      <h1 style={{ fontSize: 35 }}>Eirbmon Game</h1>
      {render(authorized, wallet)}
      <span><a id="website" href="http://localhost:8080"></a></span>
    </div>
  );
}

export default App;

