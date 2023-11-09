<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{ srcList: string[] }>();
const left = computed(() => props.srcList.slice(0, props.srcList.length / 2));
const right = computed(() => props.srcList.slice(props.srcList.length / 2));
</script>
<template>
  <client-only>
    <div class="container">
      <div class="left">
        <div v-for="item in left" :key="item">
          <img class="img" :src="item" />
        </div>
      </div>
      <div class="right">
        <div v-for="item in left" :key="item">
          <img class="img" :src="item" />
        </div>
      </div>
    </div>
  </client-only>
</template>
<style lang="scss" scoped>
.container {
  display: flex;
  padding-top: 1.25rem;
  background-color: #ecf0f1;
  border-radius: 8px;
  .left {
    width: 50%;
    margin: 0 auto;
    div {
      display: flex;
      img {
        margin: 0 auto;
        margin-top: 15px;
        border-radius: 8px;
      }
    }
  }
  .right {
    width: 50%;
    margin: 0 auto;
    div {
      display: flex;
      img {
        margin: 0 auto;
        margin-top: 15px;
        border-radius: 8px;
      }
    }
  }
}
</style>
