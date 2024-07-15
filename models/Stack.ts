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
}
