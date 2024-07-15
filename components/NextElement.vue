<script setup lang="ts">
import type Deck from '~/models/Deck';
const props = defineProps<{ deck: Deck }>();
const emits = defineEmits<{
    (e: 'next'): void
}>()

const next = () => {
    if (props.deck.HasNext()) {
        return props.deck.reverse[props.deck.reverse.length - 1];
    } else {
        return null;
    }
}

const onClick = () => {
    emits('next');
};

</script>
<template>
    <CardElement :card="next()" :x="0" :y="0" @click="onClick" :open="false" />
</template>