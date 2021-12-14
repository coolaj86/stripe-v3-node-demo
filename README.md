# stripe-v3-node-demo

A cleaned-up version of the official Stripe v3 QuickStart from
<https://stripe.com/docs/payments/quickstart>.

# Accept a Payment

Build a simple checkout form to collect payment details. Included are some basic
build and run scripts you can use to start up the application.

## Running the sample

I recommend running this on Digital Ocean (grab
[$100 off or 60 days free](https://m.do.co/c/18ec10e74dae) with my link), but
you can run it on a localhost domain as well (with https too, thanks to DuckDNS
and Caddy).

0. Register a domain, such as `stripe-demo-123` at
   [duckdns.org](https://duckdns.org).
1. Replace `example.duckdns.org` with your domain in the
   [`Caddyfile`](/Caddyfile).
2. For **localhost**
   - set your DuckDNS IP to 127.0.0.1
   - replace `{env.DUCKDNS_API_TOKEN}` with your DuckDNS token in the
     [`Caddyfile`](/Caddyfile)
   - uncomment the 3 tls lines (including your DuckDNS) token
3. Install dependencies (node, caddy, watchexec) \
   (note: you may need to close and re-open your terminal between steps)
   ```js
   bash install.sh
   ```
   ```js
   npm ci
   ```
4. Run the server
   ```js
   # register as a system service (works for macOS and Linux)
   bash register-caddy-service.sh
   bash register-node-service.sh
   ```
   ```js
   # or run as a one-off
   caddy start --config ./Caddyfile
   npm run start
   ```
5. Go to <https://example.duckdns.org/> (change to your DuckDNS domain)
6. View logs
   ```bash
   # linux
   sudo journalctl -xefu stripe-demo
   ```
   ```bash
   # mac
   tail -f ~/.local/share/stripe-demo/var/log/stripe-demo.log
   ```
