reflexion

# reflexion

## Table of contents

### Type Aliases

- [Alignment](README.md#alignment)
- [Dimension](README.md#dimension)
- [Direction](README.md#direction)
- [FlexProps](README.md#flexprops)
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

Ƭ **Alignment**: ``"top-left"`` \| ``"top-center"`` \| ``"top-right"`` \| ``"left"`` \| ``"center"`` \| ``"right"`` \| ``"bottom-left"`` \| ``"bottom-center"`` \| ``"bottom-right"``

#### Defined in

[lib/types.ts:5](https://github.com/nevoland/reflexion/blob/9ce59ed/lib/types.ts#L5)

___

### Dimension

Ƭ **Dimension**: ``"hug"`` \| ``"fill"`` \| `string` \| `number`

#### Defined in

[lib/types.ts:16](https://github.com/nevoland/reflexion/blob/9ce59ed/lib/types.ts#L16)

___

### Direction

Ƭ **Direction**: ``"vertical"`` \| ``"horizontal"``

#### Defined in

[lib/types.ts:3](https://github.com/nevoland/reflexion/blob/9ce59ed/lib/types.ts#L3)

___

### FlexProps

Ƭ **FlexProps**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `align?` | [`Alignment`](README.md#alignment) | Element container setting that sets the alignment of its children. If set, the element is considered to be a container. |
| `class?` | `string` | Element classes. |
| `className?` | `string` | - |
| `direction?` | [`Direction`](README.md#direction) | Element container setting that sets the flow direction of the children. If set, the element is considered to be a container. |
| `gap?` | [`Gap`](README.md#gap) | Element container setting that set the gap betwen its children. If set to `"auto"`, the gap is evenly distributed between the children. |
| `height?` | [`Dimension`](README.md#dimension) | Element height. If set to `"fill"`, the element vertically fills the parent container. If set to `"hug"`, it hugs the content of its children. |
| `overflow?` | ``"hidden"`` \| ``"auto"`` | Element overflow setting. Controlled by the `scroll` property. |
| `scroll?` | `boolean` | Element container setting that enables scrolling if its content goes out of bounds. |
| `style?` | `JSX.AllCSSProperties` | Element styles. These override any style abstracted by the other properties. |
| `width?` | [`Dimension`](README.md#dimension) | Element width. If set to `"fill"`, the element horizontally fills the parent container. If set to `"hug"`, it hugs the content of its children. |
| `wrap?` | `boolean` | Element container setting that sets whether containing items should wrap or not. |

#### Defined in

[lib/types.ts:20](https://github.com/nevoland/reflexion/blob/9ce59ed/lib/types.ts#L20)

___

### Gap

Ƭ **Gap**: ``"auto"`` \| `number` \| `string`

#### Defined in

[lib/types.ts:18](https://github.com/nevoland/reflexion/blob/9ce59ed/lib/types.ts#L18)

## Functions

### Flex

▸ **Flex**(`props`, `context?`): ``null`` \| `VNode`\<`any`\>

Creates a `div` element with abstracted CSS Flexbox properties.

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | `RenderableProps`\<`PropsWithoutRef`\<[`FlexProps`](README.md#flexprops) & `DOMAttributes`\<`HTMLDivElement`\>\> & {}, `any`\> |
| `context?` | `any` |

#### Returns

``null`` \| `VNode`\<`any`\>

#### Defined in

node_modules/preact/src/index.d.ts:90

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

[lib/tools/adjustGap.ts:3](https://github.com/nevoland/reflexion/blob/9ce59ed/lib/tools/adjustGap.ts#L3)

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

[lib/tools/alignFlex.ts:3](https://github.com/nevoland/reflexion/blob/9ce59ed/lib/tools/alignFlex.ts#L3)

___

### flex

▸ **flex**(`direction`, `wrap`, `align`, `overflow`, `gap`, `width?`, `height?`): `Object`

#### Parameters

| Name | Type |
| :------ | :------ |
| `direction` | `undefined` \| [`Direction`](README.md#direction) |
| `wrap` | `boolean` |
| `align` | `undefined` \| [`Alignment`](README.md#alignment) |
| `overflow` | `undefined` \| ``"auto"`` \| ``"hidden"`` |
| `gap` | `undefined` \| [`Gap`](README.md#gap) |
| `width?` | [`Dimension`](README.md#dimension) |
| `height?` | [`Dimension`](README.md#dimension) |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `display` | `undefined` \| `string` |
| `flexDirection` | `undefined` \| `string` |
| `height` | `undefined` \| [`Dimension`](README.md#dimension) |
| `overflow` | `undefined` \| ``"auto"`` \| ``"hidden"`` |
| `width` | `undefined` \| [`Dimension`](README.md#dimension) |
| `wrap` | `string` |

#### Defined in

[lib/tools/flex.ts:7](https://github.com/nevoland/reflexion/blob/9ce59ed/lib/tools/flex.ts#L7)

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

[lib/tools/flexDirection.ts:3](https://github.com/nevoland/reflexion/blob/9ce59ed/lib/tools/flexDirection.ts#L3)

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

[lib/tools/merge.ts:1](https://github.com/nevoland/reflexion/blob/9ce59ed/lib/tools/merge.ts#L1)
