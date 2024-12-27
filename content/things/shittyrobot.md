---
title: 'The Making of Shittyrobots.net'
description: 'how many robot ideas exist?'
---

all the robot ideas you could ever wish for. check them out at [shittyrobots.net](https://shittyrobots.net) 

## Background

Michael Reeves is a content creator on youtube, who makes (objectivly shitty) robots. Roombas that scream, Electric Scooter Cars.
In his early days on youtube, he did videos with viewer suggested ideas, prompting comments with more robot ideas.

## The Idea

> What if we got all the robot ideas from the comment section, and let people vote on them?

Theres not much you can really do to validate a idea like this, besides explain it to someone next to you, so I kind of just skipped to designing and building.

# Challenges

## Scraping Through The Data

copying and pasting comments from youtube is slow, but need not worry, google provides the [youtube data api](https://developers.google.com/youtube/v3/docs).
Getting comments only costs 1 point towards quota, and one query would return about 100 comments (from what I remeber)

the youtube api quota for free is 10,000 credits (or dubloons? the currency doesn't have a name!), meaning its possible to scrape up to 1,000,000 comments a day.

![using 70% of my youtube data api quota](/img/content/things/shittyrobot/quotausage.png)
<figcaption>This API comment scraping limit is violently high</figcaption>

I went for reeves's most popular videos, working from most views down to least.
In the end, I scraped over 800,000 comments. this was all compiled into a csv, totaling just over 1 million lines, and was a 42mb csv.

## The Sort

people don't just exclusivly comment robot ideas, they comment other stuff too. How do we filter for comments that contain robot ideas? 

There is multiple ways to go about sorting for robot ideas in the comment

- Natural language processing (AI)
- regex (find) a bunch of diffren't words that are used in phrases where people explain their robot idea, and extract those comments

I opted for the second (mostly because I didn't even know the first existed yet)

my first regex query was "build a robot that"

This only got 20,000 results,
for the moment I though 20,000 out of 800,000 comments was pretty good, and more robot ideas than I would ever read in one sitting.

However, as I was scrolling through all the comments, I saw one that stood out.

> "make a remote control mini fridge when it can drive you some drinks"

this is when I realized, there is multiple ways in english to tell someone your robot idea.

You could say, "make a robot", "design a robot". You don't even have to say robot!
"build a machine"

This is when I realized that Natural Language processing would solve this problem, but only at the cost of my wallet.

Natural Language Processing (NLP) is the processes of interperting the meaning behind a phrase or sentence to try and figure out what it means. For my case, I needed to distinguish between robot ideas and not robot ideas.

Instead of learning and messing with all that fancy stuff though, I sat down and brainstormed a list of words that would find robot ideas.

In the end, out of the 800,000 comments I started with, I got 
- 20,407 matches for "build a robot"
- 54,889 matches for "make a robot"
- 33,388 matches for "build a"
- 53,459 matches for "make a" (excluding those where robot was the next word)

This came out to just over 160,000 comments that contained robot ideas.

I found lots of little interesting tidbits from the dataset through exploring it, but that could be it's own post.

## The Website

not much to say here, went with nuxt and supabase from past experience, and desire to not hate myself

## Postgres optimization

I had my table of robot ideas, and knew I wanted to add voting, but I was unsure how to do it in a way where it was possible to detect/track mass voting/extreme botting.

I knew botting could and would happen, but my primary goal was to know, not to prevent botting.
If a idea was intresting enough for someone to write a bot to vote for it, It had to have been a worthy idea.

However, in order to have track votes, I would have to have two seperate tables, and in order to show a table of current votes for a idea AND be able to track votes, a table join operation would be required every refresh!

![/img/content/things/shittyrobot/databaseschema.png]
<figcaption>my schema visualized</figcaption>

This is where **Materialized Views** come to the rescue. 

Materialized Views offer a way to save resouces on expensive queries, (like massive table joins) at the cost of information not being latest.

In other words, Its a table that is created from the response to a set query, that was run in the past.

in postgresql, you can create a materialized view like this

```sql
CREATE MATERIALIZED VIEW
materialized_table AS
SELECT * FROM
table LEFT JOIN other_table ON table.id = other_table.id;
```
	
materialized views can be refreshed by running	

```sql
REFRESH MATERIALIZED VIEW materialized_table
```

I'm not a stock exchange, we don't need realtime updates for everyone, data being stale is ok.

using [pgcron](https://github.com/citusdata/pg_cron), I setup hourly refreshes of the materialized view that gets queried whenever someone visits the site.

## Marketing 

how does anyone build a audience? I still have no idea. I posted on hackernews, twitter and a few other places, but it never really took off. 

Then again, its just a social experiment. Maybe one day in the distant future I'll be cool.

# Wrapping up

how does one end a blog? lets just try like this

I definetly learned quite a bit throughout this, and I hope you did too. In the end, it was just another shower though that got me here, and at the end, it will be another shower thought that gets me distracted from schoolwork for another week or two.
