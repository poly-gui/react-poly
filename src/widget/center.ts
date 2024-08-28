import React from "react"
import { RpcMessageCenter, type RpcMessageWidget } from "poly/rpc"
import { SingleChildWidget } from "../widget.js"

interface CenterProps extends React.PropsWithChildren {}

class CenterWidget extends SingleChildWidget<Record<string, never>> {
	update(props: Record<string, never>): void {}

	descriptor(): RpcMessageWidget {
		if (!this.child) {
			throw new Error("Center must have exactly one child, but none provided.")
		}
		return new RpcMessageCenter(this.tag, this.child.descriptor())
	}
}

function Center(props: CenterProps) {
	return React.createElement("center", null, props.children)
}

export { Center, CenterWidget }
export type { CenterProps }
