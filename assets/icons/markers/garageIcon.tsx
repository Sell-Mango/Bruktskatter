import Svg, {Path, Polygon, Rect} from "react-native-svg";

export const garageIcon = ({
                          primaryColor = "#000000",
                          secondaryColor = "#ffffff",
                          size = 24,
                          ...props
                      }) => (

    <Svg
        //xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 286.94 339.64"
        width={size}
        height={size}
        {...props}
    >
        <Path
            fill={primaryColor}
            id="Outline"
            d="M286.26,129.75C278.68,50.88,208.6-6.91,129.73.67c-23.44,2.25-45.96,10.24-65.59,23.26C28.23,47.94,4.95,86.76.68,129.75c-4.19,42.71,11.06,85.04,41.52,115.28l89.45,89.62c6.56,6.62,17.25,6.66,23.87.1.03-.03.07-.07.1-.1l89.12-89.62c30.46-30.23,45.71-72.56,41.52-115.28"
        />
        <Path
            fill={secondaryColor}
            id="Center_fill"
            data-name="Center fill"
            d="M143.49,266.98c-67.62,0-122.44-54.82-122.44-122.44S75.87,22.11,143.49,22.11s122.44,54.82,122.44,122.44-54.82,122.44-122.44,122.44"
        />
        <Polygon
            points="222.5 215.06 199.92 215.06 199.92 113.45 87.02 113.45 87.02 215.06 64.44 215.06 64.44 90.87 143.47 45.71 222.5 90.87 222.5 215.06"
            fill={primaryColor}
        />
        <Rect
            x={98.31}
            y={124.74}
            width={90.32}
            height={22.58}
            fill={primaryColor}
        />
    </Svg>
);