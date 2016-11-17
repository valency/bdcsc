# Installation Guide for Ubunu Server 16.04
## Prerequisites
This system requires Deepfox API, the installation of Deepfox API is shown at: https://github.com/valency/franz-api

## Configure NGINX
1. Open NGINX configuration file:
```
sudo vim /etc/nginx/sites-enabled/default
```
2. Wrap BDCSC service to `/ext/hawk/` by adding the following section to `server`:
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
3. Restart NGINX:
```
sudo service nginx restart
```

## Deploy System
```
cd /var/www/html/
git clone <this-repo> bdcsc 
```
In case you do not have sufficient permissions, you may consider `sudo mkdir bdcsc && sudo chown <user>:<group> bdcsc`.

After deployment, you can visit the system at: http://<host>/bdcsc/

## Maintenance
- Restart NGINX (when it is not possible to access the system):
```
sudo service nginx restart
```
- Restart PHP-FPM (when the login page is shown as internal server error (500)):
```
sudo service php-fpm restart 
```
- Restart Deepfox API (when it is not possible to log in), basically:
```
sudo killall python
python manage.py runserver 0.0.0.0:9004
```
More details are shown at: https://github.com/valency/franz-api
- Restart PostgreSQL (when it is not possible to log in, and restarting Deepfox API is not working):
```
sudo service postgresql restart
```