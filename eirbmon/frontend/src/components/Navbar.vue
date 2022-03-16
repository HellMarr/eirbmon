<template>
    <head>
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Fredoka:wght@500&family=Lato:wght@700&display=swap" rel="stylesheet">
    </head>
    <body style="margin:0;">
        <header>
            <p class="main-title">
                EirbMon.
            </p>
            <div class="right-buttons">
                <router-link to="/play">Play</router-link>
                <router-link to="/marketplace">Marketplace</router-link>
                <router-link to="/signup">Sign Up</router-link>
                <router-link to="/signin">Sign In</router-link>
            </div>
        </header>
    </body>
</template>

<script>
export default {
  name: 'NavBar',
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.main-title{
    color: #faf9f6;
    margin: 10px 20px;
    font-size: 40px;
    padding-bottom: 5px;
    font-family: 'Fredoka';
}

.main-title:hover{
    cursor:default;
}

header{
    margin: 0;
    position: sticky;
    top: 0;
    height: 100px;
    background: rgb(253,153,45);
    background: linear-gradient(90deg, rgba(253,153,45,1) 0%, #FFBF49 40%);
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
}

header>img{
    position: absolute;
    right: 0px;
    top: 100px;
    z-index: 10;
}

.right-buttons{
    margin-right: 20px;
    gap: 20px;
    padding-bottom: 5px;
    font-size: 25px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
}

.right-buttons>a{
    padding: 7px 15px;
    text-decoration: none;
    color: white;
    text-transform: capitalize;
    font-family: 'Fredoka', sans-serif;
}

.right-buttons>a:hover{
    color:#2B2A49;
    transition: 0.2s ease-in-out;
}

#wave{
    width: 550px;
}
</style>