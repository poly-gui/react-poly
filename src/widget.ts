import type { PolyApplication } from "poly"
import type { RpcMessageWidget } from "poly/rpc"

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
}

export { Widget, SingleChildWidget }
export type { WidgetProps }
