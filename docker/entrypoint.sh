#!/bin/sh

yo tf-module --no-insight

for dir in */; do
  owner="$(ls -ld "$dir" | awk '{print $3}')"
  if [ "$owner" = "yeoman" ]; then
    if [ ! "$myuid" = "" ]; then
      sudo chown -R -f "$myuid" "$dir" &>/dev/null
    fi
  fi
done
