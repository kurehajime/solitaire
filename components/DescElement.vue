<script setup lang="ts">
import type DescLine from '~/models/DescLine';

const props = defineProps<{
    desc: DescLine,
    col: number,
}>();

const emits = defineEmits<{
    (e: 'desc', col: number, row: number | null): void
}>()

const onClick = (index: number | null) => {
    emits('desc', props.col, index);
};

const getX = () => {
    return 20 + props.col * 110;
}

const getY = (reverse: boolean, index: number) => {
    if (reverse) {
        return 230 + index * 3;
    } else {
        const rev = 230 + (props.desc.reverse.length) * 3;
        const y = index * 35;
        return y + rev;
    }
}

</script>
<template>
    <g>
        <CardElement :card="null" :x="getX()" :y="getY(true, 0)" @click="onClick(null)" :open="true"></CardElement>
        <g v-for="(card, index) in props.desc.reverse">
            <CardElement :card="card" :x="getX()" :y="getY(true, index)" :open="false" @click="onClick(null)" />
        </g>
        <g v-for="(card, index) in props.desc.open">
            <CardElement :card="card" :x="getX()" :y="getY(false, index)" @click="onClick(index)" :open="true" />
        </g>
    </g>
</template>