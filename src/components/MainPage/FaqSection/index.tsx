"use client"

import React, { useState } from "react"
import * as Accordion from "@radix-ui/react-accordion"
import clsx from "clsx"
import styles from "./faqSection.module.scss"
import IconImage from "@/components/ui/IconImage"
import Button from "@/components/ui/Button"
import RequestDialog from "@/components/RequestDialog"
import moreLinkStyles from "@/components/ui/MoreLink/moreLink.module.scss"

interface FaqItem {
  id: string
  number: string
  question: string
  answer: string
}

const FAQ_DATA: FaqItem[] = [
  {
    id: "item-1",
    number: "1.",
    question: "Квартиры сдаются с ремонтом или без?",
    answer:
      "С ремонтом - и это не голые стены с парой розеток. Обои, двери, плинтуса, готовые санузлы, розетки, подведенные коммуникации для кухни - все на месте. Отделка - светлая, нейтральная, аккуратная. Можно заезжать в день получения ключей: привезти мебель, повесить шторы - и вы дома.",
  },
  {
    id: "item-2",
    number: "2.",
    question:
      "Какие ипотечные программы доступны и реально ли купить без огромных накоплений?",
    answer:
      "Реально. Действуют семейная ипотека от 6% и субсидированная ипотека от 4,1%. Есть программа субсидирования первоначального взноса - застройщик помогает тем, у кого пока нет крупной суммы на руках. Для строящихся домов предусмотрена рассрочка: около 60% - первый взнос, остальное - равными частями до ввода дома. Для сравнения: ипотечный платеж за двушку может составлять около 28 000 рублей в месяц - во многих случаях это дешевле аренды аналогичной квартиры.",
  },
  {
    id: "item-3",
    number: "3.",
    question:
      "Комплекс правда находится за пределами Новосибирска? Это проблема?",
    answer:
      "Формально - да, территория пока относится к поселку Садовый. На практике это ощущается минимально: микрорайон Родники с его инфраструктурой - через дорогу. А вот бонусы вполне ощутимы: пониженные коммунальные платежи и скидка на автострахование. Присоединение к городу запланировано ориентировочно к 2030 году - после этого «Околица» станет полноценным городским районом, а стоимость жилья, скорее всего, скорректируется вверх.",
  },
  {
    id: "item-4",
    number: "4.",
    question:
      "Есть ли школы и детские сады или придется возить детей через весь город?",
    answer:
      "Застройщик строит школу в шаговой доступности от жилых домов, а также закладывает в проект детские сады для жителей микрорайона. Пока они достраиваются, семьи прикрепляются к учреждениям в соседних Родниках - без очередей и сложностей. Одна из жительниц рассказала: «Сад получили без проблем, старший в школу пошел без проблем».",
  },
  {
    id: "item-5",
    number: "5.",
    question: "Как обстоят дела с магазинами прямо у дома?",
    answer:
      "Крупные торговые точки - Ашан, Лента, Леруа Мерлен, Магнит, Пятерочка - расположены в непосредственной близости, до них можно дойти пешком. Пункты выдачи Wildberries и Ozon тоже рядом. На самой территории комплекса продуктовая инфраструктура пока развивается, но с ростом числа жителей новые магазины открываются - это естественный процесс для молодого района.",
  },
  {
    id: "item-6",
    number: "6.",
    question: "Насколько теплые дома? Не замерзнем зимой?",
    answer:
      "Дома построены из панелей 18-й серии с бесшовным монтажом - панели стыкуются без зазоров, как элементы конструктора. Это дает заметно лучшую теплоизоляцию по сравнению с обычным панельным строительством. Жильцы подтверждают: «Зимой не мерзли, от окон не дуло, полы нормальные». Тем не менее при приемке рекомендуем проверить межпанельные швы - пригласите мастера с тепловизором, чтобы убедиться, что в вашей конкретной квартире все в порядке.",
  },
  {
    id: "item-7",
    number: "7.",
    question: "А что со звукоизоляцией? Это же панельный дом.",
    answer:
      "Панель панели рознь. Технология бесшовного монтажа, которую применяет КПД-Газстрой, существенно снижает шумопроницаемость. Часть жильцов отмечает: «Соседей практически не слышно». Справедливости ради - отзывы разнятся в зависимости от конкретного дома и расположения квартиры. Рекомендуем при просмотре обратить внимание на этот момент и, если возможно, поговорить с уже заселившимися соседями.",
  },
  {
    id: "item-8",
    number: "8.",
    question: "Что проверять при приемке квартиры?",
    answer:
      "Восемь пунктов, которые сэкономят вам нервы. Межпанельные швы - закажите проверку тепловизором. Окна - герметичность, отсутствие конденсата и сквозняков. Двери - петли, замки, отсутствие перекосов. Полы - ровность, плотное прилегание покрытия. Сантехника - откройте все краны, проверьте батареи на протечки. Электрика - каждая розетка и каждый выключатель. Стены - качество поклейки обоев, отсутствие трещин. Вентиляция - приложите лист бумаги к вытяжке в санузле и кухне. Все, что вызывает вопросы, фиксируйте в акте приема-передачи - на эти недочеты распространяется гарантия застройщика.",
  },
  {
    id: "item-9",
    number: "9.",
    question: "Для кого этот ЖК подходит лучше всего?",
    answer:
      "«Околица» - логичный выбор для тех, кто покупает первое жилье и не хочет переплачивать за чужой лейбл. Для молодых семей, которым нужна своя квартира с детской площадкой под окнами, а не съемная однушка с запретом на гвозди в стене. Для тех, кто работает удаленно и ценит тишину и природу больше, чем вид на соседний офисный центр. И для тех, кто умеет считать: купить сейчас по стартовой цене в развивающемся районе - значит через несколько лет оказаться владельцем квартиры, которая стоит заметно дороже.",
  },
]

