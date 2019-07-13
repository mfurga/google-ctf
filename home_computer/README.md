# Home Computer (forensics)

Blunderbussing your way through the decision making process, you figure that one is as good as the other and that further research into the importance of Work Life balance is of little interest to you. You're the decider after all. You confidently use the credentials to access the "Home Computer."

Something called "desktop" presents itself, displaying a fascinating round and bumpy creature (much like yourself) labeled  "cauliflower 4 work - GAN post."  Your 40 hearts skip a beat.  It looks somewhat like your neighbors on XiXaX3.   ..Ah XiXaX3... You'd spend summers there at the beach, an awkward kid from ObarPool on a family vacation, yearning, but without nerve, to talk to those cool sophisticated locals.

So are these "Cauliflowers" earthlings? Not at all the unrelatable bipeds you imagined them to be.  Will they be at the party?  Hopefully SarahH has left some other work data on her home computer for you to learn more.

Attachment: [86863db246859897dda6ba3a4f5801de9109d63c9b6b69810ec4182bf44c9b75](https://storage.googleapis.com/gctf-2019-attachments/86863db246859897dda6ba3a4f5801de9109d63c9b6b69810ec4182bf44c9b75)

### Solution
```bash
> file ./family.ntfs
./family.ntfs: DOS/MBR boot sector, code offset 0x52+2, OEM-ID "NTFS    ", sectors/cluster 8, Media descriptor 0xf8, sectors/track 0, dos < 4.0 BootSector (0x80), FAT (1Y bit by descriptor); NTFS, sectors 51199, $MFT start cluster 4, $MFTMirror start cluster 3199, bytes/RecordSegment 2^(-1*246), clusters/index block 1, serial number 072643f694104cb6f
```
It says that we're dealing with the windows NTFS dick image. One way to extract files from this archive is simply to use [7-Zip](https://www.7-zip.org/).
```bash
> dir

13.07.2019  12:45    <DIR>          .
13.07.2019  12:45    <DIR>          ..
13.06.2019  02:37                 0 bootmgr
13.06.2019  02:37                 0 BOOTNXT
13.06.2019  02:37                 0 pagefile.sys
13.06.2019  02:37    <DIR>          Program Files
13.06.2019  02:37    <DIR>          Program Files (x86)
13.06.2019  02:37                 0 Setup.log
13.06.2019  02:37                 0 SSUUpdater.log
13.06.2019  02:37                 0 swapfile.sys
13.06.2019  02:37    <DIR>          Users
13.06.2019  02:38    <DIR>          Windows
              10 File(s)     52 430 887 bytes
               6 Dir(s)  144 420 847 616 bytes free
```
In `Users\Family\Documents` we can find the `credentials.txt` file which looks quite interesting.
```bash
> type credentials.txt
I keep pictures of my credentials in extended attributes.
```

The NTFS file system has something called ADS (Alternate Data Streams). This feature is used e.g. by IE to mark files downloaded from the Internet but it can also be used to hide data, as in this case.

```bash
> dir /r
13.06.2019  02:38    <DIR>          .
13.06.2019  02:38    <DIR>          ..
13.06.2019  02:38                58 credentials.txt
                             38 202 credentials.txt:FILE0:$DATA
13.06.2019  02:37                 0 document.pdf
13.06.2019  02:37                 0 preview.pdf
               3 File(s)             58 bytes
               2 Dir(s)  144 321 830 912 bytes free

> cat credentials.txt:FILE0
%PNG
> cat credentials.txt:FILE0 >dump.png
```
![dump.png](https://raw.githubusercontent.com/mfurga/google-ctf/master/home_computer/dump.png)

**FLAG: CTF{congratsyoufoundmycreds}**
