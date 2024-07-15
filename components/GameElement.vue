<script setup lang="ts">
import type { GameManager } from "~/models/GameManager";
import Sample from "~/models/Sample";
const gameManager = ref<GameManager>(Sample.GetSample());
const next = () => {
  gameManager.value = gameManager.value.Action("Next");
};
const deck = () => {
  gameManager.value = gameManager.value.Action("Deck");
}
</script>
<template>
  <svg width="800" height="800">
    <NextElement :deck="gameManager.Deck" @next="next"></NextElement>
    <DeckElement :deck="gameManager.Deck" @deck="deck" />

  </svg>
</template>