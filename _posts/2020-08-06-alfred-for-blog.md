---
layout: post
title: 'Автоматизация ведения блога с помощью Альфреда'
date: 2020-08-06 01:01 +09:00
tags: ['#100DaysToOffload', 'альфред', 'автоматизация']
---

Это День 9 из 100 челленджа [#100DaysToOffload]({{ site.url }}/tags/#100daystooffload). Подробнее о челлендже [тут]({{ site.url }}/100-days-to-offload).

Дотянулись руки до написания простенького воркфлоу для Альфреда, который создаёт заготовку для нового поста в блог в соответствующей папке.

<figure>
  <img src="{{ site.url }}/assets/images/alfred-for-blog/alfred.jpg" data-action="zoom" alt="Скриншот моего воркфлоу в программе Альфред на макОС. Изображена команда 'blog', которая создает новый пост в репозитории блога из шаблона.">
</figure>

Как работает воркфлоу:

1. Вызываю Альфред, пишу ключевое слово `blog` и название файла через пробел. Название файла будет запросом.
2. Воркфлоу передаёт запрос и запускает скрипт, который принимает запрос, берёт текущую дату и создает в директории блога файл типа `2020-08-06-alfred-for-blog.md`.
3. Скрипт в конце заполнит файл YAML заголовками (пустой заголовок поста, текущие дата и время, теги).

Скрипт незаурядный:

```bash
query=$(echo $1 | sed "s/ /-/g")

current_date=$(date +"%Y-%m-%d")
current_time=$(date +"%H:%M")

cd ~/dev_hobby/kaneru.github.io/_posts

touch $current_date-$query.md

echo "---
layout: post
title: ''
date: ${current_date} ${current_time} +09:00
tags: ['#100DaysToOffload']
---" > $current_date-$query.md
```

[**Скачать воркфлоу для Альфреда 4**]({{ site.url }}/assets/files/alfred-for-blog/Automate Blog Routine.alfredworkflow)
