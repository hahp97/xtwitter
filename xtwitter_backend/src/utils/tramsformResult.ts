export interface QueryResultOps {
  [column: string]: any;
}

export declare const transformResult: <R extends QueryResultOps>(
  rows: R[]
) => R[];
