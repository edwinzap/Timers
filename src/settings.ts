export interface Settings {
    timers: TimerSettings[];
}

export interface TimerSettings {
    duration: number;
    options: number[];
}