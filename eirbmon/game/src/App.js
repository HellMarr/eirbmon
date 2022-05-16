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

function render(authorized,addr) {
  if (authorized === "authorized") {
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
        {unityContext.send("PlayerController", "setWallet", addr)} 
      </div>

    )

  } else if (authorized === "not authorized") {
    return <div>
      <h1>You must first buy an NFT before accessing the game</h1>
      <form action="http://localhost:8080/?#/marketplace">
        <button type="submit" style={{ marginBottom: '40px', padding: '10px 20px 10px 20px', fontSize: '32px', background: 'linear-gradient(-90deg, #FD992D 0%, #FFBF49 100%)', borderRadius: '1em', fontWeight: 'bold' }}>Go to marketplace</button>
      </form>
    </div>
  } else if (authorized === "loading") {
    return <h1>Loading ...</h1>
  } else {
    return <div>
      <h1>Please install metamask before accessing the game</h1>
      <form action="https://metamask.io/download/">
        <button type="submit" style={{ marginBottom: '40px', padding: '10px 20px 10px 20px', fontSize: '32px', background: 'linear-gradient(-90deg, #FD992D 0%, #FFBF49 100%)', borderRadius: '1em', fontWeight: 'bold' }}>
          Download Metamask
          <img src="./metamask.png" style={{ width: "30px", marginLeft: "15px" }}></img>
        </button>
      </form>
    </div>
  }
}

function App() {
  const [authorized, setAuthorized] = React.useState("loading");
  const [addr, setAddr] = useState(null);

  React.useEffect(async () => {
    const prov = await detectEthereumProvider();
    if (!prov) {
      setAuthorized("not metamask");
      return;
    }
    const addr = await getAddr(prov);
    setAddr(addr);
    const web3 = new Web3(prov);
    const mintContract = new web3.eth.Contract(contract.abi, contractAddress);
    const balance = await getBalance(mintContract, addr);
    if (balance > 0) {
      setAuthorized("authorized");
    } else {
      setAuthorized("not authorized");
    }
  }, []);

  

  return (
    <div className="App">
      <h1 style={{ fontSize: 35 }}>Eirbmon</h1>
      {render(authorized,addr)}
      <div>
        <form action="http://localhost:8080">
          <button type="submit" style={{ padding: '10px 20px 10px 20px', fontSize: '32px', background: 'linear-gradient(90deg, #FD992D 0%, #FFBF49 100%)', borderRadius: '1em', fontWeight: 'bold' }}>Come back to the website</button>
        </form>
      </div>
    </div>
  );
}

export default App;

