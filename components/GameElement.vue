<script setup lang="ts">
import type { Card } from "~/types/Card";
const card = ref<Card>({
  suit: "Heart",
  rank: 1,
});
const onClick = (card: Card) => {
  console.log(card.suit, card.rank);
};
</script>
<template>
  <svg>
    <CardElement :card="card" :x="0" :y="0" @clickCard="onClick" />
  </svg>
</template>