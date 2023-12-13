reflexion

# reflexion

## Table of contents

### Type Aliases

- [Alignment](README.md#alignment)
- [Direction](README.md#direction)

### Functions

- [Flex](README.md#flex)
- [alignFlex](README.md#alignflex)
- [flex](README.md#flex-1)

## Type Aliases

### Alignment

Ƭ **Alignment**: ``"start"`` \| ``"center"`` \| ``"end"`` \| ``"stretch"``

#### Defined in

[lib/types.ts:3](https://github.com/nevoland/reflexout/blob/adc3ecb/lib/types.ts#L3)

___

### Direction

Ƭ **Direction**: ``"column"`` \| ``"row"``

#### Defined in

[lib/types.ts:1](https://github.com/nevoland/reflexout/blob/adc3ecb/lib/types.ts#L1)

## Functions

### Flex

▸ **Flex**(`props`, `context?`): ``null`` \| `VNode`\<`any`\>

Creates a `div` element with abstracted `flex` properties.

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | `RenderableProps`\<`PropsWithoutRef`\<`FlexProps`\> & {}, `any`\> |
| `context?` | `any` |

#### Returns

``null`` \| `VNode`\<`any`\>

#### Defined in

node_modules/preact/src/index.d.ts:90

___

### alignFlex

▸ **alignFlex**(`align?`): `undefined` \| `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `align?` | [`Alignment`](README.md#alignment) |

#### Returns

`undefined` \| `string`

#### Defined in

lib/tools/alignFlex.ts:3

___

### flex

▸ **flex**(`container`, `direction`, `wrap`, `grow`, `shrink`, `basis`, `item`, `align`, `justify`, `overflow`): `Object`

#### Parameters

| Name | Type |
| :------ | :------ |
| `container` | `boolean` |
| `direction` | [`Direction`](README.md#direction) |
| `wrap` | `boolean` |
| `grow` | `boolean` |
| `shrink` | `boolean` |
| `basis` | `string` |
| `item` | `boolean` |
| `align` | `undefined` \| [`Alignment`](README.md#alignment) |
| `justify` | `undefined` \| [`Alignment`](README.md#alignment) |
| `overflow` | `undefined` \| ``"hidden"`` \| ``"auto"`` |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `alignItems` | `undefined` \| `string` |
| `alignSelf` | `undefined` \| `string` |
| `display` | `undefined` \| `string` |
| `flex` | `undefined` \| `string` |
| `flexFlow` | `undefined` \| `string` |
| `justifyContent` | `undefined` \| `string` |
| `overflow` | `undefined` \| ``"hidden"`` \| ``"auto"`` |

#### Defined in

lib/tools/flex.ts:5
