---
title: 'Brute Forcing Wake On Lan'
description: "this can't be a bad idea, right?"
draft: true
---

last night, I set a vm to restore from a backup. I went to bed, and when I woke up, the proxmox host was offline.

I had to go to school, and was debugging this through break time and computer science periods. my inital thoughts were,

> "it must of crashed last night during the restore when trying to start back up, i just need to turn it back on."

in proxmox, you can right click a host for a option to wake on lan.

![screenshot of proxmox wake on lan menu](/img/content/blog/bruteforcewol/image.png)

if only everything was this easy, right?

Nope.

![error message no wake on lan address defined](/img/content/blog/bruteforcewol/image-1.png|100px)

ok, this isn't too bad, i can send a wake on lan packet by hand from the cli right?

> Wait. I don't know the MAC address of this node.

This leads me to my router, going to check the dhcp reservations. 
I never set dhcp for my pve nodes, and there is nothing under static assignment.

Shoot. If I had set up remote logging, this wouldn't be a issue. (except for pve3 hosted monitoring too!)

but not all is lost, I know the vendor mac address, and I bought pve2 and pve3 in a bundle off ebay! I could try either 

- searching the last 3 blocks of the mac address (16,777,216 addresses)

*OR*

- search the last two blocks, hoping that it shares the 4th block because they were bought in a pair from a bulk reseller (I've had luck on other devices being sequential mac addresses.) (65,536 addresses)


I opted for the second, doing the first if I got no hits from it.

```sh
# Define the known part of the MAC address (vendor prefix)
vendor_prefix="c4:65:16:b8"

# Loop through possible combinations for the last two octets
for i in {0..255}; do
  for j in {0..255}; do
    # Convert the numbers to hexadecimal and format them as two digits (00 to FF)
    hex_i=$(printf "%02x" $i)
    hex_j=$(printf "%02x" $j)

    # Construct the full MAC address
    mac_address="${vendor_prefix}:${hex_i}:${hex_j}"
    echo "Trying $mac_address..."
    
    # Send WOL packet
    wakeonlan $mac_address
  done
done
```
*cowritten by chatGPT*

it ran for about 10 minutes, and got nothing. if every 1st block took 10 minutes to run, it would mean they would all take 42 hours!

also, because wake on lan packets don't have a destination, they get broadcast out to everyone else on the layer 2 network. This was generating a LOT of traffic for no good reason.


(context: last period of the day, going to physically check on it in 30 minutes)

looking back - I probbably should check if its ethernet cord is plugged in/its still reciving power. I haven't checked layer 0.

Most likely, I never even turned wake on lan on. worst case scenario, I killed a SSD.

