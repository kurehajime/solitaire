import Deck from './Deck';
import DescLine from './DescLine';
import AscLine from './AscLine';
import type { Card } from '~/types/Card';
import type { Target } from '~/types/Target';
import type { Suit } from '~/types/Suit';
import type { Rank } from '~/types/Rank';

export class GameManager {
    constructor(
        public Deck: Deck,
        public DescLines: DescLine[],
        public AscLines: AscLine[],
    ) {
    }

    Action(target: Target, col: number | null = null, row: number | null = null): GameManager {
        const next = this.Clone();
        const hover = this.GetHover();
        switch (target) {
            case "Deck":
                if (hover.length === 0) {
                    if (next.Deck.CanPick()) {
                        next.Deck = next.Deck.Pick();
                    }
                } else {
                    next.ResetHover();
                }
                break;
            case "Next":
                if (hover.length === 0) {
                    next.Deck = next.Deck.Open(3);
                } else {
                    next.ResetHover();
                }
                break;
            case "DescLine":
                if (col === null) {
                    return next;
                }
                if (hover.length === 0) {
                    if (row !== null && next.DescLines[col].CanPick(row)) {
                        next.DescLines[col] = next.DescLines[col].Pick(row);
                    }
                } else {
                    if (next.DescLines[col].CanPut(hover)) {
                        next.DescLines[col] = next.DescLines[col].Put(hover);
                        next.CleanUp();
                    } else {
                        next.ResetHover();
                    }
                }
                break;
            case "AscLine":
                if (col === null) {
                    return next;
                }
                if (hover.length === 0) {
                    if (next.AscLines[col].CanPick()) {
                        next.AscLines[col] = next.AscLines[col].Pick();
                    }
                } else {
                    if (next.AscLines[col].CanPut(hover)) {
                        next.AscLines[col] = next.AscLines[col].Put(hover);
                        next.CleanUp();
                    } else {
                        next.ResetHover();
                    }
                }
                break;
            case "None":
                next.ResetHover();
                break;
        }
        return next;
    }

    private ResetHover() {
        for (const i in this.DescLines) {
            this.DescLines[i] = this.DescLines[i].Reset();
        }
        for (const i in this.AscLines) {
            this.AscLines[i] = this.AscLines[i].Reset();
        }
        this.Deck = this.Deck.Reset();
    }

    private CleanUp() {
        for (const i in this.DescLines) {
            this.DescLines[i].hover = [];
        }
        for (const i in this.AscLines) {
            this.AscLines[i].hover = [];
        }
        this.Deck.hover = [];
        for (const i in this.DescLines) {
            if (this.DescLines[i].open.length === 0) {
                this.DescLines[i] = this.DescLines[i].Open();
            }
        }
    }

    GetHover(): Card[] {
        const hover: Card[] = [];
        for (const line of this.DescLines) {
            if (line.HasHover()) {
                hover.push(...line.hover);
            }
        }
        for (const line of this.AscLines) {
            if (line.HasHover()) {
                hover.push(...line.hover);
            }
        }
        if (this.Deck.HasHover()) {
            hover.push(...this.Deck.hover);
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

    static Init(): GameManager {
        const cards = GameManager.Shuffle(GameManager.getAllCards());
        const descLines = [] as DescLine[];
        for (let i = 0; i < 7; i++) {
            const reverse = cards.splice(0, i + 1);
            descLines.push(new DescLine(reverse, [], []));
        }
        const ascLines = [] as AscLine[];
        for (let i = 0; i < 4; i++) {
            ascLines.push(new AscLine([], [], []));
        }
        const deck = new Deck(cards, [], []);
        const gameManager = new GameManager(deck, descLines, ascLines);
        gameManager.CleanUp();
        return gameManager;
    }

    static Shuffle(cards: Card[]): Card[] {
        const result = [...cards];
        for (let i = result.length - 1; i >= 0; i--) {
            const r = Math.floor(Math.random() * (i + 1))
            const tmp = result[i]
            result[i] = result[r]
            result[r] = tmp
        }
        return result;
    }

    static getAllCards(): Card[] {
        const cards = [] as Card[];
        const suits: Suit[] = ["Spade", "Heart", "Diamond", "Club"];
        const ranks: Rank[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
        for (const suit of suits) {
            for (const rank of ranks) {
                cards.push({ suit, rank });
            }
        }
        return cards;
    }
}
