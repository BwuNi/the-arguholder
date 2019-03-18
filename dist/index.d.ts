declare type Tail<Tuple extends any[]> = ((...args: Tuple) => void) extends ((a: any, ...args: infer T) => void) ? T : never;
declare type Head<Tuple extends any[]> = Tuple extends [infer Result, ...any[]] ? Result : never;
declare type Unshift<Tuple extends any[], Element> = ((a: Element, ...args: Tuple) => void) extends ((...args: infer T) => void) ? T : never;
declare type FlatAndReverse<Result extends any[], Target> = {
    0: Result;
    1: Target extends [infer A, infer B] ? FlatAndReverse<Unshift<Result, A>, B> : never;
}[Target extends [infer A, infer B] ? 1 : 0];
declare type ReplaceNever<Result extends any[], Argus extends any[], inputArgus extends Argus> = {
    0: Result;
    1: ReplaceNever<Head<inputArgus> extends never ? [Head<Argus>, Result] : Result, Tail<Argus>, Tail<inputArgus>>;
}[Argus extends [] ? 0 : Argus extends any[] ? 1 : never];
declare type Entry<Argus extends any[], inputArgus extends Argus> = FlatAndReverse<[], ReplaceNever<[], Argus, inputArgus>>;
declare const _: never;
declare function holder<Result, Argus extends any[], InputArgus extends Argus>(lambda: (...args: Argus) => Result, ...inputArgus: InputArgus): (Entry<Argus, InputArgus> extends [] ? Result : ((...args: Entry<Argus, InputArgus>) => Result));
export { _, holder };
