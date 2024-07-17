<script setup lang="ts">
import type AscLine from '~/models/AscLine';

const props = defineProps<{
    asc: AscLine,
    col: number,
}>();

const emits = defineEmits<{
    (e: 'asc', col: number): void
}>()

const onClick = () => {
    emits('asc', props.col);
};

const getX = () => {
    return 350 + props.col * 110;
}

const getY = (index: number) => {
    const y = 10 + index * 3;
    return y;
}

</script>
<template>
    <g>
        <CardElement :card="null" :x="getX()" :y="getY(0)" @click="onClick()" :open="true"></CardElement>
        <g v-for="(card, index) in props.asc.open">
            <CardElement :card="card" :x="getX()" :y="getY(index)" @click="onClick()" :open="true" />
        </g>
    </g>
</template>