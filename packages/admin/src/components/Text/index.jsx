import React from "react";

const sizeClasses = {
  txtLexendRegular14Gray600: "font-lexend font-normal",
  txtBasierCircleMedium14: "font-basiercircle font-medium",
  txtLexendRegular14Bluegray50: "font-lexend font-normal",
  txtBeVietnamProSemiBold14Bluegray100: "font-bevietnampro font-semibold",
  txtLexendSemiBold16: "font-lexend font-semibold",
  txtBeVietnamProSemiBold24: "font-bevietnampro font-semibold",
  txtLexendBold64: "font-bold font-lexend",
  txtLexendSemiBold12: "font-lexend font-semibold",
  txtLexendSemiBold14: "font-lexend font-semibold",
  txtBeVietnamProSemiBold16: "font-bevietnampro font-semibold",
  txtLexendSemiBold16WhiteA700: "font-lexend font-semibold",
  txtLexendSemiBold14Gray300: "font-lexend font-semibold",
  txtLexendRegular8: "font-lexend font-normal",
  txtBeVietnamProSemiBold16Black90001: "font-bevietnampro font-semibold",
  txtLexendRegular14Bluegray100: "font-lexend font-normal",
  txtInterSemiBold14: "font-inter font-semibold",
  txtBeVietnamProRegular14: "font-bevietnampro font-normal",
  txtBeVietnamProSemiBold14: "font-bevietnampro font-semibold",
  txtLexendRegular14: "font-lexend font-normal",
  txtLexendSemiBold24: "font-lexend font-semibold",
  txtBeVietnamProSemiBold16Gray100: "font-bevietnampro font-semibold",
  txtBeVietnamProSemiBold14Gray400: "font-bevietnampro font-semibold",
  txtInterRegular12: "font-inter font-normal",
  txtInterRegular14: "font-inter font-normal",
  txtBeVietnamProSemiBold16WhiteA700: "font-bevietnampro font-semibold",
};

const Text = ({ children, className = "", size, as, ...restProps }) => {
  const Component = as || "p";

  return (
    <Component
      className={`text-left ${className} ${size && sizeClasses[size]}`}
      {...restProps}
    >
      {children}
    </Component>
  );
};

export { Text };
