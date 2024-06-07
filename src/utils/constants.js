export const weatherOptions = [
  {
    day: true,
    condition: "cloudy",
    url: new URL("../assets/images/day/cloudy.svg", import.meta.url).href,
  },
  {
    day: true,
    condition: "foggy",
    url: new URL("../assets/images/day/foggy.svg", import.meta.url).href,
  },
  {
    day: true,
    condition: "rainy",
    url: new URL("../assets/images/day/rainy.svg", import.meta.url).href,
  },
  {
    day: true,
    condition: "snowy",
    url: new URL("../assets/images/day/snowy.svg", import.meta.url).href,
  },
  {
    day: true,
    condition: "stormy",
    url: new URL("../assets/images/day/stormy.svg", import.meta.url).href,
  },
  {
    day: true,
    condition: "sunny",
    url: new URL("../assets/images/day/sunny.svg", import.meta.url).href,
  },

  {
    day: false,
    condition: "clear",
    url: new URL("../assets/images/night/clear.svg", import.meta.url).href,
  },
  {
    day: false,
    condition: "cloudy",
    url: new URL("../assets/images/night/cloudy.svg", import.meta.url).href,
  },
  {
    day: false,
    condition: "foggy",
    url: new URL("../assets/images/night/foggy.svg", import.meta.url).href,
  },
  {
    day: false,
    condition: "rainy",
    url: new URL("../assets/images/night/rainy.svg", import.meta.url).href,
  },
  {
    day: false,
    condition: "snowy",
    url: new URL("../assets/images/night/snowy.svg", import.meta.url).href,
  },
  {
    day: false,
    condition: "stormy",
    url: new URL("../assets/images/night/stormy.svg", import.meta.url).href,
  },
];

export const defaultWeatherOptions = {
  day: {
    url: new URL("../assets/images/day/sunny.svg", import.meta.url).href,
  },
  night: {
    url: new URL("../assets/images/night/clear.svg", import.meta.url).href,
  },
};

export const coordinates = {
  latitude: 37.128849,
  longitude: -84.083679,
};

export const APIkey = "33d4b6bb9548919b6405a66d639a1953";
