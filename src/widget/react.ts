import React, { type Attributes } from "react"
import type { WidgetType } from "./types.js"

function createReactElement(
	type: WidgetType,
	// biome-ignore lint/suspicious/noExplicitAny: i know what im doing
	props: Record<string, any> | null,
	...children: React.ReactNode[]
) {
	return React.createElement(type, props, ...children)
}

export { createReactElement }
