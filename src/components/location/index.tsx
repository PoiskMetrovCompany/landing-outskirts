"use client"

import { useState } from "react"

import RequestDialog from "@/components/RequestDialog"
import Button from "@/components/ui/Button"
import styles from "./location.module.scss"
import { Map } from "./map/map"

const Location = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const openRequestDialog = () => setIsDialogOpen(true)

  return (
    <section
      id="contacts"
      className={styles.location}
      aria-label="Адрес и контакты"
    >
      <div className={styles.location__header}>
        <h2 className={styles.location__title}>Адрес и контакты</h2>
      </div>

      <div className={styles.location__content}>
        <div className={styles.location__map}>
          <Map />
        </div>

        <article className={styles.location__contacts}>
          <div className={styles.location__contactsTop}>
            <div className={styles.location__group}>
              <p className={styles.location__label}>Жилой комплекс</p>
              <h3 className={styles.location__value}>
                г. Новосибирск, <br />
                1-Ая Чулымская д. 116
              </h3>
            </div>

            <div className={styles.location__group}>
              <p className={styles.location__label}>Контакты</p>
              <p className={styles.location__value}>+7 (800) 444-40-45</p>
            </div>
          </div>

          <Button
            className={styles.location__button}
            color="gray-2"
            onClick={openRequestDialog}
          >
            Связаться с нами
          </Button>
        </article>
      </div>

      <RequestDialog isOpen={isDialogOpen} onOpenChange={setIsDialogOpen} />
    </section>
  )
}

export default Location
