import Svg, {Line, Path, Rect} from "react-native-svg";

export const boothIcon = ({
                          primaryColor = "#000000",
                          secondaryColor = "#ffffff",
                          size = 24,
                          ...props
                      }) => (

    <Svg
        //xmlns="http://www.w3.org/2000/svg"
        height={size}
        width={size}
        viewBox="0 0 286.94 339.64"
        {...props}
    >
            <Path
                fill={primaryColor}
                id="Outline"
                d="M286.26,129.75C278.68,50.88,208.6-6.91,129.73.67c-23.44,2.25-45.96,10.24-65.59,23.26C28.23,47.94,4.95,86.76.68,129.75c-4.19,42.71,11.06,85.04,41.52,115.28l89.45,89.62c6.56,6.62,17.25,6.66,23.87.1.03-.03.07-.07.1-.1l89.12-89.62c30.46-30.23,45.71-72.56,41.52-115.28"
            />
            <Path
                fill={secondaryColor}
                d="M143.49,266.98c-67.62,0-122.44-54.82-122.44-122.44S75.87,22.11,143.49,22.11s122.44,54.82,122.44,122.44-54.82,122.44-122.44,122.44"
            />
            <Path
                d="M70.78,75.48h145.4v29.08l-5.08,3.05c-8.06,4.84-18.13,4.84-26.18,0l-5.09-3.05-5.08,3.05c-8.06,4.84-18.13,4.84-26.18,0l-5.09-3.05-5.08,3.05c-8.06,4.84-18.13,4.84-26.18,0l-5.09-3.05-5.09,3.05c-8.06,4.83-18.12,4.83-26.18,0l-5.09-3.05v-29.08Z"
                fill={primaryColor}
            />
            <Rect
                stroke={primaryColor}
                fill={primaryColor}
                x={78.05}
                y={148.18}
                width={130.86}
                height={65.43}
            />
            <Line
                x1={88.96}
                y1={115.47}
                x2={88.96}
                y2={148.18}
                stroke={primaryColor}
                fill={primaryColor}
                strokeWidth={8}
            />
            <Line
                stroke={primaryColor}
                fill={primaryColor}
                x1={198.01}
                y1={115.47}
                x2={198.01}
                y2={148.18}
                strokeWidth={8}
            />
    </Svg>
);