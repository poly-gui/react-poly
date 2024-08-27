import { RpcMessageCenter, type RpcMessageWidget } from "poly/rpc"
import { SingleChildWidget } from "../widget"
import { createReactElement } from "./react"

class CenterWidget extends SingleChildWidget<Record<string, never>> {
	update(props: Record<string, never>): void {}

	descriptor(): RpcMessageWidget {
		if (!this.child) {
			throw new Error("Center must have exactly one child, but none provided.")
		}
		return new RpcMessageCenter(this.tag, this.child.descriptor())
	}
}

function Center({ children }: React.PropsWithChildren<Record<string, never>>) {
	return createReactElement("center", {}, children)
}

export { Center, CenterWidget }
