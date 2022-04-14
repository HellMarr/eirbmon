import logo from './logo.svg';
import './App.css';
import Unity, { UnityContext } from "react-unity-webgl";

const unityContext = new UnityContext({
  loaderUrl: "./EirbmonWebGl/Build/EirbmonWebGl.loader.js",
  dataUrl: "./EirbmonWebGl/Build/EirbmonWebGl.data",
  frameworkUrl: "./EirbmonWebGl/Build/EirbmonWebGl.framework.js",
  codeUrl: "./EirbmonWebGl/Build/EirbmonWebGl.wasm",
});

function App() {
  return (
    <div className="App">
      <h1 style={{fontSize:35}}>Eirbmon</h1>
      <Unity 
        unityContext={unityContext} 
        style={{
          width: "80%",
          height: "90%",
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
  );
}

export default App;
