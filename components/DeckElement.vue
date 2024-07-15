<script setup lang="ts">
import type Deck from '~/models/Deck';
const props = defineProps<{
    deck: Deck
}>();
const emits = defineEmits<{
    (e: 'deck',  row: number): void
}>()

const onClick = (index: number) => {
    emits('deck', index);
};

const getX = (index: number) => {
    return 110 + index * 40;
}

const getY = (index: number) => {
    return 0;
}

</script>
<template>
    <g v-for="(card, index) in props.deck.open">
        <CardElement :card="card" :x="getX(index)" :y="getY(index)" @click="onClick(index)" />
    </g>
</template>