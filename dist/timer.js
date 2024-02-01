import { TimerView } from "./timer-view.js";
export class Timer {
    constructor() {
        this.REFRESH_INTERVAL = 100;
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
    addTime(seconds) {
        this.updateDuration(this.duration + seconds * 1000);
    }
    setDuration(duration) {
        console.log("Initial duration: " + duration);
        this.initialDuration = Math.max(duration * 1000, 0);
        this.updateDuration(this.initialDuration);
    }
    setOptions(options) {
        this.view.setOptions(options);
    }
    getElement() {
        return this.view.getElement();
    }
    startOrStop() {
        if (this.isStarted) {
            this.stop();
        }
        else {
            this.start();
        }
    }
    reset() {
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
    updateDuration(newDuration) {
        if (newDuration < 0) {
            this.duration = 0;
        }
        else {
            this.duration = newDuration;
        }
        console.log("Duration: " + this.duration);
        this.updateRemainingTime();
    }
    setIsStarted(isStarted) {
        this.isStarted = isStarted;
        this.view.setIsStarted(isStarted);
    }
    start() {
        if (!this.isStarted) {
            this.setIsStarted(true);
            this.startTime = Date.now();
            this.intervalId = window.setInterval(() => this.updateRemainingTime(), this.REFRESH_INTERVAL);
        }
    }
    stop() {
        if (this.isStarted) {
            this.setIsStarted(false);
            this.addedTime += Date.now() - this.startTime;
            if (this.intervalId !== null) {
                window.clearInterval(this.intervalId);
                this.intervalId = null;
            }
        }
    }
    updateRemainingTime() {
        const currentTime = this.isStarted ? Date.now() - this.startTime + this.addedTime : this.addedTime;
        const remainingTime = this.duration - currentTime;
        if (remainingTime <= 0) {
            this.stop();
            this.addedTime = 0;
            this.duration = 0;
            this.view.setRemainingTime(0);
        }
        else {
            const totalSeconds = Math.floor(remainingTime / 1000);
            this.view.setRemainingTime(totalSeconds);
        }
    }
}
