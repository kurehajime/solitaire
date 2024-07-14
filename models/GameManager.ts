import Deck from './Deck';
import DescLine from './DescLine';
import AscLine from './AscLine';
import type { Card } from '~/types/Card';
import type { Target } from '~/types/Target';

export class GameManager {
    constructor(
        public Deck: Deck,
        public DescLines: DescLine[],
        public AscLines: AscLine[],
    ) {
    }

    Action(target: Target, col: number, row: number): GameManager {
        const next = this.Clone();
        const hover = this.GetHover();
        switch (target) {
            case "Deck":
                if (hover.length === 0) {
                    if (next.Deck.CanPick()) {
                        next.Deck = next.Deck.Pick();
                    }
                } else {
                    this.ResetHover();
                }
                break;
            case "Next":
                if (hover.length === 0) {
                    next.Deck = next.Deck.Open(3);
                } else {
                    this.ResetHover();
                }
                break;
            case "DescLine":
                if (hover.length === 0) {
                    if (next.DescLines[col].CanPick(row)) {
                        next.DescLines[col] = next.DescLines[col].Pick(row);
                    }
                } else {
                    if (next.DescLines[col].CanPut(hover)) {
                        next.DescLines[col] = next.DescLines[col].Put(hover);
                        next.ResetHover();
                    }
                }
                break;
            case "AscLine":
                if (hover.length === 0) {
                    if (next.AscLines[col].CanPick()) {
                        next.AscLines[col] = next.AscLines[col].Pick();
                    }
                } else {
                    if (next.AscLines[col].CanPut(hover)) {
                        next.AscLines[col] = next.AscLines[col].Put(hover);
                        next.ResetHover();
                    }
                }
                break;
        }
        return next;
    }

    ResetHover(): GameManager {
        const next = this.Clone();
        for (const i in next.DescLines) {
            next.DescLines[i] = next.DescLines[i].Reset();
        }
        for (const i in next.AscLines) {
            next.AscLines[i] = next.AscLines[i].Reset();
        }
        next.Deck = next.Deck.Reset();
        return next;
    }

    GetHover(): Card[] {
        const hover: Card[] = [];
        for (const line of this.DescLines) {
            if (line.HasHover()) {
                hover.push(line.hover[0]);
            }
        }
        for (const line of this.AscLines) {
            if (line.HasHover()) {
                hover.push(line.hover[0]);
            }
        }
        if (this.Deck.HasHover()) {
            hover.push(this.Deck.hover[0]);
        }

        return hover;
    }

    Clone(): GameManager {
        return new GameManager(
            this.Deck.Clone(),
            this.DescLines.map(line => line.Clone()),
            this.AscLines.map(line => line.Clone()),
        );
    }
}
