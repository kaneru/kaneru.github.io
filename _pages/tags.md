---
layout: page
title: Tags
permalink: /tags
---

<!-- Get the tag name for every tag on the site and set them
to the `site_tags` variable. -->
{% capture site_tags %}{% for tag in site.tags %}{{ tag | first }}{% unless forloop.last %},{% endunless %}{% endfor %}{% endcapture %}

<!-- `tag_words` is a sorted array of the tag names. -->
{% assign tag_words = site_tags | split:',' | sort %}

<div>
  {% for item in (0..site.tags.size) %}{% unless forloop.last %}
    {% capture this_word %}{{ tag_words[item] }}{% endcapture %}
    <h3 id="{{ this_word | cgi_escape }}">{{ this_word }}</h3>
    {% for post in site.tags[this_word] %}{% if post.title != null %}
      <div style="clear: both;"></div>
      <div class="post">
        <div class="post-date">{{ post.date | date: "%d %b" }}</div>
        <div class="post-title"><a href="{{ post.url | prepend: site.baseurl }}">{{ post.title }}</a></div>
      </div>
    {% endif %}{% endfor %}
  {% endunless %}{% endfor %}
</div>