const INITIAL_VISIBLE_ITEMS = 4

const FaqSection = () => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const openRequestDialog = () => setIsDialogOpen(true)

  const visibleFaqItems = isExpanded
    ? FAQ_DATA
    : FAQ_DATA.slice(0, INITIAL_VISIBLE_ITEMS)

  return (
    <section className={styles.faqSection}>
      <h2 className={styles.faqSection__title}>Частые вопросы</h2>

      <div className={styles.faqSection__content}>
        <Accordion.Root
          type="single"
          collapsible
          className={styles.faqSection__accordion}
        >
          {visibleFaqItems.map((item) => (
            <Accordion.Item
              key={item.id}
              value={item.id}
              className={styles.faqSection__item}
            >
              <Accordion.Header className={styles.faqSection__header}>
                <Accordion.Trigger className={styles.faqSection__trigger}>
                  <div className={styles.faqSection__questionRow}>
                    <span className={styles.faqSection__number}>
                      {item.number}
                    </span>
                    <span className={styles.faqSection__question}>
                      {item.question}
                    </span>
                  </div>
                  <div className={styles.faqSection__arrow}>
                    <IconImage
                      iconLink="/icons/main-page/questions-arrow.svg"
                      className={styles.faqSection__arrowIconWrap}
                      imageClassName={styles.faqSection__arrowIcon}
                      alt="Иконка раскрытия ответа"
                      loading="lazy"
                    />
                  </div>
                </Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Content className={styles.faqSection__answerContent}>
                <p className={styles.faqSection__answer}>{item.answer}</p>
              </Accordion.Content>
            </Accordion.Item>
          ))}
        </Accordion.Root>

        <button
          type="button"
          onClick={() => setIsExpanded((previousValue) => !previousValue)}
          className={clsx(
            moreLinkStyles.moreLink,
            moreLinkStyles["moreLink--dark"],
            styles.faqSection__showMoreButton,
          )}
        >
          {isExpanded ? "Скрыть все" : "Показать еще"}
        </button>

        <article className={styles.faqSection__promoCard}>
          <div
            className={clsx(
              styles.faqSection__promoIconWrap,
              styles.faqSection__promoIconWrapDesktop,
            )}
          >
            <IconImage
              iconLink="/icons/main-page/question.svg"
              className={styles.faqSection__promoIconBox}
              imageClassName={styles.faqSection__promoIcon}
              alt="Декоративный знак вопроса"
              loading="lazy"
            />
          </div>
          <div
            className={clsx(
              styles.faqSection__promoIconWrap,
              styles.faqSection__promoIconWrapMobile,
            )}
          >
            <IconImage
              iconLink="/icons/main-page/question-mobile.svg"
              className={styles.faqSection__promoIconBox}
              imageClassName={styles.faqSection__promoIcon}
              alt="Декоративный знак вопроса"
              loading="lazy"
            />
          </div>
          <div className={styles.faqSection__promoText}>
            <h3 className={styles.faqSection__promoTitle}>Остались вопросы?</h3>
            <p className={styles.faqSection__promoDescription}>
              Задайте нам свой вопрос, <br />
              мы свяжемся с вами
            </p>
          </div>
          <div className={styles.faqSection__promoButtonWrap}>
            <Button
              className={styles.faqSection__promoButton}
              color="begie"
              onClick={openRequestDialog}
            >
              Задать вопрос
            </Button>
          </div>
        </article>
      </div>

      <RequestDialog isOpen={isDialogOpen} onOpenChange={setIsDialogOpen} />
    </section>
  )
}

export default FaqSection
