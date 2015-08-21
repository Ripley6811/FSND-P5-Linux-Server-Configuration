In this project, I configured and secured a remote virtual machine to host a database
server and data-driven application. The bare-bones Linux distribution was
provided by [Udacity](https://www.udacity.com). Apache2 was installed to serve a Python
Flask application that connects to a PostgreSQL database.

###Highlights:

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

###Installed packages:

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

###Summary of file and configuration changes:

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
