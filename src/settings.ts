export interface Settings {
    useSimpleView:boolean;
    timers: TimerSettings[];
}

export interface TimerSettings {
    title: string;
    duration: number;
    options: number[];
    alarm: AlarmSettings | null;
}

export interface AlarmSettings {
    sound: string | null;
    repeat: number;
}