type colorProps = 'red' | 'green' | 'blue' | 'magenta' | 'gray';

class Logger {
    private static withAttrs(color: colorProps, isBold: boolean): string {
        let res = `color: ${color};`;
        if (isBold) {
            res += 'font-weight: bold;';
        }
        return res;
    }

    static debug(s: string): void {
        console.log(`%c${s}`, this.withAttrs('gray', false));
    }

    static info(s: string): void {
        console.log(`%c${s}`, this.withAttrs('blue', false));
    }

    static success(s: string): void {
        console.log(`%c${s}`, this.withAttrs('green', false));
    }

    static warn(s: string): void {
        console.log(`%c${s}`, this.withAttrs('red', true));
    }

    static panic(s: string): void {
        console.log(`%c${s}`, this.withAttrs('magenta', true));
    }
}

export default Logger;
