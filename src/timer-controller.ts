import { Timer } from './timer.js';
import { TimerView } from './timer-view.js';
import { TimerSettings } from './settings';
import { Observer, Subject } from './interfaces.js';

export class TimerController implements Observer, Subject {
    private timer: Timer;
    private view: TimerView;
    private observers: Observer[] = [];
    private isTimerStarted: boolean;
    private timerRemainingTime: number;

    public constructor(settings: TimerSettings) {
        this.timer = new Timer();
        this.view = new TimerView();
        this.timer.setDuration(settings.duration);
        this.timer.setAlarmSettings(settings.alarm);
        this.timer.attach(this);

        this.view.setOptions(settings.options);
        this.view.startButtonHandler = this.timer.startOrStop.bind(this.timer);
        this.view.resetButtonHandler = this.timer.reset.bind(this.timer);
        this.view.addTimeButtonHandler = this.timer.addTime.bind(this.timer);

        this.update();
    }

    public attach(observer: Observer): void {
        this.observers.push(observer);
    }
    
    public detach(observer: Observer): void {
        const index = this.observers.indexOf(observer);
        if (index !== -1) {
            this.observers.splice(index, 1);
        }
    }

    public notify(): void {
        this.observers.forEach((observer) => observer.update(this));
    }

    update(): void {
        if(this.timer.getRemainingTime() !== this.timerRemainingTime) {
            this.timerRemainingTime = this.timer.getRemainingTime();
            this.view.setRemainingTime(this.timer.getRemainingTime());
            this.notify();
        }
        if(this.timer.getIsStarted() !== this.isTimerStarted) {
            this.isTimerStarted = this.timer.getIsStarted();
            this.view.setIsStarted(this.timer.getIsStarted());
            this.notify();
        }
    }

    public getIsStarted(): boolean {
        return this.timer.getIsStarted();
    }

    public getRemainingTime(): number {
        return this.timer.getRemainingTime();
    }

    public getViewHtml(): HTMLElement {
        return this.view.getElement();
    }
}