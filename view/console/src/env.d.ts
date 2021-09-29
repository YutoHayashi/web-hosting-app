interface ImportMetaEnv extends Readonly<Record<string, string>> {
    readonly VITE_SERVER_NAME: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}
