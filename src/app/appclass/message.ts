import { EmbedFile } from './embedfile';
import { Citizen } from './citizen';

export class Message {
    id: number;
    pairKey: string;
    textContent: string;
    embeddedFile: EmbedFile;
    sender: Citizen;
    receiver: Citizen;
    dateTime;
    red: boolean;
}
