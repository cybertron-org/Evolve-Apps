import * as React from "react"
import Svg, { Path } from "react-native-svg"

function ProfileManuSvg({ color, ...props }) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <Path
        d="M12 10a4 4 0 100-8 4 4 0 000 8z"
        stroke={color || "#0C213F"}
        strokeWidth={1.5}
      />
      <Path
        d="M19.998 18l.002-.5c0-2.485-3.582-4.5-8-4.5s-8 2.015-8 4.5S4 22 12 22c2.231 0 3.84-.157 5-.437"
        stroke={color || "#0C213F"}
        strokeWidth={1.5}
        strokeLinecap="round"
      />
    </Svg>
  )
}

export default ProfileManuSvg
