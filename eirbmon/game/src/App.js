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
      <h1>Eirbmon</h1>
      <Unity 
        unityContext={unityContext} 
        style={{
          width: "900px",
          height: "680px",
          border: "2px solid black",
          background: "green",
        }}
      />
      <div>
        <form action="http://localhost:8080">
          <button type="submit">Revenir vers Eirbmon</button>
        </form>
      </div>
    </div>
  );
}

export default App;
