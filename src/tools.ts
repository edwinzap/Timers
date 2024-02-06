export abstract class Tools {
    public static secondsToText(seconds: number) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        const timerText = (`${this.pad(minutes)}:${this.pad(remainingSeconds)}`);
        return timerText;
    }

    public static pad(number: number) {
        return number < 10 ? '0' + number : number;
    }
}