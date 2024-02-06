import { Settings } from "./settings.js";
import { TimerController } from "./timer-controller.js";
import { Observer, Subject, TimerMessage } from "./interfaces.js";

export class View implements Observer{
    private timers: TimerController[];
    private simpleViewChannel: BroadcastChannel;

    public constructor() {
        this.initView();
    }

    public async initView() {
        const container = document.getElementById("container") as HTMLDivElement;
        const simpleViewButton = document.createElement("button");
        simpleViewButton.textContent = "Vue simplifiée";
        simpleViewButton.onclick = () => {
            window.open("/view.html");
        }
        document.body.insertBefore(simpleViewButton, container);

        const settings = await this.getSettings();
        this.timers = this.getTimers(settings);
        container.append(...this.timers.map((timer) => timer.getViewHtml()));

        this.simpleViewChannel = new BroadcastChannel('simpleview_channel');

        this.simpleViewChannel.addEventListener("message", (event) => {
            if(event.data === "init") {
                this.timers.forEach(timer => {
                    this.sendTimerMessageToSimpleViewChannel(timer);    
                });
            }
        });
    }

    private async getSettings(): Promise<Settings> {
        const promise = fetch('./settings.json')
            .then(response => response.json())
            .then(data => {
                return data as Settings;
            });

        return promise;
    }

    private getTimers(settings: Settings): TimerController[] {
        return settings.timers.map((timerSettings) => {
            const timerController = new TimerController(timerSettings);
            timerController.attach(this);
            return timerController;
        });
    }

    private sendTimerMessageToSimpleViewChannel(timer:TimerController) {
        const id = this.timers.indexOf(timer);
        const message:TimerMessage =  new TimerMessage(
            id,
            timer.getRemainingTime(),
            timer.getIsStarted()
        );

        this.simpleViewChannel.postMessage(message);
    }

    update(subject: Subject): void {
        this.sendTimerMessageToSimpleViewChannel(subject as TimerController);
    }
}