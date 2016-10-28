#!/bin/bash

/root/letsencrypt/./letsencrypt-auto certonly --config /home/pedant/www/backor.sk/projekty/react-hypobox/_etc/letsencrypt/hypobox.backor.sk.ini
cat /etc/letsencrypt/live/hypobox.backor.sk/privkey.pem /etc/letsencrypt/live/hypobox.backor.sk/cert.pem > /etc/letsencrypt/live/hypobox.backor.sk/privkey_cert.pem

service lighttpd restart