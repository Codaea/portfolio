---
title: 'The Making of Shittyrobots.net'
description: 'how many robot ideas exist?'
---

check it out at [shittyrobots.net](https://shittyrobots.net) 

## Background

I've always been intrested in robotics, and the hardware side creators like Michael Reeves is enjoyable to watch. 

He has multiple videos about viewer suggested ideas, and his comment section is filled to the brim with robot ideas.

## The Idea

> What if we got all the robot ideas from the comment section, and let people vote on them?

Theres not much you can really do to validate a idea like this, besides explain it to someone next to you, so I kind of just skipped to designing and building.

# The process

I scraped comments through the youtube data api, with a total of 800,000 comments off his top videos. This made for a 42 mb csv, with just over 1 million lines (comments can be multiple lines because I didn't sanitize input very well)

![[Pasted image 20241008210053.png]]
<figcaption>almost hitting my api limit in one day of scraping</figcaption>

I started sifting through by using regex to find lines that contained the phrase "build a robot that".

#todo: regex examples?

from this, I only matched 20,407 comments. I thought to myself, "oh well, I thought there would be more ideas, but 20,000 more than I was hoping for anyways" 

Then out of the corner of my eye, I noticed another comment, 
  
> "make a remote control mini fridge when it can drive you some drinks"

people used other words than "build a robot" to convey their ideas, and I needed to be looking for other verbs too.

The final list of regex searches I used was:
- "build a robot"
- "make a robot"
- "build a" (sometimes people wouldn't even say robot!)
- "make a"

out of the 800,000 comments I started with, I got 
- 20,407 matches for "build a robot"
- 54,889 matches for "make a robot"
- 33,388 matches for "build a"
- 53,459 matches for "make a" (excluding robot at the end)


this came out to just over 160,000 comments that contained robot ideas.

I found lots of little interesting tidbits from the dataset through exploring it, but that could beits own post.

## The Website

Now that I had the robot ideas, I needed to build the website portion.

I opted for Nuxt with Supabase, because of my familiarity with the framework (and PaaS!) because of my existing skillset working with it and postgresql.

## Backend

I had my data, and knew I wanted to track the time votes came in (preventing bots) but I wasn't sure how to integrate it without left table joins every time a user refreshed the page

![[Pasted image 20241008211910.png|600]]
<figcaption>my schema visualized</figcaption>

**Introducing, Materialized Views** - a way to save resources for expensive queries where information doesn't need to be all the way up to date. a refreshable table basically

<details>
	<summary>SQL Example</summary>

	creating a materialized view
	
	```sql
	CREATE MATERIALIZED VIEW
	materialized_table AS
	SELECT * FROM
	table LEFT JOIN other_table ON table.id = other_table.id;
	```
	
	and they can be refreshed through running
	
	```sql
	REFRESH MATERIALIZED VIEW materialized_table
	```
</details>

I'm not a stock exchange, we don't need realtime updates for every user, data being stale is ok.

using [pgcron](https://github.com/citusdata/pg_cron), I setup hourly refreshes of the table that gets queried whenever you use the site.

### Preventing Botting

a hope and a prayer was all i had, I'm not to worried about mass voting, and I'm excited to see where the leaderboard takes us. if it takes botting to win, let it be.

## Frontend

I learned a lot less when working on this frontend, besides that shadcn-vue was still a little underdeveloped compared to other competitors, and I landed on NuxtUI. 

Double voting prevention was kind of a second thought, and currently its bypassed by a page refresh.

## Lessons Learnt.

I need to work on marketing, I'm not quite sure how to make a app grow naturally.


