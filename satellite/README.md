# Satellite (networking)

Placing your ship in range of the Osmiums, you begin to receive signals. Hoping that you are not detected, because it's too late now, you figure that it may be worth finding out what these signals mean and what information might be "borrowed" from them. Can you hear me Captain Tim? Floating in your tin can there? Your tin can has a wire to ground control?

Find something to do that isn't staring at the Blue Planet.

Attachment: [768be4f10429f613eb27fa3e3937fe21c7581bdca97d6909e070ab6f7dbf2fbf](https://storage.googleapis.com/gctf-2019-attachments/768be4f10429f613eb27fa3e3937fe21c7581bdca97d6909e070ab6f7dbf2fbf)

### Solution
```bash
> file ./init_sat
init_sat: ELF 64-bit LSB  executable, x86-64, version 1 (SYSV), dynamically linked (uses shared libs), not stripped

> ./init_sat
Hello Operator. Ready to connect to a satellite?
Enter the name of the satellite to connect to or 'exit' to quit
osmium

Establishing secure connection to osmium
 satellite...
Welcome. Enter (a) to display config data, (b) to erase all data or (c) to disconnect

a
Username: brewtoot password: ********************       166.00 IS-19 2019/05/09 00:00:00 Swath 640km      Revisit capacity twice daily, anywhere Resolution panchromatic: 30cm multispectral: 1.2m  Daily acquisition capacity: 220,000km²  Remaining config data written to: https://docs.google.com/document/d/14eYPluD_pi3824GAFanS29tWdTcKxP_XUxx7e303-3E
```

We've got https://docs.google.com/document/d/14eYPluD_pi3824GAFanS29tWdTcKxP_XUxx7e303-3E link.

```python
# It works only for Python 2.
>>> 'VXNlcm5hbWU6IHdpcmVzaGFyay1yb2NrcwpQYXNzd29yZDogc3RhcnQtc25pZmZpbmchCg=='.decode('base64')
>>> 'Username: wireshark-rocks\nPassword: start-sniffing!\n'
```
Now we start sniffing on the `esp0s3` interface and then we'll run the `./init_sat` again.
```bash
> tcpdump -i enp0s3 -w dump.pcap
```
```
Welcome. Enter (a) to display config data, (b) to erase all data or (c) to disconnect

a
Username: brewtoot password: CTF{4efcc72090af28fd33a2118985541f92e793477f}  166.00 IS-19 2019/05/09 00:00:00  Swath 640km Revisit capacity twice daily, anywhere Resolution panchromatic: 30cm multispectral: 1.2m  Daily acquisition capacity: 220,000km.. Remaining config data written to: https://docs.google.com/document/d/14eYPluD_pi3824GAFanS29tWdTcKxP_XUxx7e303-3E
b
Insufficient privileges.
a
Username: brewtoot password: CTF{4efcc72090af28fd33a2118985541f92e793477f}  166.00 IS-19 2019/05/09 00:00:00  Swath 640km Revisit capacity twice daily, anywhere Resolution panchromatic: 30cm multispectral: 1.2m  Daily acquisition capacity: 220,000km.. Remaining config data written to: https://docs.google.com/document/d/14eYPluD_pi3824GAFanS29tWdTcKxP_XUxx7e303-3E
login
Enter (a) to display config data, (b) to erase all data or (c) to disconnect

c
Disconnecting, goodbye.
```

**FLAG: CTF{4efcc72090af28fd33a2118985541f92e793477f}**