import { Citizen } from './citizen';

export class Subscription {
    id: number;
    pairKey: string;
    firstCitizen: Citizen;
    secondCitizen: Citizen;
    firstSubscriber: boolean;
    secondSubscriber: boolean;
}
