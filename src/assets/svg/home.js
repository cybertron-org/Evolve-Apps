import * as React from "react"
import Svg, { Path } from "react-native-svg"

function HomeSvg(props) {
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
        d="M11.731 3.87c1.054-.846 2.727-.897 3.876-.148l.222.162 7.517 6.012c.378.31.721.81.947 1.4.226.593.304 1.2.23 1.684l-1.444 8.64c-.259 1.49-1.726 2.731-3.223 2.731H7.69c-1.521 0-2.951-1.208-3.21-2.718l-1.446-8.65v-.003l-.024-.187c-.039-.45.041-.979.238-1.495.225-.59.574-1.09.963-1.4l.002-.002L11.73 3.87h.001zm2.042 11.586c-.967 0-1.76.793-1.76 1.76v3.444c0 .968.793 1.76 1.76 1.76.968 0 1.761-.792 1.761-1.76v-3.443c0-.907-.697-1.66-1.58-1.751l-.18-.01z"
        stroke={color}
        strokeWidth={1.8}
      />
    </Svg>
  )
}

export default HomeSvg