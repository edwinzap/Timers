import { Timer } from "./timer.js";
import { Settings } from "./settings.js";
import { TimerCommand, TimerCommandType } from "./timer-command.js";

export class View {
    private timers: Timer[];

    public constructor() {
        this.initView();
    }

    public async initView() {
        const container = document.getElementById("container") as HTMLDivElement;
        const settings = await this.getSettings();
        this.timers = this.getTimers(settings);
        container.append(...this.timers.map((timer) => timer.getElement()));

        const controllerChannel = new BroadcastChannel('controller_channel');
        controllerChannel.addEventListener("message", (event) => {
            this.handleMessage(event.data);
        });
        controllerChannel.postMessage(settings.timers.length);
    }

    private handleMessage(data:TimerCommand){
        if(data.command === TimerCommandType.Start){
            this.timers[data.timerId].startOrStop();
        }
        else if(data.command === TimerCommandType.Reset){
            this.timers[data.timerId].reset();
        }
    }


    private async getSettings(): Promise<Settings> {
        const promise = fetch('./settings.json')
            .then(response => response.json())
            .then(data => {
                return data as Settings;
            });

        return promise;
    }

    private getTimers(settings: Settings): Timer[] {
        return settings.timers.map((timerSettings) => {
            const timer = new Timer();
            timer.setDuration(timerSettings.duration);
            timer.setOptions(timerSettings.options);
            return timer;
        });
    }
}