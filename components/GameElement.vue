<script setup lang="ts">
import type AscLine from "~/models/AscLine";
import type DescLine from "~/models/DescLine";
import type { GameManager } from "~/models/GameManager";
import Sample from "~/models/Sample";
const gameManager = ref<GameManager>(Sample.GetSample());
const next = () => {
  gameManager.value = gameManager.value.Action("Next");
};
const deck = () => {
  gameManager.value = gameManager.value.Action("Deck");
}
const desc = (col: number, row: number) => {
  gameManager.value = gameManager.value.Action("DescLine", col, row);
}
const asc = (col: number) => {
  gameManager.value = gameManager.value.Action("AscLine", col);
}

</script>
<template>
  <svg width="800" height="800">
    <NextElement :deck="gameManager.Deck" @next="next"></NextElement>
    <DeckElement :deck="gameManager.Deck" @deck="deck" />
    <g v-for="(descLine, index) in gameManager.DescLines">
      <DescElement :desc="descLine as DescLine" :col="index" @desc="desc" />
    </g>
    <g v-for="(ascLine, index) in gameManager.AscLines">
      <AscElement :asc="ascLine as AscLine" :col="index" @asc="asc" />
    </g>
  </svg>
</template>