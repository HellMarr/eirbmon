<template>
  <footer>
    <div id="logo">
      Eirbmon
    </div>
    <div id="powered">
      Powered by Ethereum
    </div>
    <div id="credits">
      Made with 💛 by the Eirbmon team
    </div>
  </footer>
</template>

<script>
export default {
  name: "FooterView",
};
</script>

<style scoped>
  footer{
    height: 100px;
    background-color: rgb(174, 185, 194);
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 50px;
    padding: 0px 80px;
    position: relative;
    color: rgb(73, 73, 73);
  }

  #logo{
    font-family: 'Cubic';
    font-size: 30px;
    font-weight: 700;
  }

  #powered{
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    color: rgb(73, 73, 73);
  }

  #credits{
    color: rgb(73, 73, 73);
    border-bottom: solid 1px;
    padding: 3px 5px;
  }


  @font-face {
    font-family: "Cubic";
    src: url("../assets/cubic.ttf");
  }
</style>