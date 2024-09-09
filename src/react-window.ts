import { Window } from "@poly-gui/core"
import type { OpaqueRoot } from "react-reconciler"

class ReactWindow extends Window {
	__react_container: OpaqueRoot
}

export { ReactWindow }
