import type { Config } from "tailwindcss";

export default <Partial<Config>>{
  theme: {
    extend: {
        colors: {
            blackish: "#0a0b0a",
            borderish: "#efe7d226",
            textish: "#efe7d2",
            pinkish: "#E13A4B",
            silverish: "#f5f2eab3",
            grayish: "#131212"
          },
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'],
        forum: ['Forum', 'serif'],
      },
    },
  },
};
