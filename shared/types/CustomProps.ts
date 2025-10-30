export interface CustomTextInputProps {
    label?: string;
    secure?: boolean;
    required?: boolean;
    changeAction: (key:string,value:string) => void;
    actionKey: string;
}