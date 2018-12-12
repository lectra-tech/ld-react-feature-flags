# ld-react-feature-flags

[![Build Status](https://travis-ci.org/lectra-tech/ld-react-feature-flags.svg?branch=master)](https://travis-ci.org/lectra-tech/ld-react-feature-flags)
[![NPM](https://img.shields.io/npm/v/@lectra/ld-react-feature-flags.svg)](https://www.npmjs.com/package/@lectra/ld-react-feature-flags)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

> Integrate Launch Darkly in your React app in a breeze

## Install

This project depends on React v16.3.0+

```bash
npm install ld-react-feature-flags
```

## Getting Started
### FlagsProvider
Wrap your root component with `FlagsProvider` to make LaunchDarkly client instance accessible to all children components thanks to React context.


```javascript
import { FlagsProvider } from 'ld-react-feature-flags';

ReactDOM.render(
  <FlagsProvider user={user} clientkey="myClientKey" loadingComponent ={<div>please wait</div>}>
    <App />
  </FlagsProvider>,
  document.getElementById('root')
);
```

Prop | Type | Required | Description
--- | --- | --- | ---
user | Object | true | User information
clientkey | String | true | Your LaunchDarkly secret key
onFlagsChange | function | false | Handler for flag change
loadingComponent  | Component | false | Loading component / string

### Flags
All `Flags` components get the _ldClient_ instance thanks to the `FlagsProvider` component.

To render a node or a component based on your flags, you must pass a `flag` props.

The `Flags` component will ask to LaunchDarkly if the given flag is active or not, depending on you LaunchDarkly settings.

You have the control on what will be rendered:

* If the flag is active, you can wrapped the desired component to render as children to a Flag component or use a `renderOn` props.

* If the flag isn't active, nothing will be rendered unless you pass a component as fallback by the `fallbackRender` props.


Prop | Type | Required | Description
--- | --- | --- | ---
flag | String | true | The flag to check
children | Element/Component | false | Return the component if the flag given by props is active
renderOn | Function | false | Return the given component if the flag is active
fallbackRender | Function | false | Return the given component if the flag is inactive


#### with children props

```javascript
import { Flags } from 'ld-react-feature-flags';

<Flags
  flag="beta-only"
>
  <h4>for beta users</h4>
</Flags>
```

#### with renderOn props

```javascript
import { Flags } from 'ld-react-feature-flags';

<Flags
  flag="beta-only"
  renderOn={flag => <h4>for beta users</h4>}
/>
```

#### with renderOn props and fallbackRender props as fallback

```javascript
import { Flags } from 'ld-react-feature-flags';

<Flags
  flag="beta-only"
  renderOn={flag => <h4>for beta users</h4>}
  fallbackRender={flag => (
    <h4>for regular users</h4>
  )}
/>
```

#### with multivariant  flag

The flag given by props is a multivariant flag.
See the [LaunchDarkly doc](https://docs.launchdarkly.com/docs/managing-variations) for more details.

If the flag is active, LD won't return a boolean value but instead a custom value. In our case a string that represents a color.
We can use it directly to style our `h1` title.

```javascript
import { Flags } from 'ld-react-feature-flags';

<Flags
  flag="header-bg-color"
  renderOn={flag => {
    return (
      <h1 style={{ color: flag.headerBgColor }}>
        My awesome multivariant flag
      </h1>
    );
  }}
/>
```

### WithFlags
Same as `Flags` components but in a Higher Order Component way.

`WithFlags([flag])([ComponentToRenderIfTrue][ComponentToRenderIfFalse])`


Arguments | Type | Required | Description
--- | --- | --- | ---
flag | String | true | The flag to check
ComponentToRenderIfTrue | React Component | true | The React component to render if the flag is true or is a multivariant flag
ComponentToRenderIfFalse | React Component | false | The React component to render if the flag is false

#### Component render based on flag value

```javascript
import { WithFlags } from 'ld-react-feature-flags';

const HBeta = () => <h4>for beta users</h4>;
const HeaderFeatureFlipped = WithFlags("beta-only")(HBeta)

<HeaderFeatureFlipped></HeaderFeatureFlipped>
```

#### Component render toggled on flag value

```javascript
import { WithFlags } from 'ld-react-feature-flags';

const HBeta = () => <h4>for beta users</h4>;
const HStandard = () => <h4>for standard users</h4>;
const HeaderFeatureFlipped = WithFlags("beta-only")(HBeta, HStandard)

<HeaderFeatureFlipped></HeaderFeatureFlipped>
```
#### Component render with multivariant flag

```javascript
import { WithFlags } from 'ld-react-feature-flags';

const HeaderWithColor = ({headerBgColor}) => (
    <h1 style={{ color: headerBgColor }}>
        My awesome multivariant flag
    </h1>);
const HeaderFeatureFlippedWithColor = WithFlags("header-bg-color")(HeaderWithColor)

<HeaderFeatureFlippedWithColor></HeaderFeatureFlippedWithColor>
```


## Example
This project contains some examples that you could run.

```bash
git clone https://github.com/lectra-tech/ld-react-feature-flags.git
cd ld-react-feature-flags/example
npm install
npm start
```

## License
MIT
