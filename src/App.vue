<template>
  <div id="app">
    <div class="header">
      Todo using VueJS, VueX, and TypeScript
    </div>
    <itemInput />
    <itemList :items="items" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import ItemList from "@/components/ItemList.vue";
import ItemInput from "@/components/ItemInput.vue";


@Component({
  components: {
    itemList: ItemList,
    itemInput: ItemInput
  }
})
export default class App extends Vue {


}
</script>

<style lang="scss">
// normalize
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
body {
  font-size: 10px;
  padding: 2rem;
}
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  text-align: center;
  margin: auto;
  width: calc( 80vw );
  display: grid;
  justify-items: center;
  grid-template-columns: 1fr;
  grid-row-gap: 2rem;
  grid-template-areas:
  "header"
  "input"
  "items";
}
.header {
  font-size: 2.4rem;
  font-family: sans-serif;
  grid-area: header;
}

input {
    font-size: 1.6rem;
    border: 0;
    border-bottom: .1rem solid #111;
    background: #fff;
    grid-area: input;
    &[type=text]:focus {
      border: 0;
      border-bottom: .1rem solid #111;
    }
  }
</style>
