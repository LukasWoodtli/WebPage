Title: Welcome to my Site
slug: index
save_as: index.html
URL:

This page is about my profesional life as a developer. Im mainly a software/firmware developer. But I know also quite some things about mechanical and electronical engineering.

There is an overview about my [resume]({filename}/pages/resume.md) and my main [skills]({filename}/pages/skills.md). There are also some notes about my [knowledge]({filename}/pages/books.md) and what I've [learned]({filename}/pages/courses.md) so far.

I also write casually some small [blog]({filename}/pages/blog.md) articles.


<div id="sourrounding_div" style="height:500px">
<canvas id="myCanvas">
</canvas>
</div>


Feel free to [contact]({filename}/pages/contact.md) me.


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


var tagList = [new TagInfos("C", "/tag/c.html", 70),
               new TagInfos("C++", "/tag/cpp.html", 80),
               new TagInfos("Python", "/tag/python.html", 50),
               new TagInfos("Agile", "/tag/agile.html", 40),
               new TagInfos("Assembler", "/tag/assembler.html", 35),
               new TagInfos("Calculus", "/tag/calculus.html", 20),
               new TagInfos("Data Minig", "/tag/data_minig.html", 15),
               new TagInfos("ETH", "/tag/eth.html", 10),
               new TagInfos("Git", "/tag/git.html", 50),
               new TagInfos("OOP", "/tag/oop.html", 60),
               new TagInfos("Design Patterns", "/tag/oop.html", 70),
               new TagInfos("Scrum", "/tag/scrum.html", 20),
               new TagInfos("Statistics", "/tag/statistics.html", 15),
               new TagInfos("SVN", "/tag/svn.html", 20),
               new TagInfos("XP", "/tag/xp.html", 20),
               new TagInfos("Computer Science", "/tag/computer_science.html", 40),
               new TagInfos("Emacs", "/category/emacs.html", 15),
               new TagInfos("Mathematics", "/category/mathematics.html", 20),
               new TagInfos("Programming", "/category/programming.html", 50),
               new TagInfos("Software Development", "/category/programming.html", 40),
               new TagInfos("Version Control", "/category/version_control.html", 20),
               new TagInfos("SystemC", "/systemc.html", 20),
               new TagInfos("Linux", "/tag/linux.html", 35),
               new TagInfos("Lisp", "/tag/lisp.html", 25),
               new TagInfos("Embedded Systems", "/tag/embedded_systems.html", 80)
               
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
