---
layout: post
title:  "Notes on simple Twitter image bot"
date:   2015-11-14 20:28:59 +0900
---
## source code

Don't forget:

1. Install [tweepy](http://www.tweepy.org)
2. [Register your app](https://apps.twitter.com)

 **twitterImageBot.py:**

```python
import tweepy
import glob
import random
import os
import shutil

api_key = "api_key"
api_secret = "api_secret"
oauth_token = "access_token"
oauth_token_secret = "access_token_secret"
auth = tweepy.OAuthHandler(api_key, api_secret)
auth.set_access_token(oauth_token, oauth_token_secret)
api = tweepy.API(auth)

abspath = os.path.abspath(__file__)
dname = os.path.dirname(abspath)
os.chdir(dname)

def randomimagetwitt(folder):
    images = glob.glob(folder + "*")
    image_open = images[random.randint(0,len(images))-1]
    api.update_with_media(image_open)
    shutil.copy(image_open, "copied_images/")
    os.remove(image_open)

randomimagetwitt("images_to_post/")
```

if you want your bot to simply post images every N minutes/hours/days, this bot would be perfect for you. it just takes a random image from the folder `images_to_post/`, post it using tweepy library, copy the image to the folder `copied_images/` and finally removes it. so there will never be repeated images.

## crontab scheduling

this is how my crontab schedule looks like (the bot posts a picture every 30 minutes):

```shell
0,30 * * * * python /Users/johnny/some_bots/ImageBotTwitter/image_bot.py
```

