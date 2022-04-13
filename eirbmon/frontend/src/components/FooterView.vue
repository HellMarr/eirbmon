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
    /* background: linear-gradient(90deg, #FD992D 0%, #FFBF49 40%); */
    height: 70px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 100px;
    padding: 0px 80px;
    position: relative;
    color: rgb(73, 73, 73);
    box-shadow: 0px -4px 5px 0px rgba(168, 168, 168, 0.75);
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