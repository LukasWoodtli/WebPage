#!/usr/bin/env python
# -*- coding: utf-8 -*- #
from __future__ import unicode_literals
from os.path import expanduser, join
import string

AUTHOR = u'Lukas Woodtli'
AUTHORS = { AUTHOR: "pages/contact.html" }

SITENAME = u'Lukas Woodtli'
SITEURL = 'http://lukaswoodtli.github.io'

LOAD_CONTENT_CACHE = False # Caching not helpful when developing
DELETE_OUTPUT_DIRECTORY = True

PATH = 'content'
STATIC_PATHS = ['images', 'documents', 'scripts', 'files']

TIMEZONE = 'Europe/Zurich'

DEFAULT_LANG = u'en'

# Feed generation is usually not desired when developing
FEED_ALL_ATOM = None
CATEGORY_FEED_ATOM = None
TRANSLATION_FEED_ATOM = None
AUTHOR_FEED_ATOM = None
AUTHOR_FEED_RSS = None



DEFAULT_PAGINATION = 5

SLUG_SUBSTITUTIONS = [(' ', '_'), ('+', 'p')]


CATEGORY_URL = 'category/{slug}.html' 	  # The URL to use for a category.
CATEGORY_SAVE_AS = 'category/{slug}.html' # The location to save a category.
TAG_URL = 'tag/{slug}.html' 	          # The URL to use for a tag.
TAG_SAVE_AS = 'tag/{slug}.html' 	  # The location to save the tag page.
AUTHOR_URL = 'author/lukas_woodtli.html'  # The URL to use for an author.
AUTHOR_SAVE_AS = 'author/lukas_woodtli.html'  # The location to save an author.

# Uncomment following line if you want document-relative URLs when developing
#RELATIVE_URLS = True

home = expanduser("~")
PLUGIN_PATHS = ["plugins", home, join(home, "pelican-plugins")]
PLUGINS = ["render_math", "pelican-bootstrapify", 'sitemap', 'extract_toc', 'tipue_search'] # "better_tables"

DIRECT_TEMPLATES = (('index', 'tags', 'categories','archives', 'search', '404'))
DISPLAY_PAGES_ON_MENU = False
DISPLAY_CATEGORIES_ON_MENU = False

TYPOGRIFY = True

MARKDOWN = {
            'extension_configs': {
                        'markdown.extensions.codehilite': {'css_class': 'highlight'},
                        'markdown.extensions.extra': {},
                        'markdown.extensions.headerid': {},
                        'markdown.extensions.sane_lists': {},
                        'markdown.extensions.toc': {},
                        'markdown.extensions.footnotes': {},
                        'markdown.extensions.attr_list': {}
            },
            'output_format': 'html5',
}

DOCUTILS_SETTINGS = {'table_style' : 'borderless', 'math_output': 'mathjax https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.1/MathJax.js'}

THEME = "pelican-elegant"

SOCIAL = [('LinkedIn', 'https://www.linkedin.com/in/lukaswoodtli'),
          ('github', 'https://github.com/LukasWoodtli'),
          ('stack-overflow', 'https://careers.stackoverflow.com/lukaswoodtli'),
          ('XING', 'https://www.xing.com/profile/Lukas_Woodtli'),
          ('email','/pages/contact.html')]

# Keep the generated blog index but save it under different name
INDEX_SAVE_AS = 'blog_index.html'

MENUITEMS = [
    ('Resume', '/pages/resume.html'),
    ('Skills',[
        ('Hard Skills', '/pages/skills.html'),
        ('Courses', '/pages/courses.html'),
        ('Books', '/pages/books.html'),
        ('Projects', '/pages/projects.html')]),
    ('Blog', '/pages/blog.html'),
    ('Contact', '/pages/contact.html')
]


