import * as React from "react"
import Svg, { Path } from "react-native-svg"

function ServicesSvg(props) {
  const { color = "#5C8499", ...rest } = props;
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
        d="M25.582 12.791h-7.871a.984.984 0 00-.984.984v11.807a.984.984 0 00.984.984h7.871a.983.983 0 00.984-.984V13.775a.984.984 0 00-.984-.984zm0-11.807h-7.871a.984.984 0 00-.984.984v3.955a.984.984 0 00.984.984h7.871a.984.984 0 00.984-.984V1.968a.984.984 0 00-.984-.984zM9.84.984H1.968a.984.984 0 00-.984.984v11.807a.984.984 0 00.984.984h7.871a.984.984 0 00.984-.984V1.968A.984.984 0 009.84.984zm0 19.659H1.968a.984.984 0 00-.984.984v3.955a.984.984 0 00.984.984h7.871a.984.984 0 00.984-.984v-3.955a.984.984 0 00-.984-.984z"
        fill={color}
      />
    </Svg>
  )
}

export default ServicesSvg