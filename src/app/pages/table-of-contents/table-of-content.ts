export class TableOfContentEntry {

    isNewSubHeader = false;

    constructor(readonly level: number,
                readonly text: string,
                readonly anchor: string) {
    }
}

export type TableOfContent = TableOfContentEntry[];
