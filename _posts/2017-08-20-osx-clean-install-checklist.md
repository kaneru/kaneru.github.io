---
layout: post
title: Чеклист для clean install OS X
date: 2017-08-20 09:00:00
tags: osx
---

Делаю 1-2 раза в год clean install системы. Поэтому всегда стоит помнить, что нужно сделать перед переустановкой.

## Закладки из браузеров

Я не использую синхронизацию закладок, паролей, настроек и т.п. в облаке. Поэтому вручную экспортирую закладки из каждого бразуера в отдельный html-файл.

## Настройки браузеров

Для каждого браузера инструкция своя. И на самом деле настройки можно вытащить из Time Machine бэкапа.

## Docker tar's

Я пользуюсь self-hosted менеджером закладок Shaarli, docker-образ которого крутиться у меня на системе. О том как создать бэкап docker-образа можно прочитать [здесь](https://linuxconfig.org/docker-container-backup-and-recovery).

## Dotfiles

Потратьте пару часов на создание минимального набора dotfiles:

- Настройки текстового редактора;
- Настройки iTerm;
- .bashrc/.zshrc/%your_shell_name%;
- Скрипт для автоматической настройки всей системы OS X.

## Список установленных приложений

Нажал на клавишу F4 и сделал скриншоты установленных программ. По-хорошему надо написать скрипт, где через `brew cask` будут устанавливаться десктопные приложения.

## Список homebrew пакетов

Командой:

```shell
$ brew list > brew_list.txt
```

получаем список пакетов и сохраняем в отдельный файлик.

## Экспорт каналов из RSS агрегатора Vienna

Экспорт каналов в opml-файл.

## Полный бэкап через Time Machine

Я разделил внешний жёсткий диск на два раздела. Для Time Machine выделил 120 Гб, второй раздел форматнул под exFAT. На винде файлы нормально читаются и записываются.

## Заключение

Мой чеклист опциональный и дан в качестве примера. Советую вам расписать свой чеклист. Но некоторые могут ограничиться только Time Machine бэкапом.