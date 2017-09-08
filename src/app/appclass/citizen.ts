import { Community } from './community';
import { FullName } from './fullname';
import { EmbedFile } from './embedfile';

export class Citizen {
    id: number;
    email: string;
    citizenName: FullName;
    profilePhoto: EmbedFile;
    community: Community;
    status: string;
    info: string;
    phoneNumber: string;
    birthday: Date;
    blocked: boolean;
}
