import {ReactNode} from "react";

export interface tabsOptions {
    headerRight: () => ReactNode,
    headerTitle: string,
    headerLeft: () => ReactNode,
    title: string,
}