import clsx from "clsx"

import React, { CSSProperties } from "react"

import Image from "next/image"

import styles from "./iconImage.module.scss"

interface IconImageProps {
  className?: string
  iconLink?: string
  alt: string
  imageClassName?: string
  style?: CSSProperties
  loading?: "lazy" | "eager"
  objectFit?: "cover" | "contain" | "fill" | "none" | "scale-down"
}

const IconImage = ({
  iconLink,
  alt,
  className,
  imageClassName,
  style,
  loading,
  objectFit,
}: IconImageProps) => {
  return (
    <div className={clsx(styles.iconImage, className)} style={style}>
      <Image
        src={iconLink || ""}
        alt={alt}
        fill
        className={imageClassName}
        loading={loading}
        objectFit={objectFit}
      />
    </div>
  )
}

export default IconImage
