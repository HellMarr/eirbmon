import './App.css';
import Unity, { UnityContext } from "react-unity-webgl";
import detectEthereumProvider from '@metamask/detect-provider';
import React from 'react';
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
  const addr = await provider.request({method: 'eth_requestAccounts'});
  return addr[0];
}

function render(authorized){
  if(authorized==="authorized"){
    return <Unity 
      unityContext={unityContext} 
      style={{
        width: "1000px",
        height: "750px",
        border: "2px solid black",
        background: "white",
      }}
    />
  }else if(authorized==="not authorized"){
    return <div>
            <h1>You must first buy an NFT before accessing the game</h1>
            <form action="http://localhost:8080/?#/marketplace">
              <button type="submit" style={{marginBottom:'40px',padding:'10px 20px 10px 20px',fontSize:'32px',background:'linear-gradient(-90deg, #FD992D 0%, #FFBF49 100%)',borderRadius:'1em', fontWeight:'bold'}}>Accéder à la marketplace</button>
            </form>
          </div>
  }else if(authorized==="loading"){
    return <h1>Loading ...</h1>
  }else{
    return <h1>Please install metamask before accessing the game</h1>
  }
}

function App() {
  const [authorized, setAuthorized] = React.useState("loading");

  React.useEffect(async ()=>{
    const prov = await detectEthereumProvider();
    if(!prov){
      setAuthorized("not metamask");
      return;
    }
    const addr = await getAddr(prov);
    const web3 = new Web3(prov);
    const mintContract = new web3.eth.Contract(contract.abi, contractAddress);
    const balance = await getBalance(mintContract, addr);
    if(balance>0){
      setAuthorized("authorized");
    }else{
      setAuthorized("not authorized");
    }
  },[]);

  return (
    <div className="App">
      <h1 style={{fontSize:35}}>Eirbmon</h1>
      {render(authorized)}
      <div>
        <form action="http://localhost:8080">
          <button type="submit" style={{padding:'10px 20px 10px 20px',fontSize:'32px',background:'linear-gradient(90deg, #FD992D 0%, #FFBF49 100%)',borderRadius:'1em', fontWeight:'bold'}}>Revenir vers Eirbmon</button>
        </form>
      </div>
    </div>
  );
}

export default App;
