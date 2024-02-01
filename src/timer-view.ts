export class TimerView {
    private element: HTMLDivElement;
    private text: HTMLSpanElement;
    private optionsDiv: HTMLDivElement;
    private startButton: HTMLButtonElement;
    private resetButton: HTMLButtonElement;
    private options: number[];

    public startButtonHandler: (() => void) | null;
    public resetButtonHandler: (() => void) | null;
    public addTimeButtonHandler: ((seconds: number) => void) | null;

    public constructor() {
        this.options = [];
        this.initView();
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
        this.element = document.createElement('div');
        this.element.classList.add('timer');
        this.text = document.createElement('div');
        this.text.classList.add('text');
        this.element.appendChild(this.text);

        this.startButton = document.createElement('button');
        this.startButton.textContent = "Démarrer";
        this.startButton.addEventListener('click', () => this.onClickStartButton());

        this.resetButton = document.createElement('button');
        this.resetButton.textContent = "Réinitialiser";
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
        this.element.appendChild(controlsContainer);

        this.optionsDiv = document.createElement('div');
        this.optionsDiv.classList.add('options');
        this.element.appendChild(this.optionsDiv);
    }

    private updateView() {
        this.addOptions();
    }

    public getElement(): HTMLDivElement {
        return this.element;
    }

    private addOptions() {
        this.optionsDiv.innerHTML = "";

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

            this.optionsDiv.appendChild(container);
        }
    }

    public setRemainingTime(seconds: number) {
        console.log("Remaining time " + seconds);
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        const timerText = (`${this.pad(minutes)}:${this.pad(remainingSeconds)}`);
        this.text.textContent = timerText;
    }

    public setIsStarted(isStarted: boolean) {
        if (isStarted) {
            this.startButton.textContent = "Arrêter";
        }
        else {
            this.startButton.textContent = "Démarrer";
        }
    }

    public setOptions(options: number[]) {
        this.options = options;
        this.updateView();
    }


    private pad(number: number) {
        return number < 10 ? '0' + number : number;
    }
}