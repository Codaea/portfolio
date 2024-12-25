---
title: 'Brute Forcing Wake On Lan'
description: "this can't be a bad idea, right?"
image: "public/" # prefer 1920x1080?
---

Last night, I set a vm (virtual machine) to restore from a backup. I went to bed, and when I woke up, the hypervisor host was offline.

"it must of crashed last night during the restore when trying to start back up, I just need to turn it back on." How
Naive of past me to think that.

In proxmox, you can right click a host for an option to wake on lan.


## What is Wake on lan?

Wake on lan (Wol) is a networking standard that allows computers to be awoken from sleep through sending a magic packet. 
The "magic packet" is actually just a broadcast frame (ignore fancy layer 2 networking words) that contains the target's MAC address, then repeats it 16x more. 

I needed the target's computer mac address, having no idea what it was.

## The Journey

Wait! Proxmox has a built in wake on lan menu! I can just use that!

![screenshot of proxmox wake on lan menu](/img/content/things/bruteforcewol/image.png)
*If only everything was this easy, right?*

Nope.

Proxmox didn't know the host's mac address, and neither did I.

The wild goosechase had started. 
I log into my router to check the dhcp server, only to realize I set the hosts I.P. addresses staticly.

But not all is lost, I know the vendor mac address[1^], and I bought pve2 and pve3 in a bundle off ebay!

![photo of homelab](/img/content/things/bruteforcewol/homelab.jpg)
*my homelab setup*

but just because I don't know the 

I could try either 



- searching the last 3 blocks of the mac address (16,777,216 addresses)

## *OR*

- search the last two blocks, hoping that it shares the 4th block because they were bought in a pair from a bulk reseller I THINK THIS MIGHT BE A RUN ON SENTENCE (I've had luck on other devices being sequential mac addresses.) (65,536 addresses)


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

It ran for about 10 minutes, and got nothing. If every 1st block took 10 minutes to run, it would mean they would all take 42 hours!

Also, because wake on lan packets don't have a destination, they get broadcast out to everyone else on the layer 2 network. This was generating a LOT of traffic for no good reason.


(context: last period of the day, going to physically check on it in 30 minutes)

looking back - I probbably should check if its ethernet cord is plugged in/its still reciving power. I haven't checked layer 0.

Most likely, I never even turned wake on lan on. Worst case scenario, I killed a SSD.

[^1]: Vendor mac addresses are the first 24 bits `00:1A:2B`, that are decided by the device's manufacturer. [more here.](https://www.geeksforgeeks.org/mac-address-in-computer-network/)