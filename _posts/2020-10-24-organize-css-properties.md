---
layout: post
title: 'Организация ЦСС свойств'
date: 2020-10-24 02:00 +09:00
tags: ['#100DaysToOffload', 'цсс']
---

Это Пост 17 из 100 челленджа [#100DaysToOffload]({{ site.url }}/tags/#100daystooffload). Подробнее о челлендже [тут]({{ site.url }}/100-days-to-offload).

Я раньше не задумывался, как организовывать ЦСС свойства. Однажды, наткнулся на статью [Better Ways to Organise CSS Properties](https://medium.com/swlh/better-ways-to-organise-css-properties-9a066e7ded62) и подумал, вот оно — решение проблемы. Но это решение сложное, оверсинк и сложно держится в голове.

Есть простое решение и наивное: **сортировать ЦСС свойства по алфавиту**.

```css
.list-item {
  align-items: center;
  display: flex;
  height: 30px;
  justify-content: center;
  width: 196px;
}
```
