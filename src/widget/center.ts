import React from "react"
import { Center as RpcMessageCenter } from "@poly-gui/core/rpc/widget/center.np.js"
import type { Widget as RpcMessageWidget } from "@poly-gui/core/rpc/widget/widget.np.js"
import { SingleChildWidget, type Widget } from "../widget.js"

interface CenterProps extends React.PropsWithChildren {}

class CenterWidget extends SingleChildWidget<Record<string, never>> {
	update(props: Record<string, never>): void {}

	public descriptor(): RpcMessageWidget {
		if (!this.child) {
			throw new Error("Center must have exactly one child, but none provided.")
		}
		return new RpcMessageCenter(this.tag, this.child.descriptor())
	}

	public removeChild(child: Widget<unknown>): void {
		this.context.nativeLayer.removeWidget(child.tag)
	}
}

function Center(props: CenterProps) {
	return React.createElement("center", null, props.children)
}

export { Center, CenterWidget }
export type { CenterProps }
