<script setup lang="ts">
import type { Card } from "~/types/Card";
const props = defineProps<{
    cards: Card[],
    mouseX: number,
    mouseY: number,
}>();

const getX = (index: number) => {
    return props.mouseX;
}

const getY = (index: number) => {
    return props.mouseY + index + 30;
}

</script>
<style scoped>
.hover {
    pointer-events: none;
}
</style>
<template>
    <g class="hover" v-for="(card, index) in props.cards">
        <CardElement :card="card" :x="getX(index)" :y="getY(index)" :open="true" />
    </g>
</template>