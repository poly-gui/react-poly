import type { PolyApplication } from "poly"
import type { RpcMessageWidget } from "poly/rpc"
import { LinkedList } from "./util/linked-list.js"

interface WidgetProps {
	tag: number
}

abstract class Widget<TProps = unknown> {
	constructor(
		public readonly context: PolyApplication,
		public readonly tag: number,
	) {}

	abstract update(props: TProps): void

	abstract descriptor(): RpcMessageWidget
}

abstract class SingleChildWidget<
	TProps = unknown,
	TChild extends Widget = Widget,
> extends Widget<TProps> {
	public child: TChild | null = null

	abstract removeChild(child: TChild): void
}

abstract class MultiChildrenWidget<TProps = unknown> extends Widget<TProps> {
	public children = new LinkedList<Widget>()

	public appendChild(child: Widget) {
		this.children.append(child)
		this.context.nativeLayer.appendNewWidget(child.descriptor(), this.tag)
	}

	public insertChildBefore(child: Widget, beforeChild: Widget) {
		const insertedIndex = this.children.insertBefore(beforeChild, child)
		if (insertedIndex >= 0) {
		}
	}
}

export { Widget, SingleChildWidget, MultiChildrenWidget }
export type { WidgetProps }
