<script setup lang="ts">
import type AscLine from "~/models/AscLine";
import type DescLine from "~/models/DescLine";
import { GameManager } from "~/models/GameManager";
const mouseX = ref(0);
const mouseY = ref(0);
const svg = ref<SVGAElement>();
const gameManager = ref<GameManager>(GameManager.Init());
const next = () => {
  gameManager.value = gameManager.value.Action("Next");
};
const deck = () => {
  gameManager.value = gameManager.value.Action("Deck");
}
const desc = (col: number, row: number | null) => {
  gameManager.value = gameManager.value.Action("DescLine", col, row);
}
const asc = (col: number) => {
  gameManager.value = gameManager.value.Action("AscLine", col);
}

const mousemove = (e: MouseEvent) => {
  if (svg.value) {
    const rect = svg.value.getBoundingClientRect();
    mouseX.value = e.clientX - rect.left;
    mouseY.value = e.clientY - rect.top;
  }
}

</script>
<template>
  <svg ref="svg" width="800" height="800" @mousemove="mousemove">
    <NextElement :deck="gameManager.Deck" @next="next"></NextElement>
    <DeckElement :deck="gameManager.Deck" @deck="deck" />
    <g v-for="(descLine, index) in gameManager.DescLines">
      <DescElement :desc="descLine as DescLine" :col="index" @desc="desc" />
    </g>
    <g v-for="(ascLine, index) in gameManager.AscLines">
      <AscElement :asc="ascLine as AscLine" :col="index" @asc="asc" />
    </g>
    <HoverElement :cards="gameManager.GetHover()" :mouseX="mouseX" :mouseY="mouseY" />
  </svg>
</template>