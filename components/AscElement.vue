<script setup lang="ts">
import type AscLine from '~/models/AscLine';

const props = defineProps<{
    asc: AscLine,
    col: number,
}>();

const emits = defineEmits<{
    (e: 'asc', col: number): void
}>()

const onClick = (index: number) => {
    emits('asc', props.col);
};

const getX = () => {
    return 350 + props.col * 110;
}

const getY = (index: number) => {
    const y = index * 3;
    return y;
}

</script>
<template>
    <g v-for="(card, index) in props.asc.open">
        <CardElement :card="card" :x="getX()" :y="getY(index)" @click="onClick(index)" :open="true" />
    </g>
</template>