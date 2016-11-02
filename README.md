# Installation Guide for Ubunu Server 16.04
## Prerequisites
```
sudo apt install php-fpm nginx
```
## Configure NGINX
```
sudo vim /etc/nginx/sites-enabled/default
```
Enable PHP by uncommenting / editing the following sections:
```
index index.html index.htm index.php;
location ~ \.php$ {
        include snippets/fastcgi-php.conf;
        fastcgi_pass unix:/run/php/php7.0-fpm.sock;
}

```
Wrap BDCSC service to `/ext/hawk/` by adding the following section to `server`:
```
location /ext/hawk/ {
        proxy_pass http://42.123.72.93:18080/restful/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_read_timeout 43200000;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header Host $http_host;
        proxy_set_header X-NginX-Proxy true;
        proxy_buffering off;
}

```
## Deploy Demo Service
```
cd /var/www/html/
git clone <this-repo> bdcsc 
```
In case you do not have sufficient permissions, you may consider `sudo mkdir bdcsc && sudo chown <user>:<group> bdcsc`.
