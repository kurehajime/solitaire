<script setup lang="ts">
import type Deck from '~/models/Deck';
const props = defineProps<{
    deck: Deck
}>();
const emits = defineEmits<{
    (e: 'deck'): void
}>()

const onClick = (index: number) => {
    if (index === props.deck.open.length - 1) {
        emits('deck');
    }
};

const getX = (index: number) => {
    return 130 + index * 40;
}

const getY = (index: number) => {
    return 10;
}

</script>
<template>
    <g v-for="(card, index) in props.deck.open">
        <CardElement :card="card" :x="getX(index)" :y="getY(index)" @click="onClick(index)" :open="true" />
    </g>
</template>