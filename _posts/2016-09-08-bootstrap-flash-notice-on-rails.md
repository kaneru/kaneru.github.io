---
layout: post
title:  "Bootstrap flash notice on Rails"
date:   2016-09-08 09:00:00
tags: rails
---

In `views/layouts/application.html.erb` add following line after header:

```erb
<%= render 'layouts/messages' %>
```

`views/layouts/_messages.html.erb` must look like this:

```erb
<% flash.each do |type, message| %>
  <div class="alert <%= bootstrap_class_for(type) %> fade in">
    <button class="close" data-dismiss="alert">×</button>
    <%= message %>
  </div>
<% end %>
```

In `messages.html.erb` we used `bootstrap_class_for` helper which is declared in `helpers/application_helper.rb`:

```ruby
module ApplicationHelper

  def bootstrap_class_for flash_type
    case flash_type
      when "success"
        "alert-success"
      when "error"
        "alert-danger"
      when "alert"
        "alert-warning"
      when "notice"
        "alert-info"
      else
        flash_type.to_s
    end
  end
end
```
