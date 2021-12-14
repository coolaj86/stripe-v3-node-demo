#!/bin/bash

export PATH="${HOME}/.local/bin:${PATH}"
if ! command -v webi > /dev/null; then
    curl -sS https://webinstall.dev/ | bash
fi

if ! command -v node > /dev/null; then
    webi node
fi
if ! command -v watchexec > /dev/null; then
    webi watchexec
fi

if [[ ! -e ~/bin/caddy ]]; then
    mkdir -p ~/bin/
    if [[ "Darwin" == "$(uname -s)" ]]; then
        curl -fsSL 'https://caddyserver.com/api/download?os=darwin&arch=amd64&p=github.com%2Fcaddy-dns%2Fcloudflare&p=github.com%2Fcaddy-dns%2Fduckdns' -o ~/bin/caddy
    else
        curl -fsSL 'https://caddyserver.com/api/download?os=linux&arch=amd64&p=github.com%2Fcaddy-dns%2Fcloudflare&p=github.com%2Fcaddy-dns%2Fduckdns' -o ~/bin/caddy
    fi
    chmod a+x ~/bin/caddy
fi

pathman add ~/bin/
