<script setup lang="ts">
import type { Card } from "~/types/Card";
const props = defineProps<{
  card: Card | null,
  x: number,
  y: number,
  open: boolean,
}>();
const getSuit = computed(() => {
  if (props.card) {
    switch (props.card.suit) {
      case "Heart":
        return "♥";
      case "Diamond":
        return "♦";
      case "Club":
        return "♣";
      case "Spade":
        return "♠";
    }
  }
  return "";
});

const getColor = computed(() => props.open ? "green" : "red");
</script>
<style scoped>
.card {
  user-select: none;
}
</style>
<template>
  <g v-if="props.card" class="card">
    <rect :x="x" :y="y" width="100" height="180" :fill="getColor" stroke="black" />
    <text :x="x + 10" :y="y + 20" fill="white">{{ getSuit }}</text>
    <text :x="x + 10" :y="y + 40" fill="white">{{ props.card.rank }}</text>
    <text :x="x + 40" :y="y + 20" fill="white">{{ props.card.rank }}</text>
  </g>
</template>