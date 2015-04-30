#!/usr/bin/env python
# -*- coding: utf-8 -*- #
from __future__ import unicode_literals
from os.path import expanduser

AUTHOR = u'Lukas Woodtli'
AUTHORS = AUTHOR
SITENAME = u'Lukas Woodtli'
SITEURL = 'http://lukaswoodtli.github.io'

LOAD_CONTENT_CACHE = False # Caching not helpful when developing

PATH = 'content'
STATIC_PATHS = ['images']

TIMEZONE = 'Europe/Zurich'

DEFAULT_LANG = u'en'

# Feed generation is usually not desired when developing
FEED_ALL_ATOM = None
CATEGORY_FEED_ATOM = None
TRANSLATION_FEED_ATOM = None
AUTHOR_FEED_ATOM = None
AUTHOR_FEED_RSS = None

# Blogroll
#LINKS = (('Pelican', 'http://getpelican.com/'),
#         ('Python.org', 'http://python.org/'),
#         ('Jinja2', 'http://jinja.pocoo.org/'),
#         ('You can modify those links in your config file', '#'),)

# Social widget
#SOCIAL = (('You can add links in your config file', '#'),
#          ('Another social link', '#'),)

DEFAULT_PAGINATION = 2
TAG_URL = 'tags/{slug}.html'
TAG_SAVE_AS = 'tags/{slug}.html'
PAGINATION_PATTERNS = (
    (1, '{name}.html', '{name}.html'),
    (2, '{name}/page/{number}.html', '{name}/page/{number}.html'),
)

# Uncomment following line if you want document-relative URLs when developing
#RELATIVE_URLS = True

home = expanduser("~")
PLUGIN_PATHS = ["plugins", home]
PLUGINS = ["pelican-bootstrapify"]


THEME = "pelican-chameleon"
BS3_THEME = "http://bootswatch.com/yeti/bootstrap.min.css"

# Keep the generated blog index but save it under different name
INDEX_SAVE_AS = 'blog_index.html'

MENUITEMS = [
    ('Home', '/index.html'),
    ('CV', '/pages/cv.html'),
    ('Skills',[
        ('Hard Skills', '/pages/skills.html'),
        ('Courses', '/pages/courses.html'),
        ('Books', '/pages/books.html'),
        ('Projects', '/pages/projects.html')]),
    ('Contact', '/pages/contact.html'),
    ('Blog', [
         ('Tags', '/tags.html'),
         ('Categories', '/categories.html'),
         ('Chronological', '/archives.html')])
    #('Social', [
    #    ('Email', 'mailto:woodtli.lukas@gmail.com'),
    #    ('Github', 'https://github.com/LukasWoodtli'),
    #    ]), # LinkedIn, Xing, Stack Overflow....
    ]
