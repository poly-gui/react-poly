import type { PolyApplication } from "@poly-gui/core"
import { Row as RpcMessageRow } from "@poly-gui/core/rpc/widget/row.np.js"
import type { Widget as RpcMessageWidget } from "@poly-gui/core/rpc/widget/widget.np.js"
import { MultiChildrenWidget } from "../widget.js"
import { Alignment, LayoutParams } from "./layout.js"
import { createReactElement } from "./react.js"

interface RowProps {
	width?: number | LayoutParams
	height?: number | LayoutParams
	horizontalAlignment?: Alignment
	verticalAlignment?: Alignment
}

class RowWidget extends MultiChildrenWidget<RowProps> {
	public width: number
	public height: number
	public horizontalAlignment: Alignment
	public verticalAlignment: Alignment

	constructor(
		context: PolyApplication,
		tag: number,
		{
			width = LayoutParams.MIN_CONTENT,
			height = LayoutParams.MIN_CONTENT,
			horizontalAlignment = Alignment.CENTER,
			verticalAlignment = Alignment.CENTER,
		}: RowProps,
	) {
		super(context, tag)
		this.width = width
		this.height = height
		this.horizontalAlignment = horizontalAlignment
		this.verticalAlignment = verticalAlignment
	}

	update({
		width = LayoutParams.MIN_CONTENT,
		height = LayoutParams.MIN_CONTENT,
		horizontalAlignment = Alignment.CENTER,
		verticalAlignment = Alignment.CENTER,
	}: RowProps): void {
		this.width = width
		this.height = height
		this.horizontalAlignment = horizontalAlignment
		this.verticalAlignment = verticalAlignment

		this.context.nativeLayer.updateWidget(this.tag, this.descriptor(), null)
	}

	descriptor(): RpcMessageWidget {
		const childrenDescriptors: RpcMessageWidget[] = []
		for (const child of this.children) {
			childrenDescriptors.push(child.descriptor())
		}
		return new RpcMessageRow(
			this.tag,
			this.width,
			this.height,
			this.horizontalAlignment,
			this.verticalAlignment,
			childrenDescriptors,
		)
	}
}

function Row(props: React.PropsWithChildren<RowProps>) {
	return createReactElement("row", props, props.children)
}

export { Row, RowWidget }
export type { RowProps }
