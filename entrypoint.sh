#!/bin/bash
[ ! -d "/services/poster/node_modules" ] && exec npm install
exec npm run dev