<template>
  <head>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Fredoka:wght@500&family=Lato:wght@700&display=swap" rel="stylesheet">
  </head>
  <body>
    <div class="app">
      <Navbar/>
      <router-view class="router"/>
    </div>
  </body>
</template>

<script>
import Navbar from './components/Navbar.vue'
import detectEthereumProvider from '@metamask/detect-provider'
import Web3 from "web3/dist/web3.min.js";

const logIn = async () => {
  const provider = await detectEthereumProvider();
  if (provider) {
    console.log("metamask is installed")
    console.log(await provider.request({method: 'eth_requestAccounts'}));
    const web3 = new Web3(provider);
    console.log(await web3.eth.personal.getAccounts())
    

  } else {
    console.log("please install metamask")
  }
}
logIn()



export default {
  name: 'App',
  components: {
    Navbar,
  }
}
</script>

<style>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  font-family: "Raleway", sans-serif;
  font-weight: 400;
}
.app {
  min-height: 100vh;
  position: relative;
}
.container {
  padding: 0 20px;
  max-width: 1140px;
  margin: 0 auto;
}

.router{
  position: relative;
  top:100px
}
</style>