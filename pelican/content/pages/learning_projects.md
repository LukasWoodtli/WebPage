Title: Learning Projects
Status: hidden

This are my learning projects in progress.

The page is meant for my own reference.


[TOC]

# Linux/UNIX Application Development

[Linux-UNIX-Programmierung (Rheinwerk/Galileo)](http://openbook.rheinwerk-verlag.de/linux_unix_programmierung/Kap02-002.htm#t2t310)

My Repo: [GitHub](https://github.com/LukasWoodtli/LinuxDevelopment)


# C++

## Modern C++

[Modern C++ Design](https://play.google.com/books/reader?printsec=frontcover&output=reader&id=vV-ACgAAAEAJ&pg=GBS.PA25)

My Repo: [GitHub](https://github.com/LukasWoodtli/)

## Boost

[Boost C++ Application Development Cookbook](https://www.packtpub.com/mapt/book/All%20Books/9781849514880)

My Repo: [GitHub](https://github.com/LukasWoodtli/BoostCookbook)


# Git

[Pro Git](https://git-scm.com/book/en/v2)

Version Control with Git (O'Reilly)


# Embedded Systems

## FreeRTOS

[FreeRTOS Book](https://www.dropbox.com/s/dxcag8v4gv0ew9c/Using%20the%20FreeRTOS%20Real%20Time%20Kernel%20-%20A%20Practical%20Guide.pdf?dl=0)

My Repo: [GitHub](https://github.com/LukasWoodtli/FreeRtosExamples)


## ARM Cortex

[ARM® Cortex® M4 Cookbook](https://www.packtpub.com/mapt/book/hardware_and_creative/9781782176503/1/ch01lvl1sec10/Installing+uVision5)


# Computation and Parsers

[Language Implementation Patterns](https://pragprog.com/book/tpdsl/language-implementation-patterns)

My Repo: [GitHub](https://github.com/LukasWoodtli/LanguageImplementationPatterns)


# Scheme

[Structure and Interpretation of Computer Programs](https://play.google.com/books/reader?printsec=frontcover&output=reader&id=cCsbCQAAAEAJ&pg=GBS.PA227)

[Text online](https://mitpress.mit.edu/sicp/full-text/book/book-Z-H-4.html#%25_toc_start)

MIT OpenCourseWare [4A](http://ocw.mit.edu/courses/electrical-engineering-and-computer-science/6-001-structure-and-interpretation-of-computer-programs-spring-2005/video-lectures/4a-pattern-matching-and-rule-based-substitution/)

My Repo: [GitHub](https://github.com/LukasWoodtli/SchemeCourse)

# Overview

<meta charset="utf-8">
<style>

    body {
        font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
        width: 960px;
        height: 500px;
        position: relative;
    }

    svg {
        width: 100%;
        height: 100%;
        position: center;
    }

    .toolTip {
        font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
        position: absolute;
        display: none;
        width: auto;
        height: auto;
        background: none repeat scroll 0 0 white;
        border: 0 none;
        border-radius: 8px 8px 8px 8px;
        box-shadow: -3px 3px 15px #888888;
        color: black;
        font: 12px sans-serif;
        padding: 5px;
        text-align: center;
    }

    text {
        font: 12px sans-serif;
        color: white;
    }
    text.value {
        font-size: 120%;
        fill: white;
    }

    .axisHorizontal path{
        fill: none;
    }

    .axisHorizontal .tick line {
        stroke-width: 1;
        stroke: rgba(0, 0, 0, 0.2);
    }

    .bar {
        fill: steelblue;
        fill-opacity: .9;
    }

</style>


<script src="http://d3js.org/d3.v3.min.js"></script>

<script type="text/javascript">
    function Book(name, page, totalPages) {
        this.name = name;
        this.page = page;
        this.totalPages = totalPages;
    }
    Book.prototype.progress = function() {
        var percent = this.page * 100 / this.totalPages;
        var rounded = Math.round( percent * 10 ) / 10;
        return rounded;
    }
    Book.prototype.pagesLeft = function() {
        return this.totalPages - this.page;
    }
    data = [
        new Book("Linux-UNIX-Programmierung", 349, 857),
        new Book("Modern C++",         96, 359),
        new Book("Boost C++ Cookbook", 29, 348),
        new Book("Pro Git", 262, 574),
        new Book("Version Control with Git", 34, 327),
        new Book("FreeRTOS", 49, 216),
        new Book("ARM Cortex Cookbook", 27, 298),
        new Book("Language Implementation Patterns", 40, 358),
        new Book("SICP", 227, 688),
    ];

    function addTotal() {
        var page = 0;
        var totalPages = 0;
        for (var book of data) {
            page += book.page;
            totalPages += book.totalPages;
        }

        data.push(new Book("Total: ", page, totalPages));
    }

    window.onload = addTotal();

    var div = d3.select("body").append("div").attr("class", "toolTip");

    var axisMargin = 20,
            margin = 40,
            valueMargin = 4,
            width = parseInt(d3.select('body').style('width'), 10),
            height = parseInt(d3.select('body').style('height'), 10),
            barHeight = (height-axisMargin-margin*2)* 0.4/data.length,
            barPadding = (height-axisMargin-margin*2)*0.6/data.length,
            data, bar, svg, scale, xAxis, labelWidth = 0;

    max = d3.max(data, function(d) { return d.progress(); });

    svg = d3.select('body')
            .append("svg")
            .attr("width", width)
            .attr("height", height);


    bar = svg.selectAll("g")
            .data(data)
            .enter()
            .append("g");

    bar.attr("class", "bar")
            .attr("cx",0)
            .attr("transform", function(d, i) {
                return "translate(" + margin + "," + (i * (barHeight + barPadding) + barPadding) + ")";
            });

    bar.append("text")
            .attr("class", "book")
            .attr("y", barHeight)
            .attr("dy", ".35em") //vertical align middle
            .text(function(d){
                return d.name;
            }).each(function() {
        labelWidth = Math.ceil(Math.max(labelWidth, this.getBBox().width));
    });

    scale = d3.scale.linear()
            .domain([0, max])
            .range([0, width - margin*2 - labelWidth]);

    xAxis = d3.svg.axis()
            .scale(scale)
            .tickSize(-height + 2*margin + axisMargin)
            .orient("bottom");

    bar.append("rect")
            .attr("transform", "translate("+labelWidth+", 0)")
            .attr("height", barHeight)
            .attr("width", function(d){
                return scale(d.progress());
            });

    bar.append("text")
            .attr("class", "value")
            .attr("y", barHeight / 2)
            .attr("dx", -valueMargin + labelWidth) //margin right
            .attr("dy", ".35em") //vertical align middle
            .attr("text-anchor", "end")
            .text(function(d){
                return (d.progress()+"%");
            })
            .attr("x", function(d){
                var width = this.getBBox().width;
                return Math.max(width + valueMargin, scale(d.progress()));
            });

    bar
            .on("mousemove", function(d){
                div.style("left", d3.event.pageX+10+"px");
                div.style("top", d3.event.pageY-25+"px");
                div.style("display", "inline-block");
        div.html((d.name)+
            "<br>Page: "+(d.page)+
            "<br>Left: "+(d.pagesLeft())+
            "<br>Total: "+(d.totalPages)+
            "<br>"+(d.progress())+"%");
            });
    bar
            .on("mouseout", function(d){
                div.style("display", "none");
            });

    svg.insert("g",":first-child")
            .attr("class", "axisHorizontal")
            .attr("transform", "translate(" + (margin + labelWidth) + ","+ (height - axisMargin - margin)+")")
            .call(xAxis);

</script>
