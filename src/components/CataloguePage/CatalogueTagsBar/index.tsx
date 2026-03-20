"use client"

interface CatalogueTagsBarProps {
  onTagsChange?: (activeTags: string[]) => void
}

const CatalogueTagsBar = (_props: CatalogueTagsBarProps) => {
  // Quick filters are temporarily hidden.
  // <nav className={styles.tagsBar} aria-label="Быстрые фильтры">...</nav>
  return null
}

export default CatalogueTagsBar
