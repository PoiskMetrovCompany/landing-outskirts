import React, { ReactNode } from "react"
import clsx from "clsx"
import styles from "./page.module.scss"

interface PageProps {
  children: ReactNode
  className?: string
}

const Page = ({ children, className }: PageProps) => {
  return <main className={clsx(styles.page, className)}>{children}</main>
}

export default Page
