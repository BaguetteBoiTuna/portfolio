"use client";

import { forwardRef } from "react";
import {
  Link as NextUiLink,
  LinkProps as NextUiLinkProps,
} from "@nextui-org/react";
import NextLink, { LinkProps as NextLinkProps } from "next/link";

type CombinedLinkProps = NextUiLinkProps & NextLinkProps;

const RouterLink = forwardRef<HTMLAnchorElement, CombinedLinkProps>(
  ({ href, children, ...props }, ref) => {
    return (
      <NextLink href={href} passHref legacyBehavior>
        <NextUiLink ref={ref} {...props}>
          {children}
        </NextUiLink>
      </NextLink>
    );
  },
);

RouterLink.displayName = "RouterLink";

export default RouterLink;
