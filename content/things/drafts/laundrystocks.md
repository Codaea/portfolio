---
title: 'Laundy Machines That Trade Stocks'
description: 'never thought I would say that sentence'
draft: true
---

check it out at [laundry.codaea.com](https://laundry.codaea.com)
## The Story


a few months ago, a friend sent a link. it was to https://mycscgo.com, and it was followed by a phone call.

> Them: "Dude, my laundry room has smart washers and dryers." Me: "That's cool. Think they have an API?" Them: "Let me check."

sure enough, they did.

The API provided tons of data, but the standout feature? It offered real-time machine availability across all washers and dryers. We could track which machines were free with each API request.

Since the website checked every minute, we mirrored that to avoid rate limits.
```json
{
    "availabilitySummary": {
        "washers": {
            "available": 12,
            "inUse": 3,
            "temporarilyUnavailable": 0,
            "soonest": 12
        },
        "dryers": {
            "available": 16,
            "inUse": 0,
            "temporarilyUnavailable": 0,
            "soonest": null
        }
    },
    "machines": [
        {
            "opaqueId": "c1fbc21f-6814-4a92-a4d8-82a7240f06f1",
            "controllerType": "ACA",
            "type": "washer",
            "locationId": "8ebe506e-0e8d-406c-bf4c-33e126ee38b4",
            "roomId": "6321295-001",
            "stickerNumber": 12,
            "licensePlate": "776-JKJ",
            "nfcId": "eb7f0fc8-a0f1-4b5f-af24-90af690d2d90",
            "qrCodeId": "UfeMD",
            "doorClosed": false,
            "available": true,
            "notAvailableReason": null,
            "inService": null,
            "freePlay": true,
            "mode": "pressStart",
            "display": null,
            "timeRemaining": 0,
            "settings": {
                "soil": "light",
                "cycle": "normal",
                "washerTemp": "cold",
                "dryerTemp": null
            },
            "capability": {
                "showSettings": true,
                "addTime": false,
                "showAddTimeNotice": false
            },
            "groupId": null,
            "stackItems": null
        },
        ...
    ]
}
```

we were able to get a availability summary of all the machines on every request.

the website itself makes requests once a minute, so we did the same (to avoid getting rate limited)

## The Backend Situation

My friend handled the backend, and the TL;DR is this: He went with TimescaleDB, using a Perl script to scrape the API every minute.

Everything ran on his homelab, but I needed that data on mine. I was also experimenting with Coolify, a self-hostable PaaS built on Docker

To securely sync our setups without opening ports, I decided on this configuration:

A Cloudflare tunnel between his database and mine, so he could read replica to my copy.

at this point, this is what the network looked like
![[OIT Laundry.svg]]
#todo, redo image to be better, and censor some of the domains and names

We could have just built a simple dashboard showing cool usage and stats of the washers and driers, but I wanted more.

I wanted to turn this into a interactive game.

We brainstormed a few ideas—bingo, roulette, _The Price is Right_ (open to more ideas if you have any!)—and eventually landed on _stock trading_.

If you've seen the Michael Reeves video, _I Made a Goldfish Trade Stocks_ (#TODO: Hyperlink), this concept might sound familiar. The twist? Instead of a goldfish, washing machine usage would decide the trades.

There were 32 machines—16 washers and 16 dryers. I split them into two groups: the first 8 washers and dryers formed Group One, and the rest formed Group Two.

I set up two portfolios (via alpaca #todo hyperlink), trading against each other. An _even-numbered_ machine would trigger a stock purchase, while an _odd-numbered_ one would trigger a sale.

For the record, the trading was paper-only (I'm not ready to bet real money on washing machine algorithms).

I did a bit of advertising, sat back, and watched results flow through.