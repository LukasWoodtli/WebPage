Title: Agile Software Development
Date: 2015-05-29
Modified: 2015-06-01
Category: Software Development
Tags: Agile, Scrum, XP


> This page is still work in progress


This article is an overview of **Scrum** and **XP**.

Roles
=====

There are three main roles in Scrum. Each of it has some special
responsibility.

Product Owner (PO)
------------------

The **Product Owner** is the connection between the **Team** and the
stakeholders or clients. He’s the only one who is allowed to give tasks
to the Team. The Product Owner should not be part of the Team.
The Product Owner maintains and manages the **Product Backlog**.

Scrum Master (SM)
-----------------

The **Scrum Master** is responsible that the Scrum process is realized
properly. He's also in charge if there are problems in the work progress
of the Team. He has to solve sozial problems and organize anything that
helps the Team to work productively. Ideally the Scrum Master isn’t a
part of the Team. But often he is a member of the Developer-Team.

Team
----

The **Team** is the group of people (usually developers) that do the work.
The team is self organizing. That means they decide how they do
something. Ideally every teammember can do anything needed in the team.
But sometimes there are special roles like teser, documentation writer
or specialists of any kind.

The main tasks of the Team are:

- Development (coding)
- Unit Tests
- Definition of Done
- Development Documentation


Other
-----

There are no other people involved in the productive work cycle than
the three mentioned above. If someone wants the **Team** do something he has
to speak with the **Product Owner**. At some presentations and meetings
there are guests allowed. But they can't decide anything or delegate any
work to the team.

There are some other people that are indirectly involved in the project. They are generally called **Stakeholder**. The most important ones are:

- Customer
- User
- Management



There are two kind of people involved in a project. In Scrum jargon they
are called Chickens and Pigs. This roles are based on a comic strip:

[Pig and Chicken](http://www.implementingscrum.com/2006/09/11/the-classic-story-of-the-pig-and-chicken/)



### Chickens

There are always some people which have ideas, like to criticize, talk a
lot about the project and try to get the reputation at the end. But they
don't do any work or just a little. They are called the Chickens.

### Pigs

On the other hand there are the kind of people that are highly involved
in and motivated for a project. They do all the hard work and take some
amount of risk. In Scrum they are called the Pigs.

Timeboxes (Rituals)
===================

In Scrum all work is donne in timeboxes of defined length.

The Sprint
----------

The most important timebox is the **Sprint**. It is a time span of two to four weeks. In
this time the team works on the tasks they have themselves comitted to
at the **Scrum Planning Meeting**. At the end of this time span the team should be able to present
a product that can be potentially delivered to the cusomer. To achieve
this goal there are several meetings that help to do the work organized
and on the right time.

A Sprint has this pattern:

1. Sprint Planing Meeting
2. Daily Scrum (every day for 15 minutes)
3. Sprint Review
4. Retrospective


Release Planning Meeting
------------------------

In this meeting the team and the product owner discuss when the next
release should be finished and what requirements shoud be included into
this release. They discuss the time each requirement needs to be
implemented. And they discuss the urgency of each requirement. Basically
the **Team** decides the time needed for implementing a requirement and the
**Product Owner** decides about the urgency. All the requirements are stored
in a list called the **Product Backlog**. The **Release Planning Meeting** can
be merged into the **Sprint Planning Meeting** if after each Sprint a real
release is created.

Sprint Planning Meeting
-----------------------

At the beginning of each **Sprint** the **Team**, the **Scrum Master** and the **Product Owner** decide
which of the requirements of the **Product Backlog** are going to be
implemented in the new **Sprint**. They are put into the so called **Sprint Backlog**.

> The Planning Meeting takes about **one day** (take the needed time!)

The meeting has three phases:

1. The objective of the sprint (PO, 30 minutes)
2. Pre-Selection of requirements (PO, 3 hours)
3. Analyze the requirements and split them to smaller tasks (activities)
&rarr; put them in the Sprint Backlog (Team, 4 hours) 

Daily Scrum
-----------

Every day the Team gathers for fifteen minutes and every member gives
answers to the following questions:

- What have I donne since the last meeting.
- What am I going to do until the next meeting.
- What are my actual problems.

> There should be no discussions in this meeting. It’s
just an information to the coworkers so people with similar interests or some good solutions can connect after the meeting.

Sprint Review (Presentation)
----------------------------

When a Sprint is finished the **Team** presents the result. Anyone can join
the presentation. Everybody is allowed to try out the resulting product.
It should not be a pure presentation but more like a workshop. In this
meeting the **Product Owner** decides if all the requirements are
implemented completely. For each requirement this is a pure yes or now
criteria. The product that is shown at the review is potentially shippable to the users.

Retrospective
-------------

The **Retrospective** is a very important meeting. All involved people have
to attend this meeting (PO, SM, Team). No other people are allowed in this
meeting. The topic of the meeting is to
discuss the Scrum process of the last Sprint. There should be discussed
what was good and what was bad. There have to be decided what steps will
be donne to improve the production cycle.

After the retrospective a new Sprint starts with the Sprint Planning
Meeting.

Artefacts
=========

Product Backlog
---------------

The Product Backlog is a list with all Requirements that have to be
donne to improve the product. The only person who can put new
requirements into the Product Backlog is the Product Owner. Each
requirement has to have several properties when put into the Backlog.

- ID (unambigous)
- Significance/Importance (unambigous, set only by PO)
- Initial Estimate/Effort (set only by Team)
- Name
- Label/Topic
- Description/Notes (User story / use case)
- Criteria for aceptance
- Notes / References
- Source (who added this requirement)
- Risk
- How to Demo

The **Product Owner** is responsible for the Product Backlog. He has to decide about the significance of
the Backlog Items. But he is not allowed to estimate the effort of an item. This can be only done by the team.

It's a good practice to estimate the most significant backlog items that
are not estimated yet once a week.

Sprint Backlog
--------------

Sprint Burndown
---------------

Release Burndown
----------------


Tools
=====

Scrum Board
-----------

The **Scrum Board** helps the Team (and the PO) to have an overview about the actual ongoing work.

Literature and Links
====================

[Scrum & XP from the Trenches](http://www.infoq.com/minibooks/scrum-xp-from-the-trenches)

[Pigs and Chickens](http://scrum-master.de/Scrum-Rollen/Scrum-Rollen_Pigs_Chickens)

[My Notes](/images/scrumidable_notizen.pdf)

[A good page with Podcasts (German)](http://www.scrumidable.de/)

