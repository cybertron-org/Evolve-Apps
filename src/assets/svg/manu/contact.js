import * as React from "react"
import Svg, { Path } from "react-native-svg"

function ContactManuSvg({ color, ...props }) {
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
        d="M4.5 6H2m2.5 6H2m2.5 6H2m2.5-8c0-3.771 0-5.657 1.172-6.828C6.844 2.001 8.729 2 12.5 2H14c3.771 0 5.657 0 6.828 1.172C21.999 4.344 22 6.229 22 10v4c0 3.771 0 5.657-1.172 6.828C19.656 21.999 17.771 22 14 22h-1.5c-3.771 0-5.657 0-6.828-1.172C4.501 19.656 4.5 17.771 4.5 14v-4z"
        stroke={color || "#2B3D57"}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M15.275 8.493a2 2 0 11-4 0 2 2 0 014 0zM9.32 15.716c1.058-1.63 2.739-2.24 3.955-2.239 1.216.001 2.847.61 3.906 2.24a.33.33 0 01.025.344c-.247.439-1.016 1.31-1.57 1.369-.638.067-2.307.077-2.36.077-.053 0-1.773-.01-2.41-.077-.556-.06-1.324-.93-1.572-1.37-.061-.109-.043-.238.026-.344z"
        stroke={color || "#2B3D57"}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default ContactManuSvg
