import { Colors } from "@/constants/theme";
import Svg, { Circle, Path, Rect } from "react-native-svg";

export interface TabIconProps {
  color?: string;
  focused?: boolean;
  size?: number;
}

/**
 * Embedded SVG Data URIs so NativeTabs.Trigger.Icon `src` works immediately
 * without requiring external .png files.
 */
export const TAB_SVG_SOURCES = {
  home: {
    uri: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M4 10.5L12 3.5L20 10.5V20H4V10.5Z" fill="%23F7BE38" stroke="%23141414" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M9.5 20V14H14.5V20" fill="%23FFFFFF" stroke="%23141414" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  },
  discover: {
    uri: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><circle cx="11" cy="11" r="7" stroke="%23141414" stroke-width="1.9"/><path d="M16.2 16.2L20.5 20.5" stroke="%23141414" stroke-width="1.9" stroke-linecap="round"/></svg>`,
  },
  orders: {
    uri: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><rect x="4" y="8" width="10" height="12" rx="2" stroke="%23141414" stroke-width="1.8"/><path d="M7 8V6.5C7 5.39543 7.89543 4.5 9 4.5C10.1046 4.5 11 5.39543 11 6.5V8" stroke="%23141414" stroke-width="1.8"/><path d="M14 7H18C19.1046 7 20 7.89543 20 9V17C20 18.1046 19.1046 19 18 19H14" stroke="%23141414" stroke-width="1.8"/></svg>`,
  },
  settings: {
    uri: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="8" r="3.6" stroke="%23141414" stroke-width="1.9"/><path d="M5 19.5C5.8 16.2 8.5 14.5 12 14.5C15.5 14.5 18.2 16.2 19 19.5" stroke="%23141414" stroke-width="1.9" stroke-linecap="round"/></svg>`,
  },
};

export function HomeTabSvg({
  color = Colors.light.text,
  focused = false,
  size = 20,
}: TabIconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M4 10.5L12 3.5L20 10.5V20H4V10.5Z"
        fill={focused ? Colors.light.primary : "none"}
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M9.5 20V14H14.5V20"
        fill={focused ? Colors.light.background : "none"}
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function DiscoverTabSvg({
  color = Colors.light.text,
  size = 20,
}: TabIconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle cx={11} cy={11} r={7} stroke={color} strokeWidth={1.9} />
      <Path
        d="M16.2 16.2L20.5 20.5"
        stroke={color}
        strokeWidth={1.9}
        strokeLinecap="round"
      />
    </Svg>
  );
}

export function OrdersTabSvg({
  color = Colors.light.text,
  size = 20,
}: TabIconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Rect
        x={4}
        y={8}
        width={10}
        height={12}
        rx={2}
        stroke={color}
        strokeWidth={1.8}
      />
      <Path
        d="M7 8V6.5C7 5.39543 7.89543 4.5 9 4.5C10.1046 4.5 11 5.39543 11 6.5V8"
        stroke={color}
        strokeWidth={1.8}
      />
      <Path
        d="M14 7H18C19.1046 7 20 7.89543 20 9V17C20 18.1046 19.1046 19 18 19H14"
        stroke={color}
        strokeWidth={1.8}
      />
    </Svg>
  );
}

export function SettingsTabSvg({
  color = Colors.light.text,
  size = 20,
}: TabIconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle cx={12} cy={8} r={3.6} stroke={color} strokeWidth={1.9} />
      <Path
        d="M5 19.5C5.8 16.2 8.5 14.5 12 14.5C15.5 14.5 18.2 16.2 19 19.5"
        stroke={color}
        strokeWidth={1.9}
        strokeLinecap="round"
      />
    </Svg>
  );
}
