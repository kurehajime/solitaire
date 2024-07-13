<script setup lang="ts">
import type { CardType } from "~/types/CardType";
const card = ref<CardType>({
  suit: "Heart",
  rank: 1,
});
const onClick = (cardType: CardType) => {
  console.log(cardType.suit, cardType.rank);
};
</script>
<template>
  <svg>
    <CardElement :card="card" :x="0" :y="0" @clickCard="onClick" />
  </svg>
</template>