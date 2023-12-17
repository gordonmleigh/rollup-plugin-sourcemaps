import convert from "convert-source-map";
import { readFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import type { Plugin } from "rollup";

function sourcemaps(): Plugin {
  // load pre-existing sourcemaps for inputs, because Rollup still doesn't do
  // this by default and rollup-plugin-sourcemaps isn't maintained anymore
  return {
    name: "@gordonmleigh/rollup-plugin-sourcemaps",
    async load(id) {
      // skip modules which have already been resolved by other plugins
      if (id.startsWith("\0")) {
        return null;
      }

      const code = await readFile(id, "utf8");
      let map;

      try {
        const converter = await convert.fromMapFileSource(code, (file) =>
          readFile(resolve(dirname(id), file), "utf8"),
        );
        map = converter?.toObject();
      } catch (err) {
        this.warn(`failed to load sourcemap for "${id}": ${err}`);
      }

      return {
        code,
        map,
      };
    },
  };
}

export default sourcemaps;
