---
layout: post
title: Сливаем два ластфм аккаунта вместе
date: 2017-07-18 17:07:00
tags: lastfm
---

Оказывается можно замерджить два ластфм аккаунта вместе. Для этого нужно:

1. Извлечь все прослушивания из первого аккаунта с помощью [этого сервиса](http://benjaminbenben.com/lastfm-to-csv/).
2. С помощью [Last.fm-Scrubbler-WPF
](https://github.com/coczero/Last.fm-Scrubbler-WPF#csv-scrobbling) заскробблить все треки из csv-файла, используя Import Mode.

Главный минус — изначальные даты прослушиваний похерятся.
