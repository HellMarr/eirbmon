import logo from './logo.svg';
import React, { Component } from "react";
import './App.css';
import Unity, { UnityContext } from "react-unity-webgl";


const unityContext = new UnityContext({
  loaderUrl: "./EirbmonWebGl/Build/EirbmonWebGl.loader.js",
  dataUrl: "./EirbmonWebGl/Build/EirbmonWebGl.data",
  frameworkUrl: "./EirbmonWebGl/Build/EirbmonWebGl.framework.js",
  codeUrl: "./EirbmonWebGl/Build/EirbmonWebGl.wasm",
});

//communication web=>unity


//liste pokemon, level, HP
function playerSetPositionX(pos) {
  unityContext.send("GameController", "playerSetPositionX", pos);
}

//liste pokemon, level, HP
function playerSetPositionY(pos) {
  unityContext.send("GameController", "playerSetPositionY", pos);
}

function playerInitializePosition() {
  unityContext.send("GameController", "playerInitializePosition");
}

function initPosition(){
  playerInitializePosition();
  playerSetPositionX(10);
  playerSetPositionY(10);
}

function updateLevel(levels) {
  //let text=IntToString(levels);
  unityContext.send("GameController", "UpdateLevel", levels);
}

//let levels = [2,3,5,7];
let levels = "2,3,4,5";

let HP='0.8,0.5,1,0.2';

function IntToString(listInt){
  let text='';
  for (let i=0;i<listInt.length;i++){
    text.concat(text,listInt[i].toString()) ;
  }
  return text;
}




function App() {


  return (
    <div className="App">
      <h1 style={{ fontSize: 35 }}>Eirbmon</h1>
      <button onClick={() => initPosition()}>Set position Player!</button>
      <button onClick={() => updateLevel(levels)}>Set level!</button>
      <Unity
        unityContext={unityContext}
        style={{
          width: "1000px",
          height: "750px",
          border: "2px solid black",
          background: "white",
        }}
      />
      
      <div>
        <form action="http://localhost:8080">
          <button type="submit" style={{ padding: '10px 20px 10px 20px', fontSize: '32px', background: 'linear-gradient(90deg, #FD992D 0%, #FFBF49 100%)', borderRadius: '1em', fontWeight: 'bold' }}>Revenir vers Eirbmon</button>
        </form>
      </div>
    </div>

  );

}

/*return (
  <div className="App">
    <h1 style={{fontSize:35}}>Eirbmon</h1>
    <button onClick={() => spawnEnemies(100)}>Spawn!</button>
    <Unity 
      unityContext={unityContext} 
      style={{
        width: "1000px",
        height: "750px",
        border: "2px solid black",
        background: "white",
      }}
    />
    <div>
      <form action="http://localhost:8080">
        <button type="submit" style={{padding:'10px 20px 10px 20px',fontSize:'32px',background:'linear-gradient(90deg, #FD992D 0%, #FFBF49 100%)',borderRadius:'1em', fontWeight:'bold'}}>Revenir vers Eirbmon</button>
      </form>
    </div>
  </div>
);*/

export default App;
