export type TimerCommand = {
    command:TimerCommandType;
    timerId:number;
}

export enum TimerCommandType {
    Start,
    Stop,
    Reset,
}