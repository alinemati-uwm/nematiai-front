/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const plugin = require("tailwindcss/plugin");

module.exports = {
  darkMode: ["class"],
  content: ["./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "min-md": { min: "768px" },
        "2xl": "1366px",
        "3xl": "1440px",
        "4xl": "",
      },
    },
    extend: {
      fontSize: {
        xsmall: "0.5rem", //8px
        small: "0.75rem", //12px
        base: "0.875rem", //14px
        large: "1rem", //16px
        xlarge: "1.25rem", //20px
        "2xl": "1.5rem", //24px
        "3xl": "1.75rem", //28px
        "4xl": "2rem", //32px
        "5xl": "2.25rem", //36px
        "6xl": "2.50rem", //40
        "7xl": "2.75rem", //44
        "8xl": "3rem", //48
        "9xl": "3.25rem", //52
        "10xl": "3.50rem", //56
      },
      borderWidth: {
        DEFAULT: "1px",
        0: "0px",
        "0.25": "0.25px",
        2: "2px",
        4: "4px",
        8: "8px",
      },
      spacing: {
        "label-space": "var(--spacing-form-label)",
        "form-padding": "var(--spacing-form-padding)",
        "gap-form": "var(--spacing-gap-form)",
        input: "var(--spacing-element-height)",
        18: "4.5rem", //72px
      },
      borderRadius: {
        sm: "0.25rem", // 4px
        md: "0.375rem", //6px
        DEFAULT: "0.5rem", //8px
        lg: "0.75rem", //12px
        xl: "1.5rem", //24px
        "2xl": "2.25rem", //36px
        "3xl": "3rem", //48px
        none: "0",
        full: "9999px",
      },
      fontFamily: {
        dmSans: ["'DM Sans', sans-serif"],
      },
      backgroundImage: {
        //nerd: landing
        "custom-gradient":
          "linear-gradient(180deg, #07081C 0%, #9373EE 49%, #07081C 98%)",
        "landing-service": "var(--secondary-700, #1F0A58)",
        //nerd:end landing
        gradient:
          "linear-gradient(90deg, var(--brand-second) 0%, var(--brand) 100%)",
      },
      backgroundColor: {
        //nerd:start landing
        "glass-dark": "#00000040",
        //nerd:end landing
        "gradient-start": "#52D5FF",
        "gradient-end": "#9D7AFF",
      },
      colors: {
        landing: {
          primary: "hsla(256, 78%, 69%, 1)",
          primaryDark: "hsla(262, 92%, 46%)",
          light: "hsla(186, 100%, 98%)",
          muted: "hsla(0, 0%, 74%)",
          mutedDark: "hsla(225, 2%, 55%, 1)",
        },
        gradient: {
          gradientStart: "#52D5FF",
          gradientEnd: "#9D7AFF",
        },
        label: {
          disable: "hsl(var(--text-disable))",
          lighter: "hsl(var(--text-lighter))",
          light: "hsl(var(--text-light) / 0.49)",
          DEFAULT: "hsl(var(--text))",
          dark: "hsl(var(--text-dark))",
          darker: "hsl(var(--text-darker))",
          icon: "hsl(var(--text-icon))",
        },
        holder: {
          lighter: "hsl(var(--bg-lighter))",
          light: "hsl(var(--bg-light))",
          DEFAULT: "hsl(var(--bg))",
          dark: "hsl(var(--bg-dark))",
          darker: "hsl(var(--bg-darker))",
        },
        muted: {
          lighter: "hsl(var(--bg-lighter))",
          light: "hsl(var(--bg-light))",
          DEFAULT: "hsl(var(--bg))",
          dark: "hsl(var(--bg-dark))",
          darker: "hsl(var(--bg-darker))",
        },
        primary: {
          lighter: "hsl(var(--primary-lighter))",
          light: "hsl(var(--primary-light))",
          DEFAULT: "hsl(var(--primary))",
          dark: "hsl(var(--primary-dark))",
          darker: "hsl(var(--primary-darker))",
        },
        danger: {
          lighter: "hsl(var(--danger-lighter))",
          light: "hsl(var(--danger-light))",
          DEFAULT: "hsl(var(--danger))",
          dark: "hsl(var(--danger-dark))",
          darker: "hsl(var(--danger-darker))",
        },
        success: {
          lighter: "hsl(var(--success-lighter))",
          light: "hsl(var(--success-light))",
          DEFAULT: "hsl(var(--success))",
          dark: "hsl(var(--success-dark))",
          darker: "hsl(var(--success-darker))",
        },
        warning: {
          lighter: "hsl(var(--warning-lighter))",
          light: "hsl(var(--warning-light))",
          DEFAULT: "hsl(var(--warning))",
          dark: "hsl(var(--warning-dark))",
          darker: "hsl(var(--warning-darker))",
        },
        info: {
          lighter: "hsl(var(--info-lighter))",
          light: "hsl(var(--info-light))",
          DEFAULT: "hsl(var(--info))",
          dark: "hsl(var(--info-dark))",
          darker: "hsl(var(--info-darker))",
        },
        overlay: {
          lighter: "hsl(var(--overlay-lighter))",
          light: "hsl(var(--overlay-light))",
          DEFAULT: "hsl(var(--overlay))",
          dark: "hsl(var(--overlay-dark))",
          darker: "hsl(var(--overlay-darker))",
        },
        orange: {
          lighter: "hsl(var(--orange-lighter))",
          light: "hsl(var(--orange-light))",
          DEFAULT: "hsl(var(--orange))",
          dark: "hsl(var(--orange-dark))",
          darker: "hsl(var(--orange-darker))",
        },
        magenta: {
          lighter: "hsl(var(--magenta-lighter))",
          light: "hsl(var(--magenta-light))",
          DEFAULT: "hsl(var(--magenta))",
          dark: "hsl(var(--magenta-dark))",
          darker: "hsl(var(--magenta-darker))",
        },
        seperator: "hsl(var(--bg-dark))",
        active: "hsl(var(--primary-lighter))",
        card: {
          DEFAULT: "hsl(var(--bg-light))",
          foreground: "hsl(var(--text))",
        },
        input: "hsl(var(--bg))",

        ring: "hsl(var(--ring))",
        background: "hsl(var(--bg))",

        popover: {
          DEFAULT: "hsl(var(--bg-light))",
          foreground: "hsl(var(--text))",
        },

        accent: {
          DEFAULT: "hsl(var(--bg-dark))",
          foreground: "hsl(var(--text))",
        },

        secondary: {
          DEFAULT: "hsl(var(--primary-lighter))",
          foreground: "hsl(var(--primary))",
        },
      },

      boxShadow: {
        modal:
          "0px 10px 18px 0px hsl(var(--text-light) / 0.15), 0px 0px 1px 0px hsl(var(--text-light) / 0.15)",
        popup: "0 16px 56px rgba(16,24,40,0.16)",
        "card-hover":
          "0px 0px 4px rgba(40,41,61,0.02),0px 2px 24px rgba(40,41,61,0.08)",
        "dashboard-card": "0px 12px 12px 0px rgba(79, 73, 85, 0.08);",
        mic: "0px 0px 1px rgba(40,41,61,0.02),0px 1px 8px rgba(40,41,61,0.08)",
        "custom-shadow": "0px 4px 4px 0px #00000040",
        custom: "50px 0px 100px 0px #00000040",
        "custom-landing": "0px 0px 20px 0px #9373EEC",
        "toast-shadow": "0px 6px 12px 0px #0000001A",
      },
      keyframes: {
        bounce: {
          "0%, 20%, 50%, 80%, 100%": {
            transform: "scaleY(1)",
          },
          "40%": {
            transform: "scaleY(2)",
          },
          "60%": {
            transform: "scaleY(0.8)",
          },
        },
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        loading: {
          "0%": {
            width: "0%",
          },
          "100%": {
            width: "100%",
          },
        },
        "blink-opacity": {
          "50%": { opacity: "0.5" },
        },
        blink: {
          "50%": { "background-color": "transparent" },
        },
        slideDownAndFade: {
          "0%": { opacity: 0, transform: "translateY(-10px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        slideUpAndFade: {
          "0%": { opacity: 1, transform: "translateY(0)" },
          "100%": { opacity: 0, transform: "translateY(-10px)" },
        },
        typingDots: {
          "0%, 20%": { opacity: ".2" },
          "40%": { opacity: ".6" },
          "60%, 100%": { opacity: "1" },
        },
        "shine-loading": {
          "0%": { backgroundPosition: "-250px 0" },
          "100%": { backgroundPosition: "250px 0" },
        },
        slideDown: {
          from: { height: "0px", opacity: "0" },
          to: {
            height: "var(--radix-collapsible-content-height)",
            opacity: "1",
          },
        },
        slideUp: {
          from: {
            height: "var(--radix-collapsible-content-height)",
            opacity: "1",
          },
          to: { height: "0px", opacity: "0" },
        },
      },

      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        loading: "loading 3s cubic-bezier(0.1, 0.8, 1, 1) infinite",
        blink: "blink 1s step-start infinite",
        "blink-opacity": "blink-opacity 1s step-start infinite",
        slideDownAndFade: "slideDownAndFade 0.3s ease-out forwards",
        slideUpAndFade: "slideUpAndFade 0.3s ease-in forwards",
        "spin-slow": "spin .3s linear infinite",
        typingDots: "typingDots 1s steps(1, end) infinite",
        "shine-loading": "shine-loading 2s infinite ease-out",
        bounce1: "bounce 0.8s infinite ease-in-out 0s",
        bounce2: "bounce 0.8s infinite ease-in-out 0.2s",
        bounce3: "bounce 0.8s infinite ease-in-out 0.4s",
        bounce4: "bounce 0.8s infinite ease-in-out 0.6s",
        bounce5: "bounce 0.8s infinite ease-in-out 0.8s",
        slideDown: "slideDown 300ms",
        slideUp: "slideUp 300ms",
      },
      textShadow: {
        sm: "0 1px 2px var(--tw-shadow-color)",
        DEFAULT: "0 2px 4px var(--tw-shadow-color)",
        lg: "0 8px 16px var(--tw-shadow-color)",
      },
    },
  },
  plugins: [
    require("tailwindcss-rtl"),
    require("tailwindcss-animate"),
    require("@tailwindcss/typography"),
    plugin(function ({
      addVariant,
    }: {
      addVariant: (name: string, generator: string) => void;
    }) {
      addVariant("selected", "&[data-selected='true']");
    }),
    //@ts-ignore
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          "text-shadow": (value: string) => ({
            textShadow: value,
          }),
        },
        { values: theme("textShadow") },
      );
    }),
    //@ts-ignore
    function ({ addUtilities }) {
      addUtilities({
        ".text-shadow-custom-purple": {
          "text-shadow": "0px 0px 20px #9373EECC",
        },
      });
    },
  ],
};
