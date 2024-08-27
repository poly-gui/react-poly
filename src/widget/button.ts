import React from "react"
import type { PolyApplication, CallbackHandle } from "poly"
import { RpcMessageButton, type RpcMessageWidget } from "poly/rpc"
import { Widget } from "../widget"
import { createReactElement } from "./react"

type ButtonOnClickCallback = () => void

interface ButtonProps {
	label: string
	onClick: ButtonOnClickCallback
}

class ButtonWidget extends Widget<ButtonProps> {
	public label: string
	public onClick: ButtonOnClickCallback

	private readonly onClickHandle: CallbackHandle

	constructor(
		context: PolyApplication,
		tag: number,
		{ label, onClick }: ButtonProps,
	) {
		super(context, tag)
		this.label = label
		this.onClick = onClick
		this.onClickHandle = context.callbackRegistry.newVoidCallback(onClick)
	}

	public update(props: ButtonProps) {
		this.label = props.label
		this.onClick = props.onClick
		this.context.nativeLayer.updateWidget(this.tag, this.descriptor(), null)
	}

	public descriptor(): RpcMessageWidget {
		return new RpcMessageButton(this.tag, this.label, this.onClickHandle)
	}
}

function Button(props: ButtonProps) {
	return createReactElement("button", props)
}

export { Button, ButtonWidget }
export type { ButtonProps, ButtonOnClickCallback }
