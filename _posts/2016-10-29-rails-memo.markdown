---
layout: post
title:  "rails memo"
date:   2016-10-29 00:17:00 +0900
---
Заметки по Rails.

# assets:precompile

На слабом VDS команда `rails assets:precompile` может иногда не выполнятся, т.к. не хватает оперативной памяти. Решения:

1. `sudo reboot`;
2. Добавить больше swap памяти;
3. Арендовать более мощный VDS.

[(moar)](http://stackoverflow.com/questions/14991365/command-failed-with-status-when-precompiling-assets)

# static pages

Для создания статичных страниц необходимо выполнить следующее:

```ruby
rails g controller StaticPages home about help
```

Данная команда создаст контроллер со следующими действиями:

```ruby
class StaticPagesController < ApplicationController
  def home
  end

  def about
  end

  def help
  end
end
```

Затем необходимо обновить файл `routes.rb`:

```ruby
Rails.application.routes.draw do
  root to: 'static_pages#home'
  get '/about', to: 'static_pages#about'
  get '/help', to: 'static_pages#help'
end
```

# nil? vs if true vs empty? vs blank?

![Imgur](http://i.imgur.com/TpzfhBe.png)

[source](http://stackoverflow.com/questions/885414/a-concise-explanation-of-nil-v-empty-v-blank-in-ruby-on-rails)

# db:migrate:reset

```bash
$ rails db:migrate:reset
```

Как-то раз в `schema.rb` в таблицу `posts` затесалась лишняя колонка из другой ветки. В миграциях этой колонки не было, поэтому с помощью этой команды можно ресетнуть БД. Команда эквивалентна следующему: `$ rails db:drop db:create db:migrate`.

# дружим paperclip и mina при деплое

Нужно отредактировать файл *config/deploy.rb* следующим образом:

```ruby
set :shared_paths, ['config/database.yml', 'config/secrets.yml', 'log', 'public/system']
```

Затем на сервере вручную создать директорию `~/app/shared/public/system/` и создать симлинк:

```bash
$ ln -s ~/app/shared/public/system/ ~/app/current/public/system/
```

# updates

[upd1 10-11-2016]: добавил разделы про *db:migrate:reset* и *paperclip и mina*
