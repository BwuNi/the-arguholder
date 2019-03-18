// ['1','2','3'] -> ['2','3']
type Tail<Tuple extends any[]> = ((...args: Tuple) => void) extends ((a: any, ...args: infer T) => void) ? T : never
// ['1','2','3'] -> '1'
type Head<Tuple extends any[]> = Tuple extends [infer Result, ...any[]] ? Result : never
// (['2','3'],'1') -> ['1','2','3']
type Unshift<Tuple extends any[], Element> = ((a: Element, ...args: Tuple) => void) extends ((...args: infer T) => void) ? T : never

// ['1',['2',['3',[]]]] -> ["3", "2", "1"]
type FlatAndReverse<Result extends any[], Target> = {
    0: Result;
    1: Target extends [infer A, infer B] ? FlatAndReverse<Unshift<Result, A>, B> : never
}[Target extends [infer A, infer B] ? 1 : 0]

type ReplaceNever<Result extends any[], Argus extends any[], inputArgus extends Argus> = {
    0: Result,
    1: ReplaceNever<Head<inputArgus> extends never
        ? [Head<Argus>, Result]
        : Result, Tail<Argus>, Tail<inputArgus>>
}[Argus extends [] ? 0 : Argus extends any[] ? 1 : never]

type Entry<Argus extends any[], inputArgus extends Argus> = FlatAndReverse<[], ReplaceNever<[], Argus, inputArgus>>

const _: never = {} as never

function holder<Result, Argus extends any[], InputArgus extends Argus>
    (lambda: (...args: Argus) => Result, ...inputArgus: InputArgus)
    : (Entry<Argus, InputArgus> extends [] ? Result : ((...args: Entry<Argus, InputArgus>) => Result)
    ) {
    type Next = Entry<Argus, InputArgus>
    type Res = Next extends [] ? Result : ((...args: Next) => Result);

    if (inputArgus.filter(v => v === _).length === 0) {
        return <Res>lambda(...inputArgus)
    }
    else {
        return <Res>((...nextArgus: Entry<Argus, InputArgus>): Result => {
            let i = 0
            const finalArgus = inputArgus.map(v => v == _ ?   nextArgus[i++]:v) as Argus
            return lambda(...finalArgus)
        })
    }
}

// type Test = Entry<[symbol,number,string,object],[never,number,never,object]>

// const lambda = (...args: [string, number[], boolean]): number => 
//     args[1].reduce((a, b) => a + b) * args[0].length ** (args[2] ? 2 : 3)


// console.log(holder(lambda, _, [1, 2, 3], true)('hello'))

// console.log(holder(lambda, 'hello', [1, 2, 3], true))

export {
    _, holder
}