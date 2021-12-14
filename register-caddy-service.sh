#!/bin/bash

if [[ "Darwin" == "$(uname -s)" ]]; then
    sudo env PATH="$PATH" \
        serviceman add --user --path "${PATH}"--name caddy -- \
        caddy run --config ./Caddyfile
else
    sudo env PATH="$PATH" \
        serviceman add --system --username "$(whoami)" --path "${PATH}"--name caddy -- \
        caddy run --config ./Caddyfile
fi
