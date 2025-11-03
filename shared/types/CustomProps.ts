export type CustomTextInputProps<T> =
    {
    actionKey: keyof T;
    changeAction: <K extends keyof T>(key: K, value: keyof T[K]) => void;
    label?: string;
    secure?: boolean;
    required?: boolean;
}
    | {
    actionKey?: undefined;
    changeAction?: never;
    label?: string;
    secure?: boolean;
    required?: boolean;
};
