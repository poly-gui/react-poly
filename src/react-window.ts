import { Window } from "poly"
import type { OpaqueRoot } from "react-reconciler"

class ReactWindow extends Window {
	__react_container: OpaqueRoot
}

export { ReactWindow }
