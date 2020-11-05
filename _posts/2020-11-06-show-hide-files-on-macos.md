---
layout: post
title: 'Скрытие и отображение скрытых файлов в Макос'
date: 2020-11-06 03:52 +09:00
tags: ['#100DaysToOffload', 'макос', 'TIL', 'альфред']
---

Это Пост 19 из 100 челленджа [#100DaysToOffload]({{ site.url }}/tags/#100daystooffload). Подробнее о челлендже [тут]({{ site.url }}/100-days-to-offload).

TIL: Горячие клавиши `Cmd + Shift + .` отображают / скрывают скрытые файлы в Файндере. Всё, надеюсь не забуду, а то постоянно лезу в Гугл за помощью.

P.S. Модифицировал воркфлоу для Альфреда для этой задачи. В оригинальной версии воркфлоу автор исполняет шелл команду `defaults write com.apple.finder AppleShowAllFiles FALSE | TRUE` и потом перезагружает Файндер. Можно обойтись без перезагрузки, если симулировать нажатие горячих клавиш. Просто изменил Эппл-скрипт в воркфлоу на свой:

```
on alfred_script(q)
  tell application "System Events"
    keystroke "." using {command down, shift down}
  end tell
end alfred_script
```

[Ссылка на воркфлоу]({{ site.url }}/assets/files/show-hide-files-on-macos/Hidden Files (modified by kaneru).alfredworkflow)
