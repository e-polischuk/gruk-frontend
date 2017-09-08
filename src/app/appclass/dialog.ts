import { Message } from './message';

export class Dialog {
    pairKey: string;
    holder: number;
    dialog: Array<Message>;
    unredCount: number;
    visible: boolean;
}
