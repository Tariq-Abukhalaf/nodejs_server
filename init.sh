#!/bin/bash
set -e -x
pm2 start src/commands/consumer.command.js
pm2 save 

