import type { Card } from '~/types/Card'; // Add this import statement

export default class Stack<T extends Stack<T>> {

    constructor(
        public reverse: Card[],
        public open: Card[],
        public hover: Card[],
    ) {

    }

    HasHover(): boolean {
        return this.hover.length !== 0;
    }

    Reset(): T {
        const next = this.Clone();
        next.open.push(...next.hover);
        next.hover = [];
        return next;
    }

    Clone(): T {
        return this.constructor(
            this.reverse.map(card => ({ ...card })),
            this.open.map(card => ({ ...card })),
            this.hover.map(card => ({ ...card })),
        );
    }
}