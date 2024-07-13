import type { Card } from '~/types/Card'; // Add this import statement

export default class Deck{

    constructor(
        public reverse : Card[],
        public open : Card[],
        public hover : Card[],
    ){

    }
    clone(){
        return new Deck(
            this.reverse.map(card => ({...card})),
            this.open.map(card => ({...card})),
            this.hover.map(card => ({...card})),
        );
    }
}