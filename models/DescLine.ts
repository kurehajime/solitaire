import type { Card } from '~/types/Card'; // Add this import statement
import Stack from './Stack';
import type { Suit } from '~/types/Suit';
import type { Rank } from '~/types/Rank';

export default class DescLine extends Stack<DescLine> {
    CanPick(index: number): boolean {
        if (this.HasHover()) {
            return false;
        }
        if (this.open.length <= index) {
            return false;
        }
        let prev = this.open[index];
        for (let i = index + 1; i < this.open.length; i++) {
            if (this.isDownRank(prev.rank, this.open[i].rank)) {
                return false;
            }
            prev = this.open[i];
        }

        return true;
    }

    Pick(index: number): DescLine {
        const next = this.Clone();
        const picked = next.open.splice(index, next.open.length - index);
        next.hover.push(...picked);
        return next;
    }

    Open(): DescLine {
        const next = this.Clone();
        if (next.open.length === 0 && next.reverse.length > 0) {
            const card = next.reverse.pop();
            if (card !== undefined) {
                next.open.push(card);
            }
            return next;
        }
        return next;
    }

    CanPut(cards: Card[]): boolean {
        const hover = cards[0];
        const line = this.open[this.open.length - 1];
        if (!this.isDownRank(line.rank, hover.rank,)) {
            return false;
        }
        if (!this.isAltColor(hover.suit, line.suit)) {
            return false;
        }
        return true;
    }

    Put(cards: Card[]): DescLine {
        const next = this.Clone();
        next.open.push(...cards);
        return next;
    }

    private isDownRank(top: Rank, bottom: Rank): boolean {
        return top === bottom + 1;
    }

    private isAltColor(suit1: Suit, suit2: Suit): boolean {
        if (suit1 === "Spade" || suit1 === "Club") {
            return suit2 === "Heart" || suit2 === "Diamond";
        }
        return suit2 === "Spade" || suit2 === "Club";
    }
}