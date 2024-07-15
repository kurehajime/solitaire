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
    if(reverse) {
        return 220 + index * 3;
    }else{
        const rev = 220 + (props.desc.reverse.length - 1) * 3;
        const y =  index * 30;
        return y + rev;
    }
}

</script>
<template>
    <g v-for="(card, index) in props.desc.reverse">
        <CardElement :card="card" :x="getX()" :y="getY(true, index)" :open="false" />
    </g>
    <g v-for="(card, index) in props.desc.open">
        <CardElement :card="card" :x="getX()" :y="getY(false, index)" @click="onClick(index)" :open="true" />
    </g>
</template>