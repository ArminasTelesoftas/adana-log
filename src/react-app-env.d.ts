/// <reference types="react-scripts" />
declare global {
    interface Window {
        api: ElectronIpi;
    }
}

export interface ElectronIpi {
    invoke(channel: string, ...args: any[]): Promise<any>;
    send(channel: string, ...args: any[]): void;

    /** @return A function that removes this listener. */
    on(channel: string, listener: (...args: any[]) => void): () => void;
}
