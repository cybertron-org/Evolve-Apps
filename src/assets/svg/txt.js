import * as React from "react"
import Svg, { Path } from "react-native-svg"

function TxtSvg(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={29}
      height={32}
      viewBox="0 0 29 32"
      fill="none"
      {...props}
    >
      <Path
        d="M3.997 11.667V1h19.336L28 5.667v24.666H2.667M21.333 1v6.667H28m-28 8h6.667m-3.334 0V25m15.334-9.333h6.666m-3.333 0V25m-5.333-10l-8 9.333m0-9.333l8 9.333"
        stroke="#60889B"
        strokeWidth={2}
      />
    </Svg>
  )
}

export default TxtSvg
