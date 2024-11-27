"use client";

import React from "react";
import MotionDiv from "@/components/ui/motion-div";

// INFO: making eslint ignore the any type error to avoid type hell
const withDefaultMotion = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Component: React.ComponentType<any>,
  defaultProps = {},
) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const WrappedComponent = (props: any): JSX.Element => {
    const mergedProps = { ...defaultProps, ...props };
    return <Component {...mergedProps} />;
  };

  WrappedComponent.displayName =
    Component.displayName || Component.name || "ComponentWithDefaultMotion";

  return WrappedComponent;
};

const AnimatedDiv = withDefaultMotion(MotionDiv, {
  initial: { opacity: 0, y: 50 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -50 },
  transition: { duration: 1 },
});

export default AnimatedDiv;
