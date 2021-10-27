Title: Blog

This [blog](/blog_index.html) is mainly needed for me to write down my notes. But some of it
might even be useful to others.

I also try to write some small tutorials for others to learn from. Feel free to [contact]({filename}/pages/contact.md) me for any suggestions.

Here are all [tags](/tags.html) of my blog. 

There is a [category overview](/categories.html) page for the blog.

And here is the [chronological order](/archives.html).


<div id="sourrounding_div" style="height:500px">
<canvas id="myCanvas">
</canvas>
</div>


<script src="scripts/wordcloud2.js"></script>

<script>

// size of canvas: http://stackoverflow.com/a/25083938/1272072
var div = document.getElementById("sourrounding_div");
var canvas = document.getElementById("myCanvas");
canvas.height = div.offsetHeight;
canvas.width  = div.offsetWidth;

function TagInfos(name, url, size) {
  this.name = name;
  this.url = url;
  this.size = size;
}


var tagList = [new TagInfos("C", "/tags.html#c-ref", 70),
               new TagInfos("C++", "/tags.html#cpp-ref", 80),
               new TagInfos("Python", "/tags.html#python-ref", 50),
               new TagInfos("Agile", "/tags.html#agile-ref", 40),
               new TagInfos("Assembler", "/tags.html#assembler-ref", 35),
               new TagInfos("Calculus", "/tags.html#calculus-ref", 20),
               new TagInfos("Data Minig", "/tags.html#data_minig-ref", 15),
               new TagInfos("ETH", "/tags.html#eth-ref", 10),
               new TagInfos("Git", "/tags.html#git-ref", 50),
               new TagInfos("OOP", "/tags.html#oop-ref", 60),
               new TagInfos("Design Patterns", "/tags.html#oop-ref", 60),
               new TagInfos("Scrum", "/tags.html#scrum-ref", 20),
               new TagInfos("Statistics", "/tags.html#statistics-ref", 15),
               new TagInfos("SVN", "/tags.html#svn-ref", 20),
               new TagInfos("XP", "/tags.html#xp-ref", 20),
               new TagInfos("Computer Science", "/tags.html#computer_science-ref", 40),
               new TagInfos("Emacs", "/categories.html#emacs-ref", 15),
               new TagInfos("Mathematics", "/categories.html#mathematics-ref", 20),
               new TagInfos("Programming", "/categories.html#programming-ref", 50),
               new TagInfos("Software Development", "/categories.html#programming-ref", 40),
               new TagInfos("Version Control", "/categories.html#version_control-ref", 20),
               new TagInfos("SystemC", "/systemc.html", 20),
               new TagInfos("Linux", "/tags.html#linux-ref", 50),
               new TagInfos("Lisp", "/tags.html#lisp-ref", 40),
               new TagInfos("Embedded Systems", "/tags.html#embedded_systems-ref", 50),
               new TagInfos("Robotics", "/tags.html#robotics-ref", 40),
               new TagInfos("Mechanics", "/categories.html#mechanics-ref", 50)
];



function getListForCloud() {
    var data = []
    for (var i = 0; i < tagList.length; i++) {
        data.push([tagList[i].name, tagList[i].size]);
    }
    return data;
}

function getUrlForTag(name) {
    for (var i = 0; i < tagList.length; i++) {
        if(name == tagList[i].name) {
            return "http://lukaswoodtli.github.io" + tagList[i].url;
        }
    }
    return false;
}






WordCloud(document.getElementById('myCanvas'), {list:  getListForCloud(),
                                                click: function(item) {
                                                             var url = getUrlForTag(item[0])
                                                             if (url)
                                                                 window.open(url, "_self");
                                                       },
                                                 minRotation : 0, maxRotation : 0,
                                                 rotateRatio: 0,
                                                 color: "#3300FF",
                                                 gridSize: 20
                                               }
);
</script>
