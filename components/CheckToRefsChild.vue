<script setup lang="ts">
import { type Item, useItemsStore } from "~/store/items";
import { storeToRefs } from "pinia";

interface Props {
  item: Item
}

const props = defineProps<Props>()

const itemsStore = useItemsStore()
const { dynamicItem } = storeToRefs(itemsStore)

const itemClass = computed(() => props.item.id === dynamicItem?.value?.id ? 'selected' : undefined)
</script>

<template>
  <div :class="itemClass" />
</template>
