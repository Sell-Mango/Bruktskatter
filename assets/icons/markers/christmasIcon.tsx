import Svg, {Line, Path} from "react-native-svg";

export const christmasIcon = ({
                          primaryColor = "#000000",
                          secondaryColor = "#ffffff",
                          size = 24,
                          ...props
                      }) => (

    <Svg
        //xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 286.94 339.64"
        height={size}
        width={size}
        {...props}
    >
        <Path
            id="Outline"
            fill={primaryColor}
            d="M286.26,129.75C278.68,50.88,208.6-6.91,129.73.67c-23.44,2.25-45.96,10.24-65.59,23.26C28.23,47.94,4.95,86.76.68,129.75c-4.19,42.71,11.06,85.04,41.52,115.28l89.45,89.62c6.56,6.62,17.25,6.66,23.87.1.03-.03.07-.07.1-.1l89.12-89.62c30.46-30.23,45.71-72.56,41.52-115.28"
        />
        <Path
            id="Center_fill"
            data-name="Center fill"
            fill={secondaryColor}
            d="M143.49,266.98c-67.62,0-122.44-54.82-122.44-122.44S75.87,22.11,143.49,22.11s122.44,54.82,122.44,122.44-54.82,122.44-122.44,122.44"
        />
        <Path
            d="M127.71,101.07l-15.76-7.88,31.51-31.51,31.51,31.51-15.76,7.88,31.51,31.51-23.64,7.88,35.45,39.39h-118.18l31.51-39.39-19.7-7.88,31.51-31.51Z"
            fill={primaryColor}
        />
        <Line
            x1={171.05} y1={219.25} x2={115.9} y2={219.25}
            stroke={primaryColor}
            strokeWidth={12}
        />
        <Line
            x1={131.65} y1={179.85} x2={127.71} y2={219.25}
            stroke={primaryColor}
            strokeWidth={12}
        />
        <Line
            x1={155.29} y1={179.85} x2={159.23} y2={219.25}
            stroke={primaryColor}
            strokeWidth={12}
        />
    </Svg>
);