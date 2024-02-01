export class TimerView {
    constructor() {
        this.options = [];
        this.initView();
    }
    onClickStartButton() {
        if (this.startButtonHandler !== null) {
            this.startButtonHandler();
        }
    }
    onClickResetButton() {
        if (this.resetButtonHandler !== null) {
            this.resetButtonHandler();
        }
    }
    onClickOptionButton(option) {
        if (this.addTimeButtonHandler !== null) {
            this.addTimeButtonHandler(option);
        }
    }
    initView() {
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
    updateView() {
        this.addOptions();
    }
    getElement() {
        return this.element;
    }
    addOptions() {
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
            let unit = "s";
            let value = option;
            if (option >= 60 && option % 60 == 0) {
                unit = "m";
                value = option / 60;
            }
            const text = value + unit;
            const textElement = document.createElement('span');
            textElement.textContent = text;
            container.insertBefore(textElement, container.lastChild);
            this.optionsDiv.appendChild(container);
        }
    }
    setRemainingTime(seconds) {
        console.log("Remaining time " + seconds);
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        const timerText = (`${this.pad(minutes)}:${this.pad(remainingSeconds)}`);
        this.text.textContent = timerText;
    }
    setIsStarted(isStarted) {
        if (isStarted) {
            this.startButton.textContent = "Arrêter";
        }
        else {
            this.startButton.textContent = "Démarrer";
        }
    }
    setOptions(options) {
        this.options = options;
        this.updateView();
    }
    pad(number) {
        return number < 10 ? '0' + number : number;
    }
}
