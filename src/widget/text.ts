import type { PolyApplication } from "@poly-gui/core"
import { Text as RpcMessageText } from "@poly-gui/core/rpc/widget/text.np.js"
import { FontStyle as RpcMessageFontStyle } from "@poly-gui/core/rpc/widget/font-style.np.js"
import type { Widget as RpcMessageWidget } from "@poly-gui/core/rpc/widget/widget.np.js"
import { Widget } from "../widget.js"
import type { FontStyle } from "./font-style.js"
import { createReactElement } from "./react.js"

interface TextProps {
	content: string
	fontStyle?: FontStyle
}

class TextWidget extends Widget<TextProps> {
	public content: string
	public fontStyle: FontStyle

	constructor(
		context: PolyApplication,
		tag: number,
		{ content, fontStyle }: TextProps,
	) {
		super(context, tag)
		this.content = content
		this.fontStyle = fontStyle ?? {
			family: "",
			size: 12,
			weight: 400,
		}
	}

	public update({ content }: TextProps): void {
		this.content = content
		this.context.nativeLayer.updateWidget(this.tag, this.descriptor(), null)
	}

	public descriptor(): RpcMessageWidget {
		const style = new RpcMessageFontStyle(
			this.fontStyle.family,
			this.fontStyle.weight,
			this.fontStyle.size,
		)
		return new RpcMessageText(this.tag, this.content, style)
	}
}

function Text(props: TextProps) {
	return createReactElement("text", props)
}

export { Text, TextWidget }
export type { TextProps }
