import { RpcMessageColumn, type RpcMessageWidget } from "poly/rpc"
import { MultiChildrenWidget } from "../widget.js"
import { Alignment, LayoutParams } from "./layout.js"
import type { PolyApplication } from "poly"
import { createReactElement } from "./react.js"

interface ColumnProps {
	width?: number | LayoutParams
	height?: number | LayoutParams
	horizontalAlignment?: Alignment
	verticalAlignment?: Alignment
}

class ColumnWidget extends MultiChildrenWidget<ColumnProps> {
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
		}: ColumnProps,
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
	}: ColumnProps): void {
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
		return new RpcMessageColumn(
			this.tag,
			this.width,
			this.height,
			this.horizontalAlignment,
			this.verticalAlignment,
			childrenDescriptors,
		)
	}
}

function Column(props: React.PropsWithChildren<ColumnProps>) {
	return createReactElement("column", props, props.children)
}

export { Column, ColumnWidget }
export type { ColumnProps }
