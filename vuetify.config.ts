import { defineVuetifyConfiguration } from 'vuetify-nuxt-module/custom-configuration'

// Get tailwind configuration
const tailwindConfig = require('./tailwind.config.js')
// Get tailwind colors configuration
const tailwindColors = tailwindConfig.theme.extend.colors

function flattenColors(colorObj) {
    let result = {};

    function flatten(obj, parentKey = '') {
        for (let key in obj) {
            if (obj.hasOwnProperty(key)) {
                let newKey = parentKey ? `${parentKey}-${key}` : key;
                if (typeof obj[key] === 'object' && !Array.isArray(obj[key])) {
                    flatten(obj[key], newKey);
                } else {
                    result[newKey] = obj[key];
                }
            }
        }
    }

    flatten(colorObj);
    return result;
}

export default defineVuetifyConfiguration({
    theme: {
        themes: {
            light: {
                colors: flattenColors(tailwindColors),
            },
        },
    },
})
