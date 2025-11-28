import {ViewStyle} from "react-native";

export type CustomTextInputProps<T> =
    {
    actionKey: keyof T;
    changeAction: <K extends keyof T>(key: K, value: keyof T[K]) => void;
    label?: string;
    secure?: boolean;
    required?: boolean;
    placeholder?: string;
    placeholderTextColor?: string;
    hideIconOnWriting?: boolean;
    containerStyles?: ViewStyle;
    inputStyles?: ViewStyle;
    leftIcon?: React.ReactNode;
    formData?: Partial<T>
}
    | {
    actionKey?: undefined;
    changeAction?: never;
    label?: string;
    secure?: boolean;
    placeholder?: string;
    placeholderTextColor?: string;
    hideIconOnWriting?: boolean;
    required?: boolean;
    containerStyles?: ViewStyle;
    inputStyles?: ViewStyle;
    leftIcon?: React.ReactNode;
    formData?: Partial<T>
};
