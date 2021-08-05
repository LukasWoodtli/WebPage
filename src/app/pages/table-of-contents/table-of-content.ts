export class TableOfContentEntry {

    constructor(readonly level: number,
                readonly text: string,
                readonly anchor: string) {
    }
}

export type TableOfContent = TableOfContentEntry[];
