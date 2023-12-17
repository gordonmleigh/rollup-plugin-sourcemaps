# @gordonmleigh/rollup-plugin-sourcemaps

A replacement for [rollup-plugin-sourcemaps](https://github.com/maxdavidson/rollup-plugin-sourcemaps) which isn't maintained anymore.

```javascript
import sourcemaps from "@gordonmleigh/rollup-plugin-sourcemaps";

export default {
  input: "lib/index.js",

  output: {
    file: "dist/index.mjs",
    // this is required to _output_ sourcemaps
    sourcemap: true,
  },

  plugins: [
    // as easy as that. Doesn't require (or support) any options
    sourcemaps(),
  ],
};
```
