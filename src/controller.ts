import { TimerCommand, TimerCommandType } from "./timer-command.js";

export class Controller {
    private channel: BroadcastChannel;

    constructor() {
        this.channel = new BroadcastChannel('controller_channel');
        this.channel.addEventListener("message", (event) => {
            console.log("Message received");
            this.initTimers(event.data);
        });
    }

    private initTimers(totalTimers: number) {
        for (let i = 0; i < totalTimers; i++) {
            const container = document.createElement("div");
            container.classList.add("timer-controller");

            const startCommand = { command: TimerCommandType.Start, timerId: i };
            const resetCommand = { command: TimerCommandType.Reset, timerId: i };

            const startButton = document.createElement("button");
            startButton.textContent = "Start/Stop";
            startButton.addEventListener("click", () => this.sendMessage(startCommand));

            const resetButton = document.createElement("button");
            resetButton.textContent = "Reset";
            resetButton.addEventListener("click", () => this.sendMessage(resetCommand));

            container.appendChild(startButton);
            container.appendChild(resetButton);
            document.body.appendChild(container);
        };
    }

    private sendMessage(command: TimerCommand) {
        this.channel.postMessage(command);
    }
}

const controller = new Controller();
