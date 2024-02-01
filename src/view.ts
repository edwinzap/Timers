import { Timer } from "./timer.js";
import { Settings } from "./settings.js";

export class View {

    public constructor() {
        this.initView();
    }

    public async initView() {
        console.log("initView");
        const container = document.getElementById("container") as HTMLDivElement;
        const settings = await this.getSettings();
        const timers = this.getTimers(settings);
        console.log(timers);
        container.append(...timers.map((timer) => timer.getElement()));
    }

    private async getSettings(): Promise<Settings> {
        const promise = fetch('./settings.json')
            .then(response => response.json())
            .then(data => {
                console.log(data);
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