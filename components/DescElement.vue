<script setup lang="ts">
import type DescLine from '~/models/DescLine';

const props = defineProps<{
    desc: DescLine,
    col: number,
}>();

const emits = defineEmits<{
    (e: 'desc', col: number, row: number): void
}>()

const onClick = (index: number) => {
    emits('desc', props.col, index);
};

const getX = () => {
    return 200 + props.col * 110;
}

const getY = (reverse: boolean, index: number) => {
    const rev = (props.desc.reverse.length - 1) * 30;
    const y = 200 + index * 30;
    if (!reverse) {
        return y + rev;
    }
    return y;
}

</script>
<template>
    <g v-for="(card, index) in props.desc.open">
        <CardElement :card="card" :x="getX()" :y="getY(true, index)" :open="false" />
    </g>
    <g v-for="(card, index) in props.desc.open">
        <CardElement :card="card" :x="getX()" :y="getY(false, index)" @click="onClick(index)" :open="true" />
    </g>
</template>