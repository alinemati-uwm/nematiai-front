import React, { type ReactNode } from "react";

import { cva } from "class-variance-authority";

type props = {
  children: ReactNode;
  variant?: keyof typeof variant;
  color?: keyof typeof color;
  variantMobileSize?: keyof typeof variantMobileSize;
  type?:
    | "label"
    | "p"
    | "span"
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "h6"
    | "b"
    | "i"
    | "u"
    | "strong"
    | "em"
    | "blockquote"
    | "code"
    | "pre"
    | "q"
    | "small"
    | "sub"
    | "sup"
    | "mark"
    | "del"
    | "ins"
    | "abbr"
    | "cite"
    | "dfn"
    | "kbd"
    | "samp"
    | "var"
    | "wbr"
    | "address"
    | "br"
    | "hr"
    | "bdi"
    | "bdo"
    | "time"
    | "a"
    | "ul"
    | "ol"
    | "li"
    | "dl"
    | "dt"
    | "dd"
    | "figcaption"
    | "figure"
    | "table"
    | "thead"
    | "tbody"
    | "tfoot"
    | "tr"
    | "th"
    | "td"
    | "caption";
} & React.HTMLAttributes<HTMLElement>;

const variant = {
  default: "text-base",
  code: "text-small leading-5",
  large: "text-large leading-6",
  small: "text-small leading-4",
  xs: "text-xs leading-4",
  headingXXL: "text-4xl leading-9 font-bold",
  headingXL: "text-3xl leading-8 font-bold",
  headingL: "text-2xl leading-7 font-bold",
  headingM: "text-xlarge leading-6 font-bold",
  headingS: "text-large leading-5 font-bold",
  headingXS: "text-base leading-5 font-bold",
  headingXXS: "text-small leading-4 font-bold",
};

const variantMobileSize = {
  default: "",
  code: "max-md:text-small max-md:leading-5",
  large: "max-md:text-large max-md:leading-6",
  small: "max-md:text-small max-md:leading-4",
  xs: "max-md:text-xs max-md:leading-4",
  headingXXL: "max-md:text-4xl max-md:leading-9 font-bold",
  headingXL: "max-md:text-3xl max-md:leading-8 font-bold",
  headingL: "max-md:text-2xl max-md:leading-7 font-bold",
  headingM: "max-md:text-xlarge max-md:leading-6 font-bold",
  headingS: "max-md:text-large max-md:leading-5 font-bold",
  headingXS: "max-md:text-base max-md:leading-5 font-bold",
  headingXXS: "max-md:text-small max-md:leading-4 font-bold",
};

const color = {
  default: "text-label",
  secondary: "text-label-light",
  danger: "text-danger",
  primary: "text-primary",
};

const classVariance = cva("", {
  variants: {
    variant,
    color,
    variantMobileSize,
  },
});

function AppTypo(props: props) {
  const {
    children,
    variant = "default",
    color = "default",
    type: Tag = "span",
    variantMobileSize = "default",
    className,
    ...rest
  } = props;

  return (
    <Tag
      {...rest}
      className={classVariance({
        variant,
        variantMobileSize,
        color,
        className,
      })}
    >
      {children}
    </Tag>
  );
}

export default AppTypo;
