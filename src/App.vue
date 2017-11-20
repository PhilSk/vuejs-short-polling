<template>
  <div id="app">
    <img src="./assets/logo.png">
    <h1>{{ msg }}</h1>
    <button @click="get">Get</button>
    <button @click="increment">Increment: {{ counter }}</button>
    <button v-if="isShortpolling" @click="stopShortpolling">Stop short-polling</button>
    <button v-else @click="startShortpolling">Start short-polling</button>
  </div>
</template>

<script>
import { increment, get } from "./api";
import { startShortpolling, stopShortpolling } from "./short_poll.js";
import { EventBus } from "./event-bus.js";

export default {
  name: "app",
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
      counter: 0,
      isShortpolling: 1
    };
  },
  methods: {
    increment,
    get,
    startShortpolling,
    stopShortpolling
  },
  created: function() {
    startShortpolling();
    EventBus.$on("counter_incremented", clickCount => {
      this.$data.counter = clickCount;
    });
    EventBus.$on("start_shortpolling", () => {
      this.$data.isShortpolling = 1;
    });
    EventBus.$on("stop_shortpolling", () => {
      this.$data.isShortpolling = 0;
    });
    window.onblur = function() {
      stopShortpolling();
    };
  }
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
