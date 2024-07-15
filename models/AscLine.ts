import type { Card } from '~/types/Card'; // Add this import statement
import Stack from './Stack';
import type { Suit } from '~/types/Suit';
import type { Rank } from '~/types/Rank';

export default class AscLine extends Stack<AscLine> {
    CanPick(): boolean {
        return this.open.length !== 0 && !this.HasHover();
    }

    Pick(): AscLine {
        const next = this.Clone();
        const card = next.open.pop();
        if (card !== undefined) {
            next.hover.push(card);
        }
        return next;
    }

    CanPut(cards: Card[]): boolean {
        if(cards.length !== 1){
            return false;
        }
        const hover = cards[0];
        if(this.open.length === 0 && hover.rank === 1){
            return true;
        }
        const line = this.open[this.open.length - 1];
        if (!this.isUpRank(line.rank, hover.rank)) {
            return false;
        }
        if (!this.isSameSuit(hover.suit, line.suit)) {
            return false;
        }
        return true;
    }

    Put(cards: Card[]): AscLine {
        const next = this.Clone();
        next.open.push(cards[0]);
        return next;
    }

    Reset(): AscLine {
        const next = this.Clone();
        next.open.push(...next.hover);
        next.hover = [];
        return next;
    }

    Clone(): AscLine {
        return new AscLine(
            this.reverse.map(card => ({ ...card })),
            this.open.map(card => ({ ...card })),
            this.hover.map(card => ({ ...card })),
        );
    }

    private isUpRank(top: Rank, bottom: Rank): boolean {
        return top === bottom + 1;
    }

    private isSameSuit(suit1: Suit, suit2: Suit): boolean {
        return suit1 === suit2;
    }
}