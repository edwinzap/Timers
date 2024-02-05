import { TimerMessage } from './interfaces.js';
import { Tools } from './tools.js';

export class SimpleView {
    private container: HTMLDivElement;
    private channel: BroadcastChannel;

    constructor() {
        this.container = document.getElementById('container') as HTMLDivElement;
        this.channel = new BroadcastChannel('simpleview_channel');
        this.channel.postMessage("init");
        this.channel.addEventListener("message", (event) => {
            const message = event.data as TimerMessage;
            this.updateTimerInfo(message)
        });
    }

    public updateTimerInfo(timer: TimerMessage) {
        const timerText = document.getElementById(`timer-${timer.id}`) as HTMLDivElement;
        let text = timerText?.querySelector('.text') as HTMLDivElement;
        if (text === undefined) {
            const element = document.createElement('div');
            element.classList.add('timer');
            element.id = `timer-${timer.id}`;

            text = document.createElement('div');
            text.classList.add('text');

            element.appendChild(text);
            this.container.appendChild(element);
        }
        text.textContent = Tools.secondsToText(timer.remainingTime);
    }
}

const view = new SimpleView();
