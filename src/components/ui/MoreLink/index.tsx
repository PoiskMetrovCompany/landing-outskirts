import Link from "next/link"
import { MouseEventHandler, ReactNode } from "react"
import clsx from "clsx"

import styles from "./moreLink.module.scss"

interface MoreLinkProps {
  href: string
  children: ReactNode
  className?: string
  color?: "light" | "dark"
  onClick?: MouseEventHandler<HTMLAnchorElement>
}

const MoreLink = ({
  href,
  children,
  className,
  color = "light",
  onClick,
}: MoreLinkProps) => {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={clsx(styles.moreLink, className, styles[`moreLink--${color}`])}
    >
      {children}
    </Link>
  )
}

export default MoreLink
