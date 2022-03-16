<template>
    <div class="container" :style="style">
        <img class="image" src="../assets/Salameche.png">
        <div class="description">
            <div class="upper-div">
                <div class="name">{{name}}</div> 
            </div>
            <div class="types">
                <div class="type" v-for="type in types" :key="type" :class="type">
                {{type}}
                </div>
            </div>
            <div class="stats">
                <div class="id">{{id}}</div>
                <div class="price">{{price}} ETH</div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: "HomePage",
}
</script>

<style scoped>

</style>