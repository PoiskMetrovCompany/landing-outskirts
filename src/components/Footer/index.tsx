import Link from "next/link"

import Button from "@/components/ui/Button"
import IconImage from "@/components/ui/IconImage"

import styles from "./footer.module.scss"

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer__info}>
        <div className={styles.footer__topRow}>
          <Link
            href="/"
            className={styles.footer__logoLink}
            aria-label="Поиск Метров"
          >
            <IconImage
              iconLink="/icons/footer/logo-light.svg"
              alt="Поиск Метров"
              className={styles.footer__logoIcon}
              loading="lazy"
            />
          </Link>

          <div className={styles.footer__contactsGroup}>
            <a href="tel:+78004444045" className={styles.footer__phone}>
              +7 (800) 444-40-45
            </a>
            <Button
              color="yellow"
              href="/catalogue"
              className={styles.footer__ctaButton}
            >
              Выбрать квартиру
            </Button>
          </div>
        </div>

        <div className={styles.footer__bottomRow}>
          <Link href="/policy" className={styles.footer__legalLink}>
            Политика обработки персональных данных
          </Link>
          <Link href="/agreement" className={styles.footer__legalLink}>
            Согласие на получение рекламной рассылки
          </Link>
        </div>
      </div>
    </footer>
  )
}

export default Footer
