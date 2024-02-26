import { Tools } from "./tools.js";

export class TimerView {
    private container: HTMLDivElement;
    private text: HTMLSpanElement;
    private optionsContainer: HTMLDivElement;
    private startButton: HTMLButtonElement;
    private resetButton: HTMLButtonElement;
    private options: number[];
    private title: string | null;

    public startButtonHandler: (() => void) | null;
    public resetButtonHandler: (() => void) | null;
    public addTimeButtonHandler: ((seconds: number) => void) | null;

    public constructor() {
        this.options = [];
        this.initView();
    }

    public setRemainingTime(seconds: number) {
        this.text.textContent = Tools.secondsToText(seconds);
    }

    public setIsStarted(isStarted: boolean) {
        if (isStarted) {
            this.startButton.textContent = "Arrêter";
        }
        else {
            this.startButton.textContent = "Démarrer";
        }
    }

    public setSettings(options: number[], title: string | null) {
        this.options = options;
        this.title = title;
        this.initView();
    }

    public getElement(): HTMLDivElement {
        return this.container;
    }

    private onClickStartButton() {
        if (this.startButtonHandler !== null) {
            this.startButtonHandler();
        }
    }

    private onClickResetButton() {
        if (this.resetButtonHandler !== null) {
            this.resetButtonHandler();
        }
    }

    private onClickOptionButton(option: number) {
        if (this.addTimeButtonHandler !== null) {
            this.addTimeButtonHandler(option);
        }
    }

    private initView() {
        if (this.container) {
            this.container.innerHTML = "";
        }
        else {
            this.container = document.createElement('div');
            this.container.classList.add('timer');
        }

        if (this.title) {
            const title = document.createElement('h2');
            title.textContent = this.title;
            this.container.appendChild(title);
        }

        const timerBox = document.createElement('div');
        timerBox.classList.add('timer-box')
        this.container.appendChild(timerBox);

        this.text = document.createElement('div');
        this.text.classList.add('text');
        timerBox.appendChild(this.text);

        this.startButton = document.createElement('button');
        this.startButton.textContent = 'Démarrer';
        this.startButton.addEventListener('click', () => this.onClickStartButton());

        this.resetButton = document.createElement('button');
        this.resetButton.textContent = 'Réinitialiser';
        this.resetButton.addEventListener('click', () => this.onClickResetButton());

        const controlsContainer = document.createElement('div');
        controlsContainer.classList.add('controls');

        const controls = [this.startButton, this.resetButton];
        for (const control of controls) {
            const div = document.createElement('div');
            div.classList.add('control');
            div.appendChild(control);
            controlsContainer.appendChild(div);
        }
        timerBox.appendChild(controlsContainer);

        this.optionsContainer = document.createElement('div');
        this.optionsContainer.classList.add('options');
        timerBox.appendChild(this.optionsContainer);

        this.addOptions();
    }

    private addOptions() {
        this.optionsContainer.innerHTML = "";

        for (const option of this.options) {
            const createButtonOptions = [{ class: "add", coef: 1, sign: "+" }, { class: "substract", coef: -1, "sign": "-" }];

            const container = document.createElement('div');
            container.classList.add('option');

            for (const createButtonOption of createButtonOptions) {

                const button = document.createElement('button');
                button.classList.add(createButtonOption.class);
                button.textContent = createButtonOption.sign;
                button.addEventListener('click', () => this.onClickOptionButton(option * createButtonOption.coef));
                container.appendChild(button);
            }

            let unit = "s"
            let value = option;

            if (option >= 60 && option % 60 == 0) {
                unit = "m"
                value = option / 60;
            }
            const text = value + unit;
            const textElement = document.createElement('span');
            textElement.textContent = text;
            container.insertBefore(textElement, container.lastChild);

            this.optionsContainer.appendChild(container);
        }
    }

    private pad(number: number) {
        return number < 10 ? '0' + number : number;
    }
}