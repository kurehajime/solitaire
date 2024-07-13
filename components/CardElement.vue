<script setup lang="ts">
import type { CardType } from "~/types/CardType";

const props = defineProps<{ card: CardType, x: number, y: number }>();
const emits = defineEmits<{
  (e: 'clickCard', cardType: CardType): void
}>()

</script>

<template>
  <rect :x="x" :y="y" width="100" height="200" fill="red" @click="emits('clickCard', props.card)" />
  <text :x="x + 10" :y="y + 20" fill="white">{{ props.card.suit }}</text>
  <text :x="x + 10" :y="y + 40" fill="white">{{ props.card.rank }}</text>
</template>