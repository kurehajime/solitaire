import Stack from './Stack';

export default class Deck extends Stack<Deck>{
    Pickable(): boolean {
        if (this.isHover()){
            return false;
        }
        if (this.open.length === 0){
            return false;
        }

        return true;
    }

    Pick(): Deck {
        const next = this.clone();
        const card = next.open.pop();
        if (card !== undefined){
            next.hover.push(card);
        }
        return next;
    }

    Open(count : number ): Deck {
        const next = this.clone();
        // 山札がからの場合はオープンカードを山に戻す
        if (next.reverse.length === 0){
            next.reverse = next.open.reverse();
            next.open = [];
            return next;
        }
        // 山札が残ってるとき
        next.reverse.unshift(...next.open.reverse());
        for (let i = 0; i < count; i++){
            const card = next.reverse.pop();
            if (card !== undefined){
                next.open.push(card);
            }
        }

        return next;
    }
}