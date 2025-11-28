import * as React from "react";
import Svg, { Path } from "react-native-svg";
const CloseIcon = ({size = 24, color = "currentColor", ...props}) => (
    <Svg
        //xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        color={color}
        viewBox="0 0 24 24"
        {...props}
    >
        <Path
            fill="currentColor"
            d="m12 13.4l-4.9 4.9q-.275.275-.7.275t-.7-.275t-.275-.7t.275-.7l4.9-4.9l-4.9-4.9q-.275-.275-.275-.7t.275-.7t.7-.275t.7.275l4.9 4.9l4.9-4.9q.275-.275.7-.275t.7.275t.275.7t-.275.7L13.4 12l4.9 4.9q.275.275.275.7t-.275.7t-.7.275t-.7-.275z"
        />
    </Svg>
);
export default CloseIcon;
