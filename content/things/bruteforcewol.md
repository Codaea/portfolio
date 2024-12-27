---
title: 'Brute Forcing Wake On Lan'
description: "this can't be a bad idea, right?"
image: "/img/content/things/bruteforcewol/cover.png" # prefer 1920x1080?
date: "Sometime in October 2024"
---

Last night, I set a VM (virtual machine) to restore from a backup. I went to bed, and when I woke up, the hypervisor was offline.

I thought to myself, "it must of crashed last night during the restore when trying to start back up, I just need to turn it back on." 
How Naive of past me to think that.

however, before I take you through my day of shenanigans, lets start at the begining.

## What is Wake on lan?

Wake on lan (Wol) is a networking standard that allows computers to be awoken from sleep through sending a magic packet. 
The "magic packet" is actually just a broadcast frame (ignore fancy layer 2 networking words) that contains the target's MAC address, then repeats it 16x more. 
because broadcast frames are layer two, it has no idea what a network is, and therefore only works in local networks. (or a layer 2 vpn)

The big problem wasn't the vpn connection in, but rather the mac address.
in order to use WOL on the computer I needed the target's computer mac address, having no idea what it was.

## The Journey

Wait! Proxmox's Web GUI has a built in wake on lan menu! I can just use that!

![screenshot of proxmox wake on lan menu](/img/content/things/bruteforcewol/image.png)
*If only everything was this easy, right?*

Nope.

Proxmox didn't know the host's mac address, and neither did I.

The wild goosechase had started. 
I log into my router to check the dhcp server, only to realize I set the hosts I.P. addresses staticly.

But not all is lost, I know the vendor mac address[1^], and I bought pve2 and pve3 in a bundle!

![photo of homelab](/img/content/things/bruteforcewol/homelab.jpg)
*my homelab setup*

This left me with two options. I could try either 

- searching the last 3 blocks of the mac address (16,777,216 addresses)

## *OR*

- search the last two blocks, hoping that it shares the 4th block because they were bought in a pair from a bulk reseller. (I've had luck on other devices being sequential mac addresses.) (65,536 addresses)


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

I realized at this point, I was better off waiting for school to get out.

For as why none of it worked, Most likely I never even turned wake on lan on. I never got into troubleshooting what the root cause was either. 

Oh, and i just looked, its mac address is `c4:65:16:b6:ff:3d`. It didn't even share the same 3rd block.

Moral of the story, don't try brute forcing wake on lan unless you know if you actually enabled it in the bios.

[^1]: Vendor mac addresses are the first 24 bits `00:1A:2B`, that are decided by the device's manufacturer. [more here.](https://www.geeksforgeeks.org/mac-address-in-computer-network/)