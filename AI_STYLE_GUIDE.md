# AI Style Guide (Landing Template Clear Coast)

Документ обязателен для **всех нейросетей/AI-ассистентов**, которые генерируют или изменяют код в этом проекте.

## 1) Общие правила

- Использовать стек проекта: **Next.js + TypeScript + SCSS Modules**.
- Писать стили только в файлах `*.module.scss`.
- Не использовать глобальные классы для компонентов (кроме уже существующих reset/глобальных правил).
- Не хардкодить цвета (`#fff`, `rgb(...)` и т.д.) внутри компонентных стилей.

## 2) БЭМ + CSS Modules

Использовать БЭМ-нейминг внутри `module.scss`:

- Блок: `.header`
- Элемент: `.header__logo`
- Модификатор: `.header--compact` или `.header__logo--small`

В React-компонентах обращаться к классам только через объект модуля:

- `import styles from './header.module.scss'`
- `className={styles.header}`
- для комбинаций классов использовать `clsx`

### Пример

```tsx
import clsx from "clsx"
import styles from "./card.module.scss"

export function Card({ compact = false }: { compact?: boolean }) {
  return (
    <section className={clsx(styles.card, compact && styles["card--compact"])}>
      ...
    </section>
  )
}
```

## 3) Компонент `Button` обязателен для кнопок

Путь: `src/components/ui/Button/index.tsx`

Использовать готовый компонент `Button`, а не писать вручную `<button>` со своими цветовыми классами, если это обычная UI-кнопка проекта.

Доступные `color`/`hoverColor`:

- `'white'`
- `'black'`
- `'yellow'`
- `'begie'`
- `'blue'`

Пример:

```tsx
import Button from "@/components/ui/Button"
;<Button color="yellow" hoverColor="black">
  Оставить заявку
</Button>
```

## 4) Компонент `IconImage` обязателен для иконок/малых изображений

Путь: `src/components/ui/IconImage/index.tsx`

Для иконок и компактных визуальных элементов использовать `IconImage` вместо прямого дублирования обвязки `next/image`.

Минимальные требования:

- обязательно передавать `alt`
- указывать `iconLink`
- при необходимости использовать `className`/`imageClassName`

Пример:

```tsx
import IconImage from "@/components/ui/IconImage"
;<IconImage
  iconLink="/icons/header/logo.svg"
  alt="Логотип Clear Coast"
  loading="lazy"
/>
```

## 5) Цвета брать только из `globals.css`

Источник токенов: `src/app/globals.css`

Разрешено использовать только CSS-переменные через `var(...)`, например:

- `var(--White-White-100)`
- `var(--Black-100)`
- `var(--Yellow-100)`
- `var(--Begie-100)`
- `var(--Blue-100)`
- `var(--Grey-Grey-100)` ... `var(--Grey-Grey-900)`
- `var(--Black-100-20)`
- `var(--Gradient-max)`
- `var(--Gray-bg-100)`

Важно:

- В `globals.css` переменная `--Begie-100` объявлена дважды.
- Фактически применяется **последнее** значение: `#f4f4f1`.

## 6) Семантически корректная разметка обязательна

Использовать семантические HTML-теги по назначению:

- `header`, `main`, `section`, `article`, `nav`, `footer` — для структуры страницы
- заголовки `h1`..`h4` — в правильной иерархии без пропусков по смыслу
- для изображений всегда задавать корректный `alt`

Не использовать `div` там, где есть подходящий семантический тег.

## 7) Чеклист для AI перед выдачей кода

Перед ответом убедиться, что:

- [ ] Стили компонента находятся в `*.module.scss`
- [ ] Нейминг классов следует БЭМ
- [ ] Для кнопок используется `Button`
- [ ] Для иконок/малых изображений используется `IconImage`
- [ ] Цвета берутся только через `var(...)` из `src/app/globals.css`
- [ ] HTML-разметка семантически корректна
- [ ] Нет новых хардкодов цветов в компонентах
- [ ] Адаптив реализован через миксины из `src/app/mixins.scss`

## 8) Адаптив и медиазапросы

Все адаптивные стили (media queries) должны быть написаны исключительно с использованием готовых миксинов из файла `src/app/mixins.scss`. Запрещено писать `@media` запросы напрямую в компонентах.

Доступные миксины:

- `@include screen-lg` (1440px - 1919px)
- `@include screen-md` (1024px - 1439px)
- `@include screen-sm` (768px - 1023px)
- `@include screen-xss` (max 767px)

Свойства не наследуются каскадом вниз, то есть если в @include screen-lg мы задали padding 40px, то в @include screen-md padding будет не 40px, поэтому нужно задавать padding для каждого миксина отдельно.

Пример использования в `*.module.scss`:

```scss
@import "@/app/mixins.scss";

.section {
  padding: 40px;

  @include screen-xss {
    padding: 20px;
  }
}
```
