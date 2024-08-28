import ReactReconciler from "react-reconciler"
import type { Fiber, HostConfig } from "react-reconciler"
import {
	ConcurrentRoot,
	DefaultEventPriority,
} from "react-reconciler/constants.js"
import { SingleChildWidget, type Widget } from "./widget.js"
import { TextWidget, type TextProps } from "./widget/text.js"
import type { PolyApplication, Window } from "poly"
import { ButtonWidget, type ButtonProps } from "./widget/button.js"
import { CenterWidget, type CenterProps } from "./widget/center.js"
import type { WidgetType } from "./widget/types.js"
import type { ReactWindow } from "./react-window.js"

const hostConfig: HostConfig<
	WidgetType,
	unknown,
	Window,
	Widget,
	TextWidget,
	unknown,
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
				const centerProps = props as CenterProps
				instance = new CenterWidget(hostContext, widgetTag)
				break
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
		}
	},

	appendChild(parentInstance, child) {
		if (parentInstance instanceof SingleChildWidget) {
			parentInstance.child = child
		}
	},

	appendChildToContainer(container, child) {
		container.showContent(child.descriptor())
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
		return false
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
