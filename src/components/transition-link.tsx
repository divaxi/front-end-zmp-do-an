import { NavLink, NavLinkProps } from "react-router-dom";

/**
 * Wrapper component for view transition enabled Links, to stabilize the API.
 * @param props
 * @returns
 */
export default function TransitionLink(props: NavLinkProps) {
  return <NavLink {...props} />;
}
