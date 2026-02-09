declare module "sql.js" {
  export interface SqlJsStatic {
    Database: typeof Database;
  }
  export class Database {
    constructor(data?: ArrayLike<number> | Buffer);
    run(sql: string, params?: unknown[]): void;
    exec(sql: string): { columns: string[]; values: unknown[][] }[];
    prepare(sql: string): Statement;
    export(): Uint8Array;
    close(): void;
  }
  export interface Statement {
    bind(values: unknown[]): void;
    step(): boolean;
    get(): unknown[];
    free(): void;
  }
  export default function initSqlJs(options?: { locateFile?: (file: string) => string }): Promise<SqlJsStatic>;
}
