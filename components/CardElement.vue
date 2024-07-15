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

const getColor = computed(() => {
  if (props.card) {
    switch (props.card.suit) {
      case "Heart":
      case "Diamond":
        return "red";
      case "Club":
      case "Spade":
        return "black";
    }
  }
  return "";
});
</script>
<style scoped>
.card {
  user-select: none;
}
</style>
<template>
  <g>
    <g v-if="props.card" class="card">
      <rect :x="x" :y="y" width="100" height="180" fill="white" stroke="black" />
      <text v-if="props.open" :x="x + 10" :y="y + 20" :fill="getColor">{{ getSuit }}</text>
      <text v-if="props.open" :x="x + 10" :y="y + 40" :fill="getColor">{{ props.card.rank }}</text>
      <text v-if="props.open" :x="x + 40" :y="y + 20" :fill="getColor">{{ props.card.rank }}</text>
    </g>
    <g v-if="!props.card" class="card">
      <rect :x="x" :y="y" width="100" height="180" fill="transparent" stroke="black" stroke-dasharray="2" />
    </g>
  </g>
</template>