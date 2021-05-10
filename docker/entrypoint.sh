#!/bin/sh

yo tf-module --no-insight

if [ ! "$myuid" = "" ] ; then
  sudo chown -R "$myuid" .
fi
