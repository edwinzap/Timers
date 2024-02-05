import { TimerView } from "./timer-view.js";
import { Observer, Subject } from "./interfaces.js";

export class Timer implements Subject {
    private isStarted: boolean;
    private startTime: number;
    private addedTime: number;
    private intervalId: number | null;
    private initialDuration: number;
    private duration: number;
    private remainingTime: number;
    private readonly REFRESH_INTERVAL: number = 100;

    public constructor() {
        this.isStarted = false;
        this.startTime = 0;
        this.addedTime = 0;
        this.duration = 0;
        this.intervalId = null;
        this.setRemainingTime();
    }

    //#region Observer pattern
    private observers: Observer[] = [];

    attach(observer: Observer): void {
        this.observers.push(observer);
    }
    detach(observer: Observer): void {
        const index = this.observers.indexOf(observer);
        if (index !== -1) {
            this.observers.splice(index, 1);
        }
    }
    notify(): void {
        this.observers.forEach((observer) => observer.update(this));
    }
    //#endregion

    public setDuration(duration: number) {
        this.initialDuration = Math.max(duration * 1000, 0);
        this.updateDuration(this.initialDuration);
    }

    public startOrStop() {
        if (this.isStarted) {
            this.stop();
        }
        else {
            this.start();
        }
    }

    public addTime(seconds: number) {
        this.updateDuration(this.duration + seconds * 1000);
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
        this.setRemainingTime();
    }

    public getRemainingTime(): number {
        return this.remainingTime;
    }

    public getIsStarted(): boolean {
        return this.isStarted;
    }

    private updateDuration(newDuration: number) {
        if (newDuration < 0) {
            this.duration = 0;
        }
        else {
            this.duration = newDuration;
        }
        this.setRemainingTime();
    }

    private setRemainingTime() {
        const currentTime = this.isStarted ? Date.now() - this.startTime + this.addedTime : this.addedTime;
        const calculatedRemainingTime = this.duration - currentTime;
        if (calculatedRemainingTime <= 0) {
            this.stop();
            this.addedTime = 0;
            this.duration = 0;
            this.remainingTime = 0;
        } else {
            this.remainingTime = Math.floor(calculatedRemainingTime / 1000);
        }
        this.notify();
    }

    private setIsStarted(isStarted: boolean) {
        this.isStarted = isStarted;
        this.notify();
    }

    private start() {
        if (!this.isStarted) {
            this.setIsStarted(true);
            this.startTime = Date.now();
            this.intervalId = window.setInterval(() => this.setRemainingTime(), this.REFRESH_INTERVAL);
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
}