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
    question:
      "Территория действительно огорожена? Или только парк?",
    answer:
      "Вся жилая территория ЖК закрыта двумя контурами ограждения. Первый - внешний периметр с пропускной системой для автомобилей (распознавание номеров). Второй - непосредственно зона парка и дворов, куда проходят только жители по чипу или приложению. Охрана дежурит круглосуточно, на территории - более 80 камер, записи доступны жителям со смартфона.",
  },
  {
    id: "item-2",
    number: "2.",
    question:
      "Когда появится школа? Детей сейчас возить далеко?",
    answer:
      "Строительство образовательного парка «Яшкола» идет прямо в микрорайоне. Сдача - III квартал 2027 года, 1 200 мест, два бассейна, стадион. До этого работает школа №72 в 650 метрах и детский сад на Лесоперевалке. На территории ЖК - частный сад (платно). Застройщик обязан сдать «Яшколу» одновременно с новыми домами - это условие, а не обещание.",
  },
  {
    id: "item-3",
    number: "3.",
    question: "С парковками все так плохо, как пишут на форумах?",
    answer:
      "В домах первой очереди подземных паркингов нет - только наружные стоянки. После 23:00 место найти сложнее. В новых корпусах подземный паркинг предусмотрен по умолчанию. Если для вас это принципиально - уточняйте наличие паркинга конкретно в том доме, который рассматриваете.",
  },
  {
    id: "item-4",
    number: "4.",
    question: "Что такое white box? Придется ли делать ремонт с нуля?",
    answer:
      "White box - это чистовая черновая отделка. Стены выровнены и подготовлены под покраску, стяжка залита, сантехника установлена, плитка в санузле уложена, розетки, выключатели и радиаторы - на месте. Грязных работ нет. Нужно только: покрасить стены или поклеить обои, положить напольное покрытие и разместить мебель. Если хотите въехать без ремонта вообще - берите вариант «под ключ».",
  },
  {
    id: "item-5",
    number: "5.",
    question: "Можно ли включить стоимость ремонта в ипотеку?",
    answer:
      "Да. Застройщик предоставляет такую возможность - стоимость отделки добавляется к телу кредита при одобрении ипотеки. Это удобно: не нужно искать отдельные деньги на ремонт после покупки квартиры.",
  },
  {
    id: "item-6",
    number: "6.",
    question: "Насколько ветрено у реки? Это реально мешает?",
    answer:
      "Ветер с Оби - часть жизни в этом микрорайоне. Особенно ощутимо в осенне-зимний период. Жители первых домов обращались к застройщику с просьбой сделать ветрозащитные беседки. Компания построила теплый павильон у катка. Если вы часто гуляете с детьми в холод, это стоит учитывать при выборе квартиры - лучше выбирать корпус с двором, закрытым от господствующего западного ветра.",
  },
  {
    id: "item-7",
    number: "7.",
    question: "Слышно ли соседей? Какая звукоизоляция?",
    answer:
      "По отзывам жителей - картина неоднородная. В домах первых очередей часть жильцов отмечала недостаточную звукоизоляцию. В новых корпусах застройщик применяет монолит с кирпичным заполнением и улучшенные стыки между секциями. При приемке квартиры рекомендуем проверить звукоизоляцию самостоятельно или привлечь независимого эксперта.",
  },
  {
    id: "item-8",
    number: "8.",
    question: "Промерзают ли стены со стороны реки?",
    answer:
      "В части квартир первых домов такие случаи были зафиксированы и широко обсуждались на форумах. Застройщик признал проблему и устранял ее по гарантии. В новых корпусах применяется комбинированный фасад: кирпичный цоколь плюс утепленная штукатурка сверху - это дополнительный слой теплоизоляции. При осмотре квартиры обращайте внимание на углы и зоны примыкания к балкону.",
  },
  {
    id: "item-9",
    number: "9.",
    question: "ЖК Весна и ЖК VESNA - это то же самое, что Ясный берег?",
    answer:
      "Застройщик один - АКВА-СИТИ. Но это разные проекты. Ясный берег занимает первую береговую линию у Оби. VESNA строится на второй линии - между Ясным берегом и частным сектором. У каждого комплекса своя огороженная территория, но парковые пространства доступны жителям обоих ЖК. Жилой микрорайон продолжает расти.",
  },
  {
    id: "item-10",
    number: "10.",
    question: "Что с воздухом? ТЭЦ и цементный завод рядом - это заметно?",
    answer:
      "Часть жителей отмечает периодическую пыль и запах в ветреную погоду - особенно когда ветер дует со стороны промышленной зоны. Это реальный фактор, который стоит учитывать. При этом большинство жителей, включая тех, кто упоминал этот минус, не торопятся продавать квартиры и даже берут следующую - побольше, здесь же.",
  },
  {
    id: "item-11",
    number: "11.",
    question:
      "Насколько безопасно рядом? Частный сектор соседствует вплотную.",
    answer:
      "До появления шлагбаума и системы пропусков случаи с нежелательными гостями из соседнего частного сектора были. Сейчас территория закрыта, и охрана разворачивает посторонних. Внутри двора жители чувствуют себя безопасно - видеонаблюдение, чип на калитке, круглосуточный пост. За периметром - жить в обычном городе, ничего неожиданного.",
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
