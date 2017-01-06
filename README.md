# Linux Server Configuration Project

> Take a baseline installation of a Linux distribution on a virtual machine and prepare it to host web applications, to include installing updates, securing it from a number of attack vectors and installing/configuring web and database servers.

Project managed by Jay William Johnson.

* [How to connect](#how-to-connect)
* [Overview & Configuration Summary](#overview-configuration-summary)
* [Project Walkthrough](#project-walkthrough)
* [References](#references)


## How to connect
####Public IP address:

~~**`52.25.36.217`**~~ (No longer accessible)

####SSH port:

~~**`2200`**~~

####Application URL

~~http://52.25.36.217/~~

####Application Monitoring URL (Munin)

~~http://52.25.36.217/munin/MuninMonitor/MuninMonitor/index.html~~



## Overview & Configuration Summary
In this project, I configured and secured a remote virtual machine to host a database
server and data-driven application. The bare-bones Linux distribution was
provided by [Udacity](https://www.udacity.com). Apache2 was installed to serve a Python
Flask application that connects to a PostgreSQL database.

####Highlights:

- Apache2 server on Ubuntu system
    - Remotely modified using SSH
    - UFW (firewall) configuration
    - Automated monitoring with *Munin*
    - IP intrusion protection with *Fail2ban*
- Data-driven web site
    - Flask
    - KnockoutJS
    - Google OAuth2
    - PostgreSQL

####Installed packages:

Package Name | Description
--------------: | :------------
**finger** | Displays information about the system users
**ntp** | For synchronizing time over a network
**apache2** | HTTP Server
**libapache2-mod-wsgi** | For hosting Python applications on Apache2
**postgresql** | Database server
**git** | Version control system tools
**python-setuptools** | Includes easy-install to facilitate installing Python packages
**sqlalchemy** | ORM and SQL tools for Python
**flask** | Microframework for website
**python-psycopg2** | PostgreSQL adapter for Python
**oauth2** | Authorization framework for using third-party login
**google-api-python-client** | Google API for OAuth login
**fail2ban** | Intrusion protection by IP banning
**munin** | System monitoring and email notifications

####Summary of file and configuration changes:

- A system user called "grader" was added with sudo permissions.
- Installed packages were updated.
- SSH port was changed from 22 to 2200.
- "Root" denied permission to log in through SSH.
- Local timezone changed to UTC.
- Apache2 and Python WSGI were installed.
- Git installed and restaurant menu application set up on server.
- UFW configured to allow ports 80, 2200, and 123 and deny port 22.
- PostgreSQL left with default settings to *not* allow remote connections.
- User called 'catalog' added to PostgreSQL database for app connection.
- *Fail2ban* intrusion protection installed that bans suspicious IPs.
- CRON tasks added to `update` and `upgrade` installed packages.
- *Munin* software installed to provide system status data and email alerts.

*NOTE*: See "walkthrough" for more details.



## Project Walkthrough
####I. Setting up project folder, environment and tools
> This section shows the initial steps I took to connect to the development
environment, set up the GitHub project folder.

1. Set up new project folder using GitHub for Windows and selecting the "Node"
    **Git ignore** option. Selecting "Node" adds `.git*` files and `npm*` files
    and `node_modules` folder to the `.gitignore` file and will not be queued
    for commiting to repository.

2. Downloaded ssh private key for online *development environment* through
    Udacity at https://www.udacity.com/account#!/development_environment

        > ssh -i ~/.ssh/udacity_key.rsa root@52.25.36.217

3. Installed Grunt to project folder and `grunt-readme` for stitching a
    readme.md from templates. I like
    using this because it separates README sections into separate files for
    better organization and convenience in updating.

        > npm install grunt --save-dev
        > npm install grunt-readme --save-dev

4. Initialize npm `package.json` file. Answer questions about project to create
    basic *node package manager* file.

        > npm init

5. Added basic `Gruntfile.js` file for running the *grunt-readme* building task.
    Then ran `grunt` to build `README.md`.

        > grunt

6. Converted private key to `*.ppk` format for use with **PuTTY** ssh using
    [puttygen.exe](http://www.chiark.greenend.org.uk/~sgtatham/putty/download.html?cm_mc_uid=08489393270114397828633&cm_mc_sid_50200000=1439782863).

####II. Configuring SSH and UFW
> This sections shows the steps for adding a user, setting permissions and
configuring the firewall and ports.

1. Update all currently installed packages by calling `apt-get update` to
    download list of package versions and then `apt-get upgrade` to actually
    update system versions.

        # sudo apt-get update
        # sudo apt-get upgrade

2. Install `finger` to display information about the system users.

        # sudo apt-get install finger

3. Add new user called "grader" and fill in some user info.

        # sudo adduser grader

4. Give the *grader* the permission to sudo
    - Open a new file with nano editor

            # nano /etc/sudoers.d/grader
    - Add permissions line to file in `sudoers.d` directory

            grader ALL=(ALL:ALL) NOPASSWD:ALL

5. Create key pair
    - On **local machine**, generate key pair

            > ssh-keygen
    - Copy public key (`id_rsa.pub`) **from local machine to the server** `.ssh`
        directory as file `authorized_keys` using `nano` for editing.

            grader@ip-10-20-36-68:~$ mkdir .ssh
            grader@ip-10-20-36-68:~$ touch .ssh/authorized_keys
            grader@ip-10-20-36-68:~$ nano .ssh/authorized_keys

        - NOTE: Text should be one line; remove newline characters.

6. Set permissions on directory and file

        $ chmod 700 .ssh
        $ chmod 644 .ssh/authorized_keys

7. Set login to only accept key pair and not allow password.
    ("PasswordAuthentication" was already set to "no")

        $ nano /etc/ssh/sshd_config

8. Change SSH port from 22 to 2200
    - Change `Port 22` near the top of `sshd_config` to `Port 2200` and save.

            $ sudo nano /etc/ssh/sshd_config
    - Restart the ssh service.

            $ sudo service ssh restart

    - Log now requires the `-p` flag.

            > ssh -i ~/.ssh/udacity_key.rsa root@52.25.36.217 -p2200

9. Reboot the system for (security) updates to take effect

        $ sudo reboot

10. Configuring default firewall settings

        $ sudo ufw default deny incoming
        $ sudo ufw default allow outgoing
        $ sudo ufw allow ssh
        $ sudo ufw allow 2200/tcp
        $ sudo ufw allow www
        $ sudo ufw deny 22

11. Activate firewall when configuration settings are correct

        $ sudo ufw enable

12. Configure the local timezone to UTC

        $ sudo dpkg-reconfigure tzdata

    - Select "None of the above", then select "UTC" near the bottom of the list.

13. Install NTP and allow firewall port 123

        $ sudo apt-get install ntp
        $ sudo ufw allow 123/tcp

14. Turn off root SSH login

        $ sudo nano /etc/ssh/sshd_config

    - Change "`PermitRootLogin without-password`" to "`PermitRootLogin no`"

    ```
    $ sudo service ssh restart
    ```



####III. Installing Apache, PostgreSQL and Python
> This section walks through the process of installing the website and software
to run it.

1. Install Apache2

        $ sudo apt-get install apache2

2. Test editing the default main page

        $ sudo nano /var/www/html/index.html

3. Install Apache2 application handler (`apache2-mod-wsgi` doesn't exist?)

        $ sudo apt-get install libapache2-mod-wsgi

4. Configure Apache2 to handle WSGI module by adding
    "`WSGIScriptAlias / /var/www/html/myapp.wsgi`" to the following file and
    restarting apache:

        $ sudo nano /etc/apache2/sites-enabled/000-default.conf
        ...
        $ sudo apache2ctl restart

5. Install PostgreSQL and give grader access

        $ sudo apt-get install postgresql
        $ sudo -u postgres createuser --superuser grader

6. Install git

        $ sudo apt-get install git

7. In *grader* home directoy clone Project 3 Flask application

        $ git clone https://github.com/Ripley6811/FSND-P3-Item-Catalog

    - This creates a folder called "FSND..." in the home directory

8. Copy Catalog app to `/var/www/html`

        $ sudo cp -a FSND-P3-Item-Catalog/vagrant /var/www/html

9. Install "easy_install" and use it to install SQLAlchemy, Oauth2, etc.

        $ sudo apt-get install python-setuptools
        $ sudo easy_install sqlalchemy
        $ sudo easy_install Flask
        $ sudo apt-get install python-psycopg2
        $ sudo easy_install oauth2
        $ sudo easy_install google-api-python-client
        $ sudo apache2ctl restart

10. Run database setup file in the project

        .../catalog$ python database_setup.py
        .../catalog$ python fake_data.py

    - NOTE: Use `psql postgres` to log in to database

11. Create role (user) called "catalog"

        $ psql postgres
        # CREATE USER catalog WITH PASSWORD 'c641111'
        # grant all privileges on restaurants to catalog;
        # \c restaurants
        # grant all privileges on menu_item, menu_item_rating, "user", user_id_seq, menu_item_id_seq, menu_item_rating_id_seq, restaurant_id_seq to catalog;
        $ sudo adduser catalog

12. Added IP to authorized JavaScript origins in credentials through Google Developers Console.

13. OAuth giving SSL error, used a [solution on stackoverflow](http://stackoverflow.com/a/19145997/1172891)
    to edit the permissions on the **cacerts.txt** file and fixed the problem.

        $  sudo chmod 644 /usr/local/lib/python2.7/dist-packages/httplib2-0.9.1-py2.7.egg/httplib2/cacerts.txt

14. Ensure postgresql database does not allow remote connections, this should be
    the default setting.

        $ sudo nano /etc/postgresql/9.3/main/pg_hba.conf
        $ sudo nano /etc/postgresql/9.3/main/postgresql.conf



####IV. Extra Services
> This section walks through the process of adding more security features like
blocking unusual activity with the firewall and keeping all packages up-to-date.

1. Added two CRON jobs to "update" and (2 minutes later) to "upgrade"

        $ crontab -e

        0 5 * * 1 sudo apt-get update
        2 5 * * 1 sudo apt-get upgrade

2. Firewall has been configured to block IPs after repeated failed login attempts.
    I decided to install Fail2Ban
    and followed [instructions found online](https://www.digitalocean.com/community/tutorials/how-to-protect-ssh-with-fail2ban-on-ubuntu-14-04)
    to configure it. Edited the bantime and email address for reports in the`jail.local` file.

        $ sudo apt-get install fail2ban
        $ sudo cp /etc/fail2ban/jail.conf /etc/fail2ban/jail.local
        $ sudo nano /etc/fail2ban/jail.local
        $ sudo service fail2ban stop
        $ sudo service fail2ban start

3. Install monitoring application called **Munin** for automated feedback on
    application status and system alerts. Following [this online guide for setting up](https://www.digitalocean.com/community/tutorials/how-to-install-munin-on-an-ubuntu-vps)
    and [this one on email alerts](http://blog.edseek.com/archives/2006/07/13/munin-alert-email-notification/).

        $ sudo apt-get munin
        $ sudo nano /etc/munin/munin.conf  # Edit values, set up email alerts
        $ sudo nano /etc/munin/apache.conf  # Edit values
        $ sudo mkdir /var/www/munin
        $ sudo chown munin:munin /var/www/muni  # Allow munin to edit
        $ sudo service munin-node restart
        $ sudo service apache2 restart




## References
- [How to setup SSH access to development environment](https://www.udacity.com/account#!/development_environment)
- [Grunt getting started guide](http://gruntjs.com/getting-started)
- [Grunt-readme documentation](https://github.com/jonschlinkert/grunt-readme/blob/master/DOCS.md)
- [How to switch users on Linux](http://unix.stackexchange.com/questions/3568/how-to-switch-between-users-on-one-terminal)
- [How to reboot the system from ssh](http://askubuntu.com/questions/258297/should-i-always-restart-the-system-when-i-see-system-restart-required)
- [Configuring timezone and NTP](https://www.digitalocean.com/community/tutorials/additional-recommended-steps-for-new-ubuntu-14-04-servers)
- [List of tutorials on configuring a server for different uses](https://www.udacity.com/course/viewer#!/c-ud299-nd/l-4331066009/m-4801089500)
- [Sudoers file description](https://www.udacity.com/course/viewer#!/c-ud299-nd/l-4331066009/m-4801089470)
- [Convert private key for use with PuTTY](http://meinit.nl/using-your-openssh-private-key-in-putty)
- [Troubleshooting problem with logging in as another user through SSH](http://askubuntu.com/a/16930)
- [How to properly create an `authorized_keys` file](http://askubuntu.com/questions/539659/ssh-buffer-get-ret-trying-to-get-more-bytes-4-than-in-buffer-0)
- [How to disable root SSH login](http://www.howtogeek.com/howto/linux/security-tip-disable-root-ssh-login-on-linux/)
- [Package information on libapache2-mod-wsgi](https://packages.debian.org/unstable/python/libapache2-mod-wsgi)
- [How to install git on ubuntu](https://www.digitalocean.com/community/tutorials/how-to-install-git-on-ubuntu-14-04)
- [Deploying Flask app on Apache](http://flask.pocoo.org/docs/0.10/deploying/mod_wsgi/#installing-mod-wsgi)
- [Copy directory to different location on Linux](http://askubuntu.com/questions/80065/i-want-to-copy-a-directory-from-one-place-to-another-via-the-command-line)
- [Set up PostgreSQL on Linux and user permissions](http://www.gotealeaf.com/blog/how-to-install-postgres-for-linux)
- [Create Postgresql role](http://www.postgresql.org/docs/8.1/static/user-manag.html)
- [Google Developers Console projects](https://console.developers.google.com/project)
- [Solution to ssl.SSLError with Google OAuth2](http://stackoverflow.com/a/19145997/1172891)
- [Enable (or disable) remote access to PostgreSQL database server](http://www.cyberciti.biz/tips/postgres-allow-remote-access-tcp-connection.html)
- [Setting up CRON jobs](http://askubuntu.com/questions/2368/how-do-i-set-up-a-cron-job/2371#2371)
- [How to install and configure **Fail2ban**](https://www.digitalocean.com/community/tutorials/how-to-protect-ssh-with-fail2ban-on-ubuntu-14-04)
- [Does Fail2ban port need to be changed?](http://serverfault.com/questions/382858/in-fail2ban-how-to-change-the-ssh-port-number)
- [How to install Munin monitoring software](https://www.digitalocean.com/community/tutorials/how-to-install-munin-on-an-ubuntu-vps)
- [Setting up email alerts in Munin](http://blog.edseek.com/archives/2006/07/13/munin-alert-email-notification/)



