export type Modify<A, B extends DeepPartialAny<A>> = {
    [K in keyof A | keyof B]: K extends keyof A ? K extends keyof B ? A[K] extends AnyObject ? B[K] extends AnyObject ? Modify<A[K], B[K]> : B[K] : B[K] : A[K] : B[K];
};
type AnyObject = Record<string, any>;
type DeepPartialAny<T> = {
    [P in keyof T]?: T[P] extends AnyObject ? DeepPartialAny<T[P]> : any;
};
export {};
