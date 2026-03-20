import Page from "@/components/ui/Page"
import CatalogueSection from "@/components/CataloguePage/CatalogueSection"

import styles from "./page.module.scss"

export default function CataloguePage() {
  return (
    <Page className={styles.page}>
      <CatalogueSection />
    </Page>
  )
}
