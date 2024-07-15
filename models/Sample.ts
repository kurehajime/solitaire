import type { Card } from "~/types/Card";
import { GameManager } from "./GameManager";
import Deck from "./Deck";
import DescLine from "./DescLine";
import AscLine from "./AscLine";

export default class Sample{
    
    static GetSample() : GameManager{
        const deckReverse: Card[] = [
            { suit: "Spade", rank: 1 },
            { suit: "Spade", rank: 2 },
            { suit: "Spade", rank: 3 },
            { suit: "Spade", rank: 4 },
            { suit: "Spade", rank: 5 },
            { suit: "Spade", rank: 6 },
            { suit: "Spade", rank: 7 },
            { suit: "Spade", rank: 8 },
            { suit: "Spade", rank: 9 },
            { suit: "Spade", rank: 10 },
        ];
        const deckOpen: Card[] = [
            { suit: "Spade", rank: 11 },
            { suit: "Spade", rank: 12 },
            { suit: "Spade", rank: 13 },
        ];
        const AscOpen: Card[] = [
            { suit: "Heart", rank: 1 },
            { suit: "Heart", rank: 2 },
            { suit: "Heart", rank: 3 },
            { suit: "Heart", rank: 4 },
            { suit: "Heart", rank: 5 },
            { suit: "Heart", rank: 6 },
            { suit: "Heart", rank: 7 },
            { suit: "Heart", rank: 8 },
            { suit: "Heart", rank: 9 },
            { suit: "Heart", rank: 10 },
            { suit: "Heart", rank: 11 },
            { suit: "Heart", rank: 12 },
            { suit: "Heart", rank: 13 },
        ];
        const DeskOpen: Card[] = [
            { suit: "Diamond", rank: 13 },
            { suit: "Club", rank: 12 },
            { suit: "Diamond", rank: 11 },
            { suit: "Club", rank: 10 },
        ];
        const DeskReverse1: Card[] = [
            { suit: "Diamond", rank: 1 },
            { suit: "Diamond", rank: 2 },
            { suit: "Diamond", rank: 3 },
            { suit: "Diamond", rank: 4 },
            { suit: "Diamond", rank: 5 },
        ];
        const DeskReverse2: Card[] = [
            { suit: "Diamond", rank: 6 },
            { suit: "Diamond", rank: 7 },
            { suit: "Diamond", rank: 8 },
            { suit: "Diamond", rank: 10 },
            { suit: "Diamond", rank: 12 },
        ];
        const DeskReverse3: Card[] = [
            { suit: "Club", rank: 1 },
            { suit: "Club", rank: 2 },
            { suit: "Club", rank: 3 },
            { suit: "Club", rank: 4 },
            { suit: "Club", rank: 5 },
            { suit: "Club", rank: 6 },
        ];
        const DeskReverse4: Card[] = [
            { suit: "Club", rank: 7 },
            { suit: "Club", rank: 8 },
            { suit: "Club", rank: 9 },
            { suit: "Club", rank: 11 },
            { suit: "Club", rank: 13 },
        ];
    
        return new GameManager(
            new Deck(deckReverse, deckOpen, []),
            [
                new DescLine(DeskReverse1,DeskOpen,[]),
                new DescLine(DeskReverse2,[],[]),
                new DescLine(DeskReverse3,[],[]),
                new DescLine(DeskReverse4,[],[]),
                new DescLine([],[],[]),
                new DescLine([],[],[]),
                new DescLine([],[],[]),
            ],
            [
                new AscLine([],AscOpen,[]),
                new AscLine([],[],[]),
                new AscLine([],[],[]),
                new AscLine([],[],[]),
            ]
        )
    }
}