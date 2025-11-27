import * as React from "react";
import Svg, { Path } from "react-native-svg";
const AccordionDown = (props:any) => (
    <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={24}
        height={24}
        viewBox="0 0 24 24"
        {...props}
    >
        <Path
            fill="currentColor"
            d="M16.59 8.59L12 13.17L7.41 8.59L6 10l6 6l6-6z"
        />
    </Svg>
);

const AccordionUp = (props:any) => (
    <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={24}
        height={24}
        viewBox="0 0 24 24"
        {...props}
    >
        <Path
            fill="currentColor"
            d="m12 8l-6 6l1.41 1.41L12 10.83l4.59 4.58L18 14z"
        />
    </Svg>
);

export { AccordionDown, AccordionUp };