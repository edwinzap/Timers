var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Timer } from "./timer.js";
export class View {
    constructor() {
        this.initView();
    }
    initView() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("initView");
            const container = document.getElementById("container");
            const settings = yield this.getSettings();
            const timers = this.getTimers(settings);
            console.log(timers);
            container.append(...timers.map((timer) => timer.getElement()));
        });
    }
    getSettings() {
        return __awaiter(this, void 0, void 0, function* () {
            const promise = fetch('./settings.json')
                .then(response => response.json())
                .then(data => {
                console.log(data);
                return data;
            });
            return promise;
        });
    }
    getTimers(settings) {
        return settings.timers.map((timerSettings) => {
            const timer = new Timer();
            timer.setDuration(timerSettings.duration);
            timer.setOptions(timerSettings.options);
            return timer;
        });
    }
}
