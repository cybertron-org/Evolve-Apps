import * as React from "react"
import Svg, { Path } from "react-native-svg"

function HistorySvg(props) {
  const { color = "#5A5A5A", ...rest } = props;
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={28}
      height={28}
      viewBox="0 0 28 28"
      fill="none"
      {...rest}
    >
      <Path
        d="M13.775 24.106c5.706 0 10.331-4.625 10.331-10.33 0-5.707-4.625-10.332-10.33-10.332-5.707 0-10.332 4.625-10.332 10.331 0 5.706 4.625 10.331 10.331 10.331z"
        stroke={color}
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M12.627 9.183v5.74h5.74"
        stroke={color}
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default HistorySvg