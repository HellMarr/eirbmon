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
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 100px;
    padding: 0 5%;
    position: relative;
    color: rgb(73, 73, 73);
    box-shadow: 0px -4px 5px 0px rgba(168, 168, 168, 0.75);
  }

  #logo{
    font-family: 'Cubic';
    font-size: 30px;
    font-weight: 700;
  }

  #credits{
    border-bottom: solid 1px;
  }


  @font-face {
    font-family: "Cubic";
    src: url("../assets/cubic.ttf");
  }


  @media (max-width: 800px) {
    footer{
      flex-direction: column;
      justify-content: center;
      gap:8px;
    }
  }
</style>