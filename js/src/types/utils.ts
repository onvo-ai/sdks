export type Modify<A, B extends DeepPartialAny<A>> = {
  [K in keyof A | keyof B]: K extends keyof A
    ? K extends keyof B
      ? A[K] extends AnyObject
        ? B[K] extends AnyObject
          ? Modify<A[K], B[K]>
          : B[K]
        : B[K]
      : A[K]
    : B[K];
};

type AnyObject = Record<string, any>;

type DeepPartialAny<T> = {
  /** Makes each property optional and turns each leaf property into any, allowing for type overrides by narrowing any. */
  [P in keyof T]?: T[P] extends AnyObject ? DeepPartialAny<T[P]> : any;
};
