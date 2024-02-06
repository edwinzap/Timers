export interface Settings {
    timers: TimerSettings[];
}

export interface TimerSettings {
    duration: number;
    options: number[];
    alarm: AlarmSettings | null;
}

export interface AlarmSettings {
    sound: string | null;
    repeat: number;
}