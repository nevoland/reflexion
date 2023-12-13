# Reflexion

💎 React component to build layouts based on the CSS Flexbox model.

### Features

- Provides a simple abstraction of the CSS Flexbox model
- Follows the Figma auto-layout model with similar properties
- Sets all necessary Flexbox parameters to enable scrolling

## Usage

The component is exported from the main entry-point through an ES6 module:

```js
import { Flex } from "reflexion";
```

The `Flex` component uses CSS definitions that must be imported in order to work appropriately:

```css
@import "reflexion/dist/main.css";
```

> [!NOTE]
> The CSS definitions use the `:has` pseudo-class, which is not supported on FireFox. To bypass this limitation, when using FireFox, `Flex` introspects its children with JavaScript code, which can have a slight performance impact.

## Installation

Install with the [Node Package Manager](https://www.npmjs.com/package/reflexion):

```bash
npm install reflexion
```

## Documentation

Documentation is generated [here](doc/README.md).
