<script setup lang="ts">
import { type Item } from "~/store/items";

interface Props {
  item: Item
  dynamicItem?: Item
}

const props = defineProps<Props>()

const itemClass = computed(() => props.item.id === props.dynamicItem?.id ? 'selected' : undefined)
</script>

<template>
  <div :class="itemClass" />
</template>
