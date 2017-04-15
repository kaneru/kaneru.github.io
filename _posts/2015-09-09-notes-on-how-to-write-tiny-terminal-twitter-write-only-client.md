---
layout: post
title:  "Notes on how to write tiny terminal Twitter write-only client"
date:   2015-09-09 20:28:59
tags: twitter ruby
---
## installing ruby and twitter api

1. Install [ruby](https://www.ruby-lang.org/en/documentation/installation/)
2. Install [twitter api](https://github.com/sferik/twitter)

```ksh
$ gem install twitter
```

## registering your app with twitter

Just follow these simple [instructions](http://iag.me/socialmedia/how-to-create-a-twitter-app-in-8-easy-steps/).


## writing a code

Create `twoc.rb` file.
Be sure you include Twitter API in your project:

```ruby
require 'twitter'
```

Pass configurations options as a block to `Twitter::REST::Client.new`.

```ruby
client = Twitter::REST::Client.new do |config|
  config.consumer_key        = "YOUR_CONSUMER_KEY"
  config.consumer_secret     = "YOUR_CONSUMER_SECRET"
  config.access_token        = "YOUR_ACCESS_TOKEN"
  config.access_token_secret = "YOUR_ACCESS_SECRET"
end
```

After that you can tweet, follow a user, stream tweets [etc](https://github.com/sferik/twitter).
In our case we just need to update a status:

```ruby
client.update("Hello world!")
```

But we would like to write any tweet, so in order to do that we should receive a tweet as an argument:

```ruby
tweet = ARGV[0]
client.update(tweet)
```

So if we type in console `ruby twoc.rb "Hello world!"`, your status would be updated with tweet "Hello world!".

Whole text of app:

```ruby
require 'twitter'

client = Twitter::REST::Client.new do |config|
  config.consumer_key        = "YOUR_CONSUMER_KEY"
  config.consumer_secret     = "YOUR_CONSUMER_SECRET"
  config.access_token        = "YOUR_ACCESS_TOKEN"
  config.access_token_secret = "YOUR_ACCESS_SECRET"
end

tweet = ARGV[0]

if tweet.length <= 140
  client.update(tweet)
else
  puts "Your tweet must be less than 140 characters!"
end
```
