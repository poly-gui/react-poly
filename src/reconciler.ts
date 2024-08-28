import ReactReconciler from "react-reconciler"
import type { Fiber, HostConfig } from "react-reconciler"
import {
	ConcurrentRoot,
	DefaultEventPriority,
} from "react-reconciler/constants.js"
import {
	MultiChildrenWidget,
	SingleChildWidget,
	type Widget,
} from "./widget.js"
import { TextWidget, type TextProps } from "./widget/text.js"
import type { PolyApplication, Window } from "poly"
import { ButtonWidget, type ButtonProps } from "./widget/button.js"
import { CenterWidget, type CenterProps } from "./widget/center.js"
import type { WidgetType } from "./widget/types.js"
import type { ReactWindow } from "./react-window.js"
import { RowWidget, type RowProps } from "./widget/row.js"
import { ColumnWidget, type ColumnProps } from "./widget/column.js"

const hostConfig: HostConfig<
	WidgetType,
	unknown,
	Window,
	Widget,
	TextWidget,
	Widget,
	unknown,
	Widget,
	PolyApplication,
	unknown,
	unknown,
	ReturnType<typeof setTimeout>,
	number
> = {
	supportsMutation: true,
	supportsPersistence: false,
	supportsHydration: false,
	isPrimaryRenderer: false,
	supportsMicrotasks: false,
	noTimeout: -1,

	createInstance(type, props, rootContainer, hostContext, internalHandle) {
		const widgetTag = hostContext.idRegistry.newId()

		let instance: Widget
		switch (type) {
			case "button":
				instance = new ButtonWidget(
					hostContext,
					hostContext.idRegistry.newId(),
					props as ButtonProps,
				)
				break
			case "text":
				instance = new TextWidget(
					hostContext,
					hostContext.idRegistry.newId(),
					props as TextProps,
				)
				break
			case "center":
				instance = new CenterWidget(hostContext, widgetTag)
				break
			case "row": {
				const rowProps = props as RowProps
				instance = new RowWidget(hostContext, widgetTag, rowProps)
				break
			}
			case "column": {
				const colProps = props as ColumnProps
				instance = new ColumnWidget(hostContext, widgetTag, colProps)
				break
			}
		}

		return instance
	},

	createTextInstance(
		text,
		rootContainer,
		hostContext,
		internalHandle,
	): TextWidget {
		return new TextWidget(hostContext, hostContext.idRegistry.newId(), {
			content: text,
		})
	},

	appendInitialChild(parentInstance, child): void {
		if (parentInstance instanceof SingleChildWidget) {
			parentInstance.child = child
		} else if (parentInstance instanceof MultiChildrenWidget) {
			parentInstance.children.append(child)
		}
	},

	appendChild(parentInstance, child) {
		if (parentInstance instanceof SingleChildWidget) {
			parentInstance.child = child
		} else if (parentInstance instanceof MultiChildrenWidget) {
		}
	},

	appendChildToContainer(container, child) {
		container.showContent(child.descriptor())
	},

	insertBefore(parentInstance, child, beforeChild) {
		if (!(parentInstance instanceof MultiChildrenWidget)) {
			return
		}
		parentInstance.context.nativeLayer.insertWidgetBefore(
			child.descriptor(),
			beforeChild.descriptor(),
			parentInstance.tag,
		)
	},

	insertInContainerBefore(container, child, beforeChild) {
		throw new Error("insertInContainerBefore not supported.")
	},

	removeChild(parentInstance, child) {
		if (parentInstance instanceof SingleChildWidget) {
			parentInstance.removeChild(child)
		}
	},

	removeChildFromContainer(container, child) {
		container.clearContent()
	},

	finalizeInitialChildren(
		instance,
		type,
		props,
		rootContainer,
		hostContext,
	): boolean {
		return false
	},

	prepareUpdate(
		instance,
		type,
		oldProps,
		newProps,
		rootContainer,
		hostContext,
	): unknown {
		return newProps
	},

	shouldSetTextContent(type, props): boolean {
		return false
	},

	getRootHostContext(rootContainer): PolyApplication | null {
		return rootContainer.context
	},

	getChildHostContext(parentHostContext, type, rootContainer): PolyApplication {
		return parentHostContext
	},

	getPublicInstance(instance): Widget {
		return instance
	},

	prepareForCommit(containerInfo): Record<string, any> | null {
		return null
	},

	commitUpdate(
		instance,
		updatePayload,
		type,
		prevProps,
		nextProps,
		internalHandle,
	) {
		instance.update(nextProps)
	},

	commitTextUpdate(textInstance, oldText, newText) {
		textInstance.update({ content: newText })
	},

	clearContainer(container) {
		container.clearContent()
	},

	resetAfterCommit(containerInfo): void {},

	preparePortalMount(containerInfo): void {},

	scheduleTimeout(fn, delay): Timer {
		return setTimeout(fn, delay)
	},

	cancelTimeout(id): void {
		clearTimeout(id)
	},

	getCurrentEventPriority(): number {
		return DefaultEventPriority
	},

	getInstanceFromNode(node): Fiber | null | undefined {
		throw new Error("Function not implemented.")
	},

	beforeActiveInstanceBlur(): void {
		throw new Error("Function not implemented.")
	},

	afterActiveInstanceBlur(): void {
		throw new Error("Function not implemented.")
	},

	prepareScopeUpdate(scopeInstance, instance): void {
		throw new Error("Function not implemented.")
	},

	getInstanceFromScope(scopeInstance): Widget | null {
		throw new Error("Function not implemented.")
	},

	detachDeletedInstance(node): void {
		throw new Error("Function not implemented.")
	},
}

const ReactPolyReconciler = ReactReconciler(hostConfig)

const ReactPoly = {
	render(reactElement: React.ReactNode, window: ReactWindow) {
		if (!window.__react_container) {
			window.__react_container = ReactPolyReconciler.createContainer(
				window,
				ConcurrentRoot,
				null,
				false,
				null,
				"",
				() => {},
				null,
			)
		}
		ReactPolyReconciler.updateContainer(reactElement, window.__react_container)
	},
}

export { ReactPoly }
