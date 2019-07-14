#!/bin/bash

echo "ls -la /bin /sbin /usr/bin /usr/sbin" | nc -v readme.ctfcompetition.com 1337 > dump.txt