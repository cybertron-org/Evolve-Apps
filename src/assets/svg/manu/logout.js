import * as React from "react"
import Svg, { Path } from "react-native-svg"

function LogoutManuSvg({ color, ...props }) {
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
        d="M2.5 12c0-4.478 0-6.718 1.391-8.109S7.521 2.5 12 2.5c4.478 0 6.718 0 8.109 1.391S21.5 7.521 21.5 12c0 4.478 0 6.718-1.391 8.109S16.479 21.5 12 21.5c-4.478 0-6.718 0-8.109-1.391S2.5 16.479 2.5 12z"
        stroke={color || "#2B3D57"}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M7.037 12.028h6.976m0 0c0 .57-2.155 2.487-2.155 2.487m2.155-2.487c0-.586-2.155-2.465-2.155-2.465m5.18-1.568v8"
        stroke={color || "#2B3D57"}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default LogoutManuSvg
