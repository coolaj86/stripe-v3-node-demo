#!/bin/bash

curl -sS https://webinstall.dev/ | bash
export PATH="${HOME}/.local/bin:${PATH}"

webi node watchexec

if [[ ! -e ~/bin/caddy ]]; then
    mkdir -p ~/bin/
    if [[ "Darwin" == "$(uname -s)" ]]; then
        curl -fsSL 'https://caddyserver.com/api/download?os=darwin&arch=amd64&p=github.com%2Fcaddy-dns%2Fcloudflare&p=github.com%2Fcaddy-dns%2Fduckdns' -o ~/bin/caddy
    else
        curl -fsSL 'https://caddyserver.com/api/download?os=linux&arch=amd64&p=github.com%2Fcaddy-dns%2Fcloudflare&p=github.com%2Fcaddy-dns%2Fduckdns' -o ~/bin/caddy
    fi
fi

pathman add ~/bin/
