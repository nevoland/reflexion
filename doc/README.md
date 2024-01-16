reflexion

# reflexion

## Table of contents

### Type Aliases

- [Alignment](README.md#alignment)
- [Dimension](README.md#dimension)
- [Direction](README.md#direction)
- [FlexProps](README.md#flexprops)
- [FlexableComponent](README.md#flexablecomponent)
- [Gap](README.md#gap)

### Functions

- [Flex](README.md#flex)
- [adjustGap](README.md#adjustgap)
- [alignFlex](README.md#alignflex)
- [flex](README.md#flex-1)
- [flexDirection](README.md#flexdirection)
- [merge](README.md#merge)

## Type Aliases

### Alignment

Ƭ **Alignment**: ``"top-left"`` \| ``"top"`` \| ``"top-right"`` \| ``"left"`` \| ``"center"`` \| ``"right"`` \| ``"bottom-left"`` \| ``"bottom"`` \| ``"bottom-right"``

#### Defined in

[types.ts:5](https://github.com/nevoland/reflexion/blob/b4459ce/lib/types.ts#L5)

___

### Dimension

Ƭ **Dimension**: ``"hug"`` \| ``"fill"`` \| `string` \| `number`

#### Defined in

[types.ts:16](https://github.com/nevoland/reflexion/blob/b4459ce/lib/types.ts#L16)

___

### Direction

Ƭ **Direction**: ``"vertical"`` \| ``"horizontal"``

#### Defined in

[types.ts:3](https://github.com/nevoland/reflexion/blob/b4459ce/lib/types.ts#L3)

___

### FlexProps

Ƭ **FlexProps**\<`E`\>: `Object`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `E` | extends `HTMLElement` = `HTMLDivElement` |

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `Component?` | `JSX.ElementType` | Container component to use to render. **`Default`** ```ts "div" ``` |
| `align?` | [`Alignment`](README.md#alignment) | Element container setting that sets the alignment of its children. If set, the element is considered to be a container. |
| `class?` | `string` | Element classes. |
| `className?` | `string` | - |
| `direction?` | [`Direction`](README.md#direction) | Element container setting that sets the flow direction of the children. If set, the element is considered to be a container. |
| `gap?` | [`Gap`](README.md#gap) | Element container setting that set the gap betwen its children. If set to `"auto"`, the gap is evenly distributed between the children. |
| `height?` | [`Dimension`](README.md#dimension) | Element height. If set to `"fill"`, the element vertically fills the parent container. If set to `"hug"`, it hugs the content of its children. |
| `maxHeight?` | [`Dimension`](README.md#dimension) | Element maximum height. If set to `"fill"`, the element vertically fills the parent container. If set to `"hug"`, it hugs the content of its children. |
| `maxWidth?` | [`Dimension`](README.md#dimension) | Element maximum width. If set to `"fill"`, the element horizontally fills the parent container. If set to `"hug"`, it hugs the content of its children. |
| `minHeight?` | [`Dimension`](README.md#dimension) | Element minimum height. If set to `"fill"`, the element vertically fills the parent container. If set to `"hug"`, it hugs the content of its children. |
| `minWidth?` | [`Dimension`](README.md#dimension) | Element minimum width. If set to `"fill"`, the element horizontally fills the parent container. If set to `"hug"`, it hugs the content of its children. |
| `overflow?` | ``"hidden"`` \| ``"auto"`` | Element overflow setting. Controlled by the `scroll` property. |
| `ref?` | `Ref`\<`E` \| `undefined`\> | - |
| `scroll?` | `boolean` | Element container setting that enables scrolling if its content goes out of bounds. |
| `style?` | `JSX.AllCSSProperties` | Element styles. These override any style abstracted by the other properties. |
| `width?` | [`Dimension`](README.md#dimension) | Element width. If set to `"fill"`, the element horizontally fills the parent container. If set to `"hug"`, it hugs the content of its children. |
| `wrap?` | `boolean` | Element container setting that sets whether containing items should wrap or not. |

#### Defined in

[types.ts:22](https://github.com/nevoland/reflexion/blob/b4459ce/lib/types.ts#L22)

___

### FlexableComponent

Ƭ **FlexableComponent**: keyof `JSX.IntrinsicElements` & `string`

#### Defined in

[types.ts:20](https://github.com/nevoland/reflexion/blob/b4459ce/lib/types.ts#L20)

___

### Gap

Ƭ **Gap**: ``"auto"`` \| `number` \| `string`

#### Defined in

[types.ts:18](https://github.com/nevoland/reflexion/blob/b4459ce/lib/types.ts#L18)

## Functions

### Flex

▸ **Flex**\<`E`\>(`«destructured»`, `ref`): `Element`

Creates a `div` element with abstracted CSS Flexbox properties.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `E` | extends `HTMLElement` = `HTMLDivElement` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | [`FlexProps`](README.md#flexprops)\<`E`\> & `Omit`\<`HTMLAttributes`\<`E`\>, keyof [`FlexProps`](README.md#flexprops)\<`E`\>\> |
| `ref` | `Ref`\<`undefined` \| `E`\> |

#### Returns

`Element`

#### Defined in

[components/Flex.tsx:12](https://github.com/nevoland/reflexion/blob/b4459ce/lib/components/Flex.tsx#L12)

___

### adjustGap

▸ **adjustGap**(`style`, `gap`): ``null`` \| `object`

#### Parameters

| Name | Type |
| :------ | :------ |
| `style` | ``null`` \| `object` |
| `gap` | `undefined` \| [`Gap`](README.md#gap) |

#### Returns

``null`` \| `object`

#### Defined in

[tools/adjustGap.ts:3](https://github.com/nevoland/reflexion/blob/b4459ce/lib/tools/adjustGap.ts#L3)

___

### alignFlex

▸ **alignFlex**(`align`, `direction`): `Object`

#### Parameters

| Name | Type |
| :------ | :------ |
| `align` | [`Alignment`](README.md#alignment) |
| `direction` | [`Direction`](README.md#direction) |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `alignItems` | `string` |
| `justifyContent` | `string` |

#### Defined in

[tools/alignFlex.ts:3](https://github.com/nevoland/reflexion/blob/b4459ce/lib/tools/alignFlex.ts#L3)

___

### flex

▸ **flex**(`direction`, `wrap`, `align`, `overflow`, `gap`, `width?`, `minWidth?`, `maxWidth?`, `height?`, `minHeight?`, `maxHeight?`): `JSX.CSSProperties`

#### Parameters

| Name | Type |
| :------ | :------ |
| `direction` | `undefined` \| [`Direction`](README.md#direction) |
| `wrap` | `boolean` |
| `align` | `undefined` \| [`Alignment`](README.md#alignment) |
| `overflow` | `undefined` \| ``"auto"`` \| ``"hidden"`` |
| `gap` | `undefined` \| [`Gap`](README.md#gap) |
| `width?` | [`Dimension`](README.md#dimension) |
| `minWidth?` | [`Dimension`](README.md#dimension) |
| `maxWidth?` | [`Dimension`](README.md#dimension) |
| `height?` | [`Dimension`](README.md#dimension) |
| `minHeight?` | [`Dimension`](README.md#dimension) |
| `maxHeight?` | [`Dimension`](README.md#dimension) |

#### Returns

`JSX.CSSProperties`

#### Defined in

[tools/flex.ts:9](https://github.com/nevoland/reflexion/blob/b4459ce/lib/tools/flex.ts#L9)

___

### flexDirection

▸ **flexDirection**(`direction`): ``"row"`` \| ``"column"``

#### Parameters

| Name | Type |
| :------ | :------ |
| `direction` | [`Direction`](README.md#direction) |

#### Returns

``"row"`` \| ``"column"``

#### Defined in

[tools/flexDirection.ts:3](https://github.com/nevoland/reflexion/blob/b4459ce/lib/tools/flexDirection.ts#L3)

___

### merge

▸ **merge**\<`A`, `B`\>(`a`, `b?`): `A` \| `A` & `B`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `A` | extends `object` |
| `B` | extends `object` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `a` | `A` |
| `b?` | `B` |

#### Returns

`A` \| `A` & `B`

#### Defined in

[tools/merge.ts:1](https://github.com/nevoland/reflexion/blob/b4459ce/lib/tools/merge.ts#L1)
