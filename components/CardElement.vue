<script setup lang="ts">
import type { Card } from "~/types/Card";
const props = defineProps<{ card: Card | null, x: number, y: number }>();
</script>

<template>
  <g v-if="props.card">
    <rect :x="x" :y="y" width="100" height="180" fill="green"
      stroke="black" />
    @click="emits('clickCard', props.card)" />
    <text :x="x + 10" :y="y + 20" fill="white">{{ props.card.suit }}</text>
    <text :x="x + 10" :y="y + 40" fill="white">{{ props.card.rank }}</text>
  </g>
</template>