/// <reference types="node" />
declare type TelemetryEvent = {
    eventName: string;
    payload: object;
};
declare type RecordObject = {
    isFulfilled: boolean;
    isRejected: boolean;
    value?: any;
    reason?: any;
};
export declare class Telemetry {
    private conf;
    private sessionId;
    private rawProjectId;
    private queue;
    constructor({ distDir }: {
        distDir: string;
    });
    private notify;
    get anonymousId(): string;
    get salt(): string;
    private get isDisabled();
    setEnabled: (_enabled: boolean) => void;
    get isEnabled(): boolean;
    oneWayHash: (payload: string | DataView | Int8Array | Uint8Array | Uint8ClampedArray | Int16Array | Uint16Array | Int32Array | Uint32Array | Float32Array | Float64Array | Buffer) => string;
    private get projectId();
    record: (_events: TelemetryEvent | TelemetryEvent[]) => Promise<RecordObject>;
    flush: () => Promise<RecordObject[] | null>;
    private submitRecord;
}
export {};
