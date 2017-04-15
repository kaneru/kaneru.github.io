---
layout: post
title:  "Читаемые URL'ы в рельсовом приложении (friendly_id)"
date:   2017-01-12 23:15:00
tags: rails
---
Для того, чтобы использовать красивые урлы вместо id в рельсовом приложении, необходимо установить два гема:

```ruby
gem 'friendly_id'
gem 'babosa'
```

Гем babosa нужен для транслитерации. Например у страницы с названием "Мама мыла раму" урл будет выглядеть как "mama-myla-ramu".

Затем создаем миграцию, в которой добавляем колонку `slug` в модель (в нашем случае `Post`):

```shell
rails g migration add_slug_to_posts
```

```ruby
class AddSlugToPosts < ActiveRecord::Migration[5.0]
  def change
    add_column :posts, :slug, :string
    add_index :posts, :slug
  end
end
```

В файл `models/post.rb` добавляем следующее:

```ruby
extend FriendlyId
friendly_id :title, use: :slugged

def normalize_friendly_id(input)
  input.to_s.to_slug.normalize(transliterations: :russian).to_s
end
```

В качестве основы для slug'а берется колонка `title`. Если в `title` содержатся русские буквы, то произойдет транслитерация.

Затем редактируем контроллер `controllers/posts_controller.rb`:

```ruby
 private

 def post_params
  params.require(:post).permit(:title, :text, :tag_list, :created_at, :slug)
 end

 def find_post
  @post = Post.friendly.find(params[:id])
 end
```
