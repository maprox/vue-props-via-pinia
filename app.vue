<script setup lang="ts">
import { useItemsStore } from "~/store/items";
import { storeToRefs } from "pinia";

const itemsStore = useItemsStore()
const { items, dynamicItem } = storeToRefs(itemsStore)

const count = ref(100000)

const isToRefs = ref(true)

let isLoading = false

function init() {
  console.log('init')
  performance.mark('init')
  itemsStore.init(count.value)
  isLoading = true
}

onUpdated(() => {
  console.log('updated')

  try {
    if (isLoading) {
      performance.mark('updated')
      console.log(performance.measure('time', 'init', 'updated').duration)
      isLoading = false
    }
  } catch {}
})

let intervalId: any;

function startInterval() {
  intervalId = setInterval(() => {
    if (items.value.length > 0) {
      dynamicItem!.value = items.value[Math.round(Math.random() * items.value.length)]
    }
  }, 1000)
}

function stopInterval() {
  clearInterval(intervalId)
}
</script>

<template>
  <div>
    <label>
      Count: <input type="text" v-model.number="count">
    </label>
    <label>
      Get dynamicItem via internal storeToRefs
      <input type="checkbox" v-model="isToRefs">
    </label>
    <button type="button" @click="init()">Init</button>
    <button type="button" @click="startInterval()">Start interval</button>
    <button type="button" @click="stopInterval()">Stop interval</button>
    <h1>Items:</h1>
    <h2>Dynamic Item: {{ dynamicItem?.id }}</h2>
    <div class="container">
      <template v-if="isToRefs">
        <CheckToRefsChild
          v-for="item in items"
          :key="item.id"
          :item="item"
        />
      </template>
      <template v-else>
        <CheckToRefsChildLinked
          v-for="item in items"
          :key="item.id"
          :item="item"
          :dynamic-item="dynamicItem"
        />
<!--        LESS MEMORY USAGE (unusable):
                <CheckToRefsChildLinked
                  v-for="item in items"
                  :key="item.id"
                  :item="item"
                  :class="{ 'selected': item.id === dynamicItem?.id }"
                />-->
      </template>
    </div>
  </div>
</template>

<style>
.container {
  display: flex;
  flex-wrap: wrap;
}
.container > * {
  width: 4px;
  height: 4px;
  background: aliceblue;
}
.container > .selected {
  background: red;
}
</style>
