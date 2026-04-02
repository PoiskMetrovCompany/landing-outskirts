"use client"

import clsx from "clsx"
import Link from "next/link"
import { useEffect, useState } from "react"

import Button from "@/components/ui/Button"
import IconImage from "@/components/ui/IconImage"
import RequestDialog from "@/components/RequestDialog"

import styles from "./header.module.scss"

const primaryNavLinks = [
  { href: "/catalogue", label: "Каталог квартир" },
  { href: "/#about", label: "О проекте" },
  { href: "/#mortgage", label: "Ипотека" },
]

const secondaryNavLinks = [
  { href: "/#advantages", label: "Преимущества" },
  { href: "/#contacts", label: "Контакты" },
]

const mobileNavGroups = [primaryNavLinks, secondaryNavLinks]

const socialLinks = [
  {
    href: "https://vk.com",
    label: "VK",
    icon: "/icons/header/mobile-menu/mobile-vk.svg",
  },
  {
    href: "tg://resolve?phone=78004444045",
    label: "Telegram",
    icon: "/icons/header/mobile-menu/mobile-tg.svg",
  },
  {
    href: "https://instagram.com",
    label: "Instagram",
    icon: "/icons/header/mobile-menu/mobile-inst.svg",
  },
]

const Header = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const htmlElement = document.documentElement
    const bodyElement = document.body

    if (!isMenuOpen) {
      htmlElement.style.overflow = ""
      bodyElement.style.overflow = ""

      return
    }

    htmlElement.style.overflow = "hidden"
    bodyElement.style.overflow = "hidden"

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false)
      }
    }

    const handleResize = () => {
      if (window.innerWidth >= 1440) {
        setIsMenuOpen(false)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    window.addEventListener("resize", handleResize)

    return () => {
      htmlElement.style.overflow = ""
      bodyElement.style.overflow = ""
      window.removeEventListener("keydown", handleKeyDown)
      window.removeEventListener("resize", handleResize)
    }
  }, [isMenuOpen])

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  const openRequestDialog = () => {
    setIsDialogOpen(true)
    setIsMenuOpen(false)
  }

  return (
    <header className={styles.header}>
      <div className={styles.header__inner}>
        <div className={styles.header__left}>
          <Link
            href="https://poisk-metrov.ru/"
            className={styles.header__logo}
          >
            <IconImage
              iconLink="/icons/header/logo-xl.svg"
              alt="Поиск Метров"
              className={styles.header__logoIcon}
            />
          </Link>

          <nav className={styles.header__nav}>
            <Button
              href="/catalogue"
              color="black"
              className={styles.header__catalogBtn}
            >
              <span className={styles.header__catalogLabel}>Каталог</span>
              <span className={styles.header__catalogWord}>квартир</span>
            </Button>
            <Link href="/#about" className={styles.header__navLink}>
              О проекте
            </Link>
            <Link href="/#mortgage" className={styles.header__navLink}>
              Ипотека
            </Link>
            <Link href="/#advantages" className={styles.header__navLink}>
              Преимущества
            </Link>
            <Link href="/#contacts" className={styles.header__navLink}>
              Контакты
            </Link>
          </nav>
        </div>

        <div className={styles.header__right}>
          <div className={styles.header__contacts}>
            <a href="tel:+78004444045" className={styles.header__phone}>
              +7 (800) 444-40-45
            </a>
            <div className={styles.header__iconButtons}>
              <Button
                href="tel:+78004444045"
                color="black"
                className={styles.header__iconBtn}
              >
                <IconImage
                  iconLink="/icons/header/phone.svg"
                  alt="Позвонить"
                  className={styles.header__btnIcon}
                />
              </Button>
              {/* <Button
                href="tg://resolve?phone=78004444045"
                color="black"
                className={styles.header__iconBtn}
              >
                <IconImage
                  iconLink="/icons/header/telegram.svg"
                  alt="Написать в Telegram"
                  className={styles.header__btnIcon}
                />
              </Button> */}
            </div>
          </div>

          <Button
            color="yellow"
            className={styles.header__ctaBtn}
            onClick={openRequestDialog}
          >
            Оставить заявку
          </Button>

          <Button
            color="black"
            className={styles.header__burgerBtn}
            onClick={() => setIsMenuOpen((prevState) => !prevState)}
            aria-expanded={isMenuOpen}
            aria-controls="header-mobile-menu"
            aria-label={isMenuOpen ? "Закрыть меню" : "Открыть меню"}
          >
            <IconImage
              iconLink={
                isMenuOpen
                  ? "/icons/header/mobile-menu/burger-manu-close.svg"
                  : "/icons/header/burger-menu.svg"
              }
              alt={isMenuOpen ? "Закрыть меню" : "Открыть меню"}
              className={styles.header__burgerIcon}
            />
          </Button>
        </div>
      </div>

      {isMenuOpen && (
        <div
          className={styles.header__menuOverlay}
          onClick={closeMenu}
          aria-hidden="true"
        >
          <div
            id="header-mobile-menu"
            className={styles.header__menuPanel}
            onClick={(event) => event.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="Мобильное меню"
          >
            <div className={styles.header__menuContent}>
              <nav className={styles.header__menuNav} aria-label="Навигация">
                <div className={styles.header__menuColumn}>
                  {primaryNavLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={clsx(
                        styles.header__menuLink,
                        styles["header__menuLink--primary"],
                      )}
                      onClick={closeMenu}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>

                <div className={styles.header__menuColumn}>
                  {secondaryNavLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={clsx(
                        styles.header__menuLink,
                        styles["header__menuLink--secondary"],
                      )}
                      onClick={closeMenu}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </nav>

              <nav
                className={styles.header__menuNavMobile}
                aria-label="Навигация для планшета"
              >
                {mobileNavGroups.map((group, groupIndex) => (
                  <div
                    key={`group-${groupIndex}`}
                    className={styles.header__menuNavGroup}
                  >
                    {group.map((link, linkIndex) => {
                      const isPrimary = groupIndex === 0

                      return (
                        <Link
                          key={`${link.href}-${linkIndex}`}
                          href={link.href}
                          className={clsx(
                            styles.header__menuRow,
                            isPrimary
                              ? styles["header__menuRow--primary"]
                              : styles["header__menuRow--secondary"],
                          )}
                          onClick={closeMenu}
                        >
                          <span>{link.label}</span>
                          <IconImage
                            iconLink="/icons/header/mobile-menu/mobile-arrow.svg"
                            alt=""
                            className={styles.header__menuRowArrow}
                          />
                        </Link>
                      )
                    })}
                  </div>
                ))}
              </nav>

              <div className={styles.header__menuDivider} />

              <div className={styles.header__menuFooter}>
                <div className={styles.header__menuContacts}>
                  <a
                    href="tel:+78004444045"
                    className={styles.header__menuPhone}
                  >
                    +7 (800) 444-40-45
                  </a>

                  <Button
                    color="transparent"
                    className={styles.header__menuCallback}
                    onClick={openRequestDialog}
                  >
                    <IconImage
                      iconLink="/icons/header/mobile-menu/mobile-phone.svg"
                      alt="Заказать звонок"
                      className={styles.header__menuCallbackIcon}
                    />
                    Заказать звонок
                  </Button>
                </div>

                <div className={styles.header__menuSocials}>
                  {socialLinks.map((link) => (
                    <Button
                      key={link.label}
                      href={link.href}
                      color="black"
                      className={styles.header__menuSocialButton}
                    >
                      <IconImage
                        iconLink={link.icon}
                        alt={link.label}
                        className={styles.header__menuSocialIcon}
                      />
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <RequestDialog isOpen={isDialogOpen} onOpenChange={setIsDialogOpen} />
    </header>
  )
}

export default Header
