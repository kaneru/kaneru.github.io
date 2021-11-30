---
layout: post
title: 'Создаем компонент прокручиваемого контейнера на Реакте'
date: 2021-11-30 22:58 +09:00
tags: ['react', 'typescript', 'фронтенд']
image: /assets/images/react-scrollable-container/preview.jpg
summary: 'Реализация прокручиваемого контейнера на Реакте с контролами'
---

Задача — требуется реализовать компонент-контейнер:

- в который можно просто передать список карточек
- который ограничен по ширине
- который скроллится по горизонтали
- который имеет базовые контролы — стрелочки влево и вправо

Будем учитывать, что:

- Лучше реализовать свой компонент, чужие раздувают бандл
- Есть реализация от [TJ Fogarty](https://tj.ie/scrollable-container-controls-with-react/), но она написана с использованием классовых компонентов, а так хочется хуки и Тайпскрипт. За основу я взял его реализацию.

В итоге получим такой компонент:

<iframe src="https://codesandbox.io/embed/scrollable-container-demo-nfbhc?autoresize=1&fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="Scrollable Container Demo"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>


*В iframe компонент может работать не так, как надо. Если просколлить вправо до упора, кнопка и тень не исчезают. Лучше перейти в сам codesandbox. Пока думаю, как исправить.*

## Наивная реализация

Краткий план:

- Создать контейнер с вертикальным скроллом
- Расположить внутрь dummy карточки
- Добавить стили, чтобы работала горизонтальная прокрутка

Создадим файл компонента `scrollable-container.tsx`. Структура: обёртка — обычный `div`, внутри обёртки ненумерованный список `ul` с элементами `li`.

```tsx
export const ScrollableContainer = () => {
  return (
    <div className="scrollableContainer">
      <ul className="list">
        <li className="item">1</li>
        <li className="item">2</li>
        <li className="item">3</li>
        <li className="item">4</li>
        <li className="item">5</li>
        <li className="item">6</li>
        <li className="item">7</li>
      </ul>
    </div>
  );
};
```

Для дива-обёртки назначим относительную позицию, чтобы потом расставить абсолютно кнопки по бокам. Список у нас будет флексовым, добавим `overflow-x: auto`, чтобы он скроллился по горизонтали, если элементы не влезут. Сбросим дефолтные стили у списка. Элементам-карточкам зададим базовые стили, чтобы смотрелись красиво и зададим важное свойство `flex-shrink: 0`, чтобы карточки не сжимались внутри списка.

```css
.scrollableContainer {
  position: relative;
}

.list {
  display: flex;
  overflow-x: auto;
  list-style: none;
  padding: 0;
  margin: 0;
}

.item {
  display: flex;
  width: 12.5rem;
  height: 12.5rem;
  background-color: aquamarine;
  border-radius: 8px;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  flex-shrink: 0;
}

.item:not(:last-child) {
  margin-right: 1em;
}
```

Также не забудем ограничить ширину контейнера страницы:

```css
.App {
  font-family: sans-serif;
  text-align: center;
  max-width: 540px;
  margin: 0 auto;
}
```

<figure>
  <img src="/assets/images/react-scrollable-container/scrollableContainer_animation_1.gif" alt="" />
</figure>

Уже в принципе неплохо выглядит и работает. Для чисто мобильного сайта пойдёт, но на десктопе будет неочевидно, что контейнер можно скроллить. Поэтому добавим кнопки.

## Определение возможности скролла и добавление кнопок

Что сделаем?

- Создадим состояния для определения возможности скролла влево или вправо — `canScrollLeft` и `canScrollRight`
- С помощью хука `useRef` получим доступ к свойствам списка
- Отследим свойства списка, который содержит контент
    - Свойства
        - `scrollLeft` — количество пикселей, на которое прокручен контент списка
        - `scrollWidth` — ширина контента с учетом горизонтальной прокрутки
        - `clientWidth` — ширина списка без учета горизонтальной прокрутки
    - Если `scrollLeft`  больше нуля, то можно скроллить влево. Если упремся в левую стенку `scrollLeft` будет равен нулю.
    - Если `scrollLeft` не равен разности `scrollWidth` и `clientWidth`, то можно скроллить вправо. Если упремся в правую стенку `scrollLeft` равен `scrollWidth - clientWidth`.
- Обернем функцию `checkForScrollPosition` в `debounce`. Так функция `checkForScrollPosition` будет вызыватся не более одного раза в 200 миллисекунд.
- Создадим функцию `scrollContainerBy` с одним аргументом — количество пикселей, на которое будем скроллить список
- Создадим эффект, внутри которого навесим обработку события `scroll` на список, а еще будем проверять возможность скролла. Также не забудем сбросить эффект.
- Отобразим кнопки с учетом возможности скролла. Обработаем событие `onClick`, передав функцию `scrollContainerBy`. Если скроллить нельзя, то кнопка становится неактивной.

Файл `scrollable-container.tsx`:

```tsx
import { useState, useRef, useEffect } from "react";
import debounce from "lodash.debounce";

export const ScrollableContainer = () => {
  const [canScrollLeft, setCanScrollLeft] = useState<boolean>(false);
  const [canScrollRight, setCanScrollRight] = useState<boolean>(false);

  const listRef = useRef<HTMLUListElement>(null);

  const checkForScrollPosition = () => {
    const { current } = listRef;
    if (current) {
      const { scrollLeft, scrollWidth, clientWidth } = current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft !== scrollWidth - clientWidth);
    }
  };

  const debounceCheckForScrollPosition = debounce(checkForScrollPosition, 200);

  const scrollContainerBy = (distance: number) =>
    listRef.current?.scrollBy({ left: distance, behavior: "smooth" });

  useEffect(() => {
    const { current } = listRef;
    checkForScrollPosition();
    current?.addEventListener("scroll", debounceCheckForScrollPosition);

    return () => {
      current?.removeEventListener("scroll", debounceCheckForScrollPosition);
      debounceCheckForScrollPosition.cancel();
    };
  }, []);

  return (
    <div className="scrollableContainer">
      <ul className="list" ref={listRef}>
        <li className="item">1</li>
        <li className="item">2</li>
        <li className="item">3</li>
        <li className="item">4</li>
        <li className="item">5</li>
        <li className="item">6</li>
        <li className="item">7</li>
      </ul>
      <button
        type="button"
        disabled={!canScrollLeft}
        onClick={() => scrollContainerBy(-400)}
      >
        ←
      </button>
      <button
        type="button"
        disabled={!canScrollRight}
        onClick={() => scrollContainerBy(400)}
      >
        →
      </button>
    </div>
  );
};

```

Теперь можно скроллить с помощью кнопок.

<figure>
  <img src="/assets/images/react-scrollable-container/scrollableContainer_animation_2.gif" alt="" />
</figure>

## Последние штрихи

Тут я добавил круглые кнопки, расположил их по бокам контейнера, добавил тени, которые подсказывают, что контейнер прокручиваемый. Если уперлись в стену, то кнопку и тень скрываем. Кнопку и тени подсмотрел у [Альфабанка](https://alfabank.ru/).

Файл `scrollable-container.tsx`:

```tsx
import { useState, useRef, useEffect } from "react";
import cn from "classnames";
import debounce from "lodash.debounce";

export const ScrollableContainer = () => {
  const [canScrollLeft, setCanScrollLeft] = useState<boolean>(false);
  ...

  return (
    <div className="scrollableContainer">
      <ul className="list" ref={containerRef}>
        ...
      </ul>
      <button
        type="button"
        disabled={!canScrollLeft}
        onClick={() => scrollContainerBy(-400)}
        className={cn("button", "buttonLeft", {
          "button--hidden": !canScrollLeft
        })}
      >
        ←
      </button>
      <button
        type="button"
        disabled={!canScrollRight}
        onClick={() => scrollContainerBy(400)}
        className={cn("button", "buttonRight", {
          "button--hidden": !canScrollRight
        })}
      >
        →
      </button>
      {canScrollLeft ? (
        <div className="shadowWrapper leftShadowWrapper">
          <div className="shadow leftShadow" />
        </div>
      ) : null}
      {canScrollRight ? (
        <div className="shadowWrapper rightShadowWrapper">
          <div className="shadow rightShadow" />
        </div>
      ) : null}
    </div>
  );
};

```

Файл `styles.css`:

```css
.button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: none;
  background-color: #fff;
  box-shadow: 0 4px 8px rgb(0 0 0 / 20%);
  font-size: 1.2rem;
  cursor: pointer;
  z-index: 2;
}

.buttonLeft {
  left: -20px;
}

.buttonRight {
  right: -20px;
}

.button--hidden {
  display: none;
}

.shadowWrapper {
  width: 30px;
  height: 100%;
  overflow: hidden;
  z-index: 1;
  position: absolute;
  top: 0;
}

.leftShadowWrapper {
  left: 0;
}

.rightShadowWrapper {
  right: 0;
}

.shadow {
  position: absolute;
  box-shadow: 0 0 30px -8px #232628;
  position: absolute;
  z-index: 1;
  top: 50%;
  right: -25px;
  width: 24px;
  height: 80%;
  border-radius: 50%;
  transform: translateY(-50%);
}

.leftShadow {
  box-shadow: 0 0 30px -8px #232628;
  left: -25px;
}

.rightShadow {
  box-shadow: 0 0 30px -8px #232628;
  right: -25px;
}
```

Итоговый вариант:

<figure>
  <img src="/assets/images/react-scrollable-container/scrollableContainer_animation_3.gif" alt="" />
</figure>

## Что можно сделать лучше

- Скрыть скроллбар
- Прокинуть элементы-карточки через проп
- Добавить свойства `scroll-snap-type` и `scroll-snap-align`

## Ссылки

- [Ссылка на готовый codesandbox](https://codesandbox.io/s/scrollable-container-demo-nfbhc)
- [TJ Fogarty — Scrollable Container Controls with React](https://tj.ie/scrollable-container-controls-with-react/)
- [Сайт Альфа-Банка](https://alfabank.ru/)
