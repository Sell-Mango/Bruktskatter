import Svg, {Circle, Line, Path} from "react-native-svg";

export const gameIcon = ({
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
                id="Outline"
                d="M286.26,129.75C278.68,50.88,208.6-6.91,129.73.67c-23.44,2.25-45.96,10.24-65.59,23.26C28.23,47.94,4.95,86.76.68,129.75c-4.19,42.71,11.06,85.04,41.52,115.28l89.45,89.62c6.56,6.62,17.25,6.66,23.87.1.03-.03.07-.07.1-.1l89.12-89.62c30.46-30.23,45.71-72.56,41.52-115.28"
                fill={primaryColor}
            />
            <Path
                id="Center_fill"
                data-name="Center fill"
                d="M143.49,266.98c-67.62,0-122.44-54.82-122.44-122.44S75.87,22.11,143.49,22.11s122.44,54.82,122.44,122.44-54.82,122.44-122.44,122.44"
                fill={secondaryColor}
            />

            <Path
                d="M143.49,90.39c18.32.32,29.38,0,36.67,0,14.67,0,29.34,3.67,36.67,29.34,7.33,25.67,7.33,40.34,7.33,58.67s-14.67,22-29.34,22-22.4-29.34-51.34-29.34-36.67,29.34-51.34,29.34-29.34-3.67-29.34-22,0-33,7.33-58.67c7.33-25.67,22-29.34,36.67-29.34,7.29,0,18.35.32,36.67,0Z"
                fill={primaryColor}
            />
            <Circle
                cx={171.73} cy={126.51} r={12.97}
                fill={secondaryColor}
            />
            <Circle
                cx={198.96} cy={151.94} r={12.46}
                fill={secondaryColor}
            />
            <Line
                x1={86.87} y1={134.4} x2={126.76} y2={134.4}
                strokeWidth={12}
                fill={secondaryColor}
                stroke={secondaryColor}
            />
            <Line
                x1={106.82} y1={115.29} x2={106.82} y2={153.5}
                strokeWidth={12}
                fill={secondaryColor}
                stroke={secondaryColor}
            />
    </Svg>
);