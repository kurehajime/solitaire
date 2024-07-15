import Stack from './Stack';

export default class Deck extends Stack<Deck>{
    CanPick(): boolean {
        if (this.HasHover()){
            return false;
        }
        if (this.open.length === 0){
            return false;
        }

        return true;
    }

    Pick(): Deck {
        const next = this.Clone();
        const card = next.open.pop();
        if (card !== undefined){
            next.hover.push(card);
        }
        return next;
    }

    Open(count : number ): Deck {
        const next = this.Clone();
        // 山札がからの場合はオープンカードを山に戻す
        if (next.reverse.length === 0){
            next.reverse = next.open.reverse();
            next.open = [];
            return next;
        }
        // 山札が残ってるとき
        next.reverse.unshift(...next.open.reverse());
        next.open = [];
        for (let i = 0; i < count; i++){
            const card = next.reverse.pop();
            if (card !== undefined){
                next.open.push(card);
            }
        }

        return next;
    }

    HasNext(): boolean {
        return this.reverse.length !== 0;
    }

    Reset(): Deck {
        const next = this.Clone();
        next.open.push(...next.hover);
        next.hover = [];
        return next;
    }

    Clone(): Deck {
        return new Deck(
            this.reverse.map(card => ({ ...card })),
            this.open.map(card => ({ ...card })),
            this.hover.map(card => ({ ...card })),
        );
    }
}