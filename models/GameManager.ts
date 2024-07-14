import Deck from './Deck';
import DescLine from './DescLine';
import AscLine from './AscLine';
import type { Card } from '~/types/Card';
import type { Target } from '~/types/Target';

export class GameManager {
    constructor(
        public Deck: Deck,
        public DescLine: DescLine,
        public AscLine: AscLine,
    ) {
    }

    Action(target: Target, index: number): GameManager {
        const next = this.Clone();
        const hoverOwner = next.HoverOwer();
        switch (target) {
            case "Deck":
                if (hoverOwner === null) {
                    next.Reset();
                } else {
                    // Deckから引く
                    if(this.Deck.CanPick()){
                        next.Deck = this.Deck.Pick();
                    }
                }
                break;
            case "DescLine":
                if (hoverOwner === null) {
                    // Descから引く
                    if(this.DescLine.CanPick(index)){
                        next.DescLine = this.DescLine.Pick(index);
                    }
                } else if (hoverOwner === "DescLine") {
                    next.Reset();
                } else {
                    // Descに置く
                    if(this.DescLine.CanPut(next.GetHover())){
                        next.DescLine = this.DescLine.Put(next.GetHover());
                        next.Reset();
                    }
                }
                break;
            case "AscLine":
                if (hoverOwner === null) {
                    // Ascから引く
                    if(this.AscLine.CanPick()){
                        next.AscLine = this.AscLine.Pick();
                    }
                } else if (hoverOwner === "AscLine") {
                    next.Reset();
                } else {
                    // Ascに置く
                    if(this.AscLine.CanPut(next.GetHover())){
                        next.AscLine = this.AscLine.Put(next.GetHover());
                        next.Reset();
                    }
                }
                break;
        }
        return next;
    }

    Reset(): GameManager {
        return new GameManager(
            this.Deck.Reset(),
            this.DescLine.Reset(),
            this.AscLine.Reset(),
        );
    }

    HasHover(): boolean {
        return this.Deck.HasHover() || this.DescLine.HasHover() || this.AscLine.HasHover();
    }

    HoverOwer(): Target | null {
        if (this.Deck.HasHover()) {
            return "Deck";
        }
        if (this.DescLine.HasHover()) {
            return "DescLine";
        }
        if (this.AscLine.HasHover()) {
            return "AscLine";
        }
        return null;
    }

    GetHover(): Card[] {
        const hover: Card[] = [];
        if (this.Deck.HasHover()) {
            hover.push(...this.Deck.hover);
        }
        if (this.DescLine.HasHover()) {
            hover.push(...this.DescLine.hover);
        }
        if (this.AscLine.HasHover()) {
            hover.push(...this.AscLine.hover);
        }

        return hover;
    }

    Clone(): GameManager {
        return new GameManager(
            this.Deck.Clone(),
            this.DescLine.Clone(),
            this.AscLine.Clone(),
        );
    }
}
