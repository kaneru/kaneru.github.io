---
layout: post
title: 'Превью для Твиттера в Джекилл'
date: 2020-11-25 09:30 +09:00
tags: ['#100DaysToOffload', 'блог', 'мета', 'сео', 'джекилл', 'твиттер']
---

Это Пост 28 из 100 челленджа [#100DaysToOffload]({{ site.url }}/tags/#100daystooffload). Подробнее о челлендже [тут]({{ site.url }}/100-days-to-offload).

Вастрик [пишет](https://vas3k.ru/notes/how_to_blog/#scroll190):

> Первый обязательный технический шаг — сделать так, чтобы ссылка на ваш пост смотрелась идеально в любых ситуациях. На превью в твиттере, в анонсе на канале телеграма, даже будучи сохранённой в Pocket.

Этим утром я рано встал, в 05:00, заварил кофе и пошёл курить мануалы, постигать сеошную магию.

<figure>
  <img src="{{ site.url }}/assets/images/twitter-cards-on-jekyll/geek.jpg" data-action="zoom" alt="Гик, сидящий в трусах, копается в компьютере." >
  <figcaption>Это — редакция нашего блога в 6 часов утра настраивает СЕО для данного блога.</figcaption>
</figure>

Взял первую попавшуюся [статью](https://brianbunke.com/blog/2017/09/06/twitter-cards-on-jekyll/) о том, как сделать Твиттер карточки для [Джекилл](https://jekyllrb.com/). ~~Спиздил~~ позаимствовал код для их настройки. Его надо вставить внутрь тега `<head>`. Вот он:

```html {% raw %}
<!-- Twitter cards -->
<meta name="twitter:site" content="@{{ site.twitter_username }}">
<meta name="twitter:creator" content="@{{ site.author }}">

{% if page.title %}
  <meta name="twitter:title" content="{{ page.title }}">
{% else %}
  <meta name="twitter:title" content="{{ site.title }}">
{% endif %}

{% if page.summary %}
  <meta name="twitter:description" content="{{ page.summary }}">
{% else %}
  <meta name="twitter:description" content="{{ site.description }}">
{% endif %}

{% if page.image %}
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:image" content="{{ site.url }}{{ page.image }}">
{% else %}
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:image" content="{{ site.url }}{{ site.title_image }}">
{% endif %}{% endraw %}
<!-- end of Twitter cards -->
```

Тут всё просто: определяете в YAML Front Matter страницы переменные `title`, `summary`, и/или `image`, они же сгенерятся в превью. Если какой-то из переменных нет, то Джекилл возьмет дефолтные значения из [конфига](https://github.com/kaneru/kaneru.github.io/blob/master/_config.yml).

Вот например Front Matter для моего предыдущего поста. Стрелочкой отметил, что будет взято для Твиттер превью:

```yaml
---
layout: post
title: 'Игл — лучшее место для ваших сохранёнок' <-----
date: 2020-11-24 03:31 +09:00
tags: ['#100DaysToOffload', 'картинки', 'дизайн', 'шрифты', 'эстетика']
summary: 'Сохраняй ресурсы для дизайна как про.' <-----
image: '/assets/images/eagle/eagle.png'          <-----
---
```

Стоит ещё отметить, что:

- Для картинки в превью идеальные пропорции — это 2:1.
- Используйте [Validator Tool](https://cards-dev.twitter.com/validator) для проверки превью.
- ВК, Телеграм и другие сервисы используют эту жу технологию, поэтому превью для них вы сразу получаете приятным бонусом.

Следующий шаг — это настройка [JSON-LD Site](https://developers.google.com/search/docs/guides/intro-structured-data) и [Open Graph](https://ogp.me/). Этим я займусь потом 🤡.
