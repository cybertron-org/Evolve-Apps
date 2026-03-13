import * as React from "react"
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg"

function ConsultationManuSvg({ color, ...props }) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <G
        clipPath="url(#clip0_1_5642)"
        fill={color || "#0C213F"}
        stroke={color || "#0C213F"}
        strokeWidth={0.2}
      >
        <Path d="M6.52 6.38c2.017 0 3.58 1.647 3.58 3.62s-1.604 3.62-3.58 3.62A3.625 3.625 0 012.9 10a3.6 3.6 0 013.62-3.62zm0 1.24A2.393 2.393 0 004.14 10a2.394 2.394 0 002.38 2.38A2.394 2.394 0 008.9 10a2.394 2.394 0 00-2.38-2.38zM9.76 14.42a2.336 2.336 0 012.34 2.34v6.34H.9v-6.34a2.336 2.336 0 012.34-2.34h6.52zm-6.52 1.2c-.625 0-1.14.516-1.14 1.14v5.14h8.8v-5.14c0-.625-.516-1.14-1.14-1.14H3.24z" />
        <Path d="M21.52.9c.895 0 1.62.725 1.62 1.62v9a1.62 1.62 0 01-1.62 1.62h-1.528l-5.456 3.703-.156.106V13.1H10.9V11.9h4.72v2.75l3.963-2.732.025-.018h1.912c.219 0 .38-.19.38-.38v-9a.437.437 0 00-.123-.296.369.369 0 00-.258-.124h-15a.43.43 0 00-.42.42v2.62H4.9V2.52C4.9 1.625 5.625.9 6.52.9h15z" />
      </G>
      <Defs>
        <ClipPath id="clip0_1_5642">
          <Path fill="#fff" d="M0 0H24V24H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  )
}

export default ConsultationManuSvg

