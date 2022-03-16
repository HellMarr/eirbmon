<template>
  <div class="bg-secondary">
    <HeaderView />
    <router-view></router-view>
    <FooterView />
  </div>
</template>

<script>
import HeaderView from "./components/HeaderView.vue";
import FooterView from "./components/FooterView.vue";

export default {
  name: "App",
  components: {
    HeaderView,
    FooterView,
  },
};
</script>