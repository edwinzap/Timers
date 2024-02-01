import { TimerView } from "./timer-view.js";

export class Timer {
    private view: TimerView;
    private isStarted: boolean;
    private startTime: number;
    private addedTime: number;
    private intervalId: number | null;
    private initialDuration: number;
    private duration: number;

    private readonly REFRESH_INTERVAL: number = 100;

    public constructor() {
        this.isStarted = false;
        this.startTime = 0;
        this.addedTime = 0;
        this.duration = 0;
        this.intervalId = null;

        this.view = new TimerView();
        this.view.startButtonHandler = this.startOrStop.bind(this);
        this.view.resetButtonHandler = this.reset.bind(this);
        this.view.addTimeButtonHandler = this.addTime.bind(this);

        this.updateRemainingTime();
    }

    public addTime(seconds: number) {
        this.updateDuration(this.duration + seconds * 1000);
    }

    public setDuration(duration: number) {
        this.initialDuration = Math.max(duration * 1000, 0);
        this.updateDuration(this.initialDuration);
    }

    public setOptions(options: number[]) {
        this.view.setOptions(options);
    }

    public getElement(): HTMLDivElement {
        return this.view.getElement();
    }

    public startOrStop() {
        if (this.isStarted) {
            this.stop();
        }
        else {
            this.start();
        }
    }

    public reset() {
        this.setIsStarted(false);
        this.startTime = 0;
        this.addedTime = 0;
        this.duration = this.initialDuration;
        if (this.intervalId !== null) {
            window.clearInterval(this.intervalId);
            this.intervalId = null;
        }
        this.updateRemainingTime();
    }

    private updateDuration(newDuration: number) {
        if (newDuration < 0) {
            this.duration = 0;
        }
        else {
            this.duration = newDuration;
        }
        this.updateRemainingTime();
    }

    private setIsStarted(isStarted: boolean) {
        this.isStarted = isStarted;
        this.view.setIsStarted(isStarted);
    }

    private start() {
        if (!this.isStarted) {
            this.setIsStarted(true);
            this.startTime = Date.now();
            this.intervalId = window.setInterval(() => this.updateRemainingTime(), this.REFRESH_INTERVAL);
        }
    }

    private stop() {
        if (this.isStarted) {
            this.setIsStarted(false);
            this.addedTime += Date.now() - this.startTime;

            if (this.intervalId !== null) {
                window.clearInterval(this.intervalId);
                this.intervalId = null;
            }
        }
    }

    private updateRemainingTime() {
        const currentTime = this.isStarted ? Date.now() - this.startTime + this.addedTime : this.addedTime;
        const remainingTime = this.duration - currentTime;
        if (remainingTime <= 0) {
            this.stop();
            this.addedTime = 0;
            this.duration = 0;
            this.view.setRemainingTime(0);
        } else {
            const totalSeconds = Math.floor(remainingTime / 1000);
            this.view.setRemainingTime(totalSeconds);
        }
    }
}