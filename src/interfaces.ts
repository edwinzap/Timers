export interface Observer {
    update(subject: Subject): void;
}

export interface Subject {
    attach(observer: Observer): void;
    detach(observer: Observer): void;
    notify(): void;
}

export class TimerMessage {
    id: number;
    remainingTime: number;
    isStarted: boolean;

    constructor(id:number, remainingTime:number, isStarted:boolean) {
        this.id = id;
        this.remainingTime = remainingTime;
        this.isStarted = isStarted;
    }
}