#!/usr/bin/env python
# -*- coding: utf-8 -*- #
from __future__ import unicode_literals

AUTHOR = u'Lukas Woodtli'
AUTHORS = AUTHOR
SITENAME = u'Lukas Woodtli'
SITEURL = ''

LOAD_CONTENT_CACHE = False # Caching not helpful when developing

PATH = 'content'


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

DEFAULT_PAGINATION = 10

# Uncomment following line if you want document-relative URLs when developing
#RELATIVE_URLS = True

PLUGIN_PATHS = ["plugins", "/Users/Boot/projects/"]
PLUGINS = ["pelican-bootstrapify"]


THEME = "pelican-chameleon"
BS3_THEME = "http://bootswatch.com/yeti/bootstrap.min.css"


MENUITEMS = [
    ('Home', '/index.html'),
    ('CV', '/pages/cv.html'),
    ('Skills',[
        ('Hard Skills', '/pages/skills.html'),
        ('Courses', '/pages/courses.html'),
        ('Books', '/pages/books.html'),
        ('Projects', '/pages/projects.html')]),
    ('Contact', '/pages/contact.html')
# ('Archives', [
    #     ('Tags', '/tags.html'),
    #     ('Categories', '/categories.html'),
    #     ('Chronological', '/archives.html'),
    #     ]),
    #('Social', [
    #    ('Email', 'mailto:woodtli.lukas@gmail.com'),
    #    ('Github', 'https://github.com/LukasWoodtli'),
    #    ]), # LinkedIn, Xing, Stack Overflow....
    ]
