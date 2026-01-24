import type { TexturePreset } from "./types";

export type TextureSource =
  | {
      type: "url";
      url: string;
    }
  | {
      type: "svg";
      url: string;
      width: number;
      height: number;
    };

export const TEXTURE_SOURCES: Record<TexturePreset, TextureSource> = {
  satellite: {
    type: "url",
    url: "https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_atmos_2048.jpg",
  },
  natural: {
    type: "url",
    url: "https://unpkg.com/three-globe@2.45.0/example/img/earth-blue-marble.jpg",
  },
  dark: {
    type: "url",
    url: "https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_lights_2048.png",
  },
  light: {
    type: "url",
    url: "https://raw.githubusercontent.com/turban/webgl-earth/master/images/2_no_clouds_4k.jpg",
  },
  night: {
    type: "url",
    url: "https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_lights_2048.png",
  },
  topographic: {
    type: "url",
    url: "https://unpkg.com/three-globe@2.45.0/example/img/earth-topology.png",
  },
  day: {
    type: "url",
    url: "https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_day_4096.jpg",
  },
  bathymetry: {
    type: "url",
    url: "https://unpkg.com/three-globe@2.45.0/example/img/earth-water.png",
  },
  atlas: {
    type: "svg",
    url: "https://upload.wikimedia.org/wikipedia/commons/5/5e/BlankMap-World-Sovereign_Nations.svg",
    width: 8192,
    height: 4096,
  },
};

export const TEXTURE_PRESETS = Object.keys(TEXTURE_SOURCES) as TexturePreset[];
