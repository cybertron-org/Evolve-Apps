import * as React from "react"
import Svg, { Path } from "react-native-svg"

function MessageSvg(props) {
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
        d="M3.444 6.027v13.775a1.722 1.722 0 001.721 1.721h17.22a1.722 1.722 0 001.721-1.721V6.027H3.444zm0-1.722h20.662a1.722 1.722 0 011.722 1.722v13.775a3.444 3.444 0 01-3.444 3.443H5.165a3.444 3.444 0 01-3.443-3.443V6.027a1.722 1.722 0 011.722-1.722z"
        fill={color}
      />
      <Path
        d="M24.322 6.027l-6.659 7.61a5.165 5.165 0 01-7.776 0l-6.658-7.61h21.093zm-18.805 0l5.665 6.476a3.442 3.442 0 005.184 0l5.667-6.476H5.517z"
        fill={color}
      />
    </Svg>
  )
}

export default MessageSvg