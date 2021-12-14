#!/bin/bash

if [[ "Darwin" == "$(uname -s)" ]]; then
    serviceman add --user --path "$PATH" --name stripe-demo -- \
        watchexec -e js -r -- -- \
        npm run start -- --port 4242
else
    sudo env PATH="$PATH" \
        serviceman add --system --username "$(whoami)" --path "$PATH" --name stripe-demo -- \
        watchexec -e js -r -- -- \
        npm run start -- --port 4242
fi
