//declare var require: {
//    <T>(path: string): T;
//    (paths: string[], callback: (...modules: any[]) => void): void;
//    ensure: (
//        paths: string[],
//        callback: (require: <T>(path: string) => T) => void
//    ) => void;
//};

interface AppRequire {
    <T>(path: string): T;
    (paths: string[], callback: (...modules: any[]) => void): void;
    ensure: (
        paths: string[],
        callback: (require: <T>(path: string) => T) => void
    ) => void;
}

interface NodeRequire extends AppRequire {}
