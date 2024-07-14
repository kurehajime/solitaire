import type { Card } from '~/types/Card'; // Add this import statement

export default class Stack<T extends Stack<T>> {

    constructor(
        public reverse: Card[],
        public open: Card[],
        public hover: Card[],
    ) {

    }

    IsHover(): boolean {
        return this.hover.length !== 0;
    }

    Clone(): T {
        return this.constructor(
            this.reverse.map(card => ({ ...card })),
            this.open.map(card => ({ ...card })),
            this.hover.map(card => ({ ...card })),
        );
    }
}