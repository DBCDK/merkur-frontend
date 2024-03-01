import "bootstrap/dist/css/bootstrap.min.css";
import "../src/css/styles.css";

export const parameters = {
    backgrounds: {
        default: "light",
    },
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
        matchers: {
            color: /(background|color)$/i,
            date: /Date$/,
        },
    },
};
