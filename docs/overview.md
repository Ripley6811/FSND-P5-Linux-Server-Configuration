In this project, I configured a remote virtual machine to host a
data-driven application and database server written using KnockoutJS
and PostgreSQL.

Highlights:
- Ubuntu server
    - Remote modification using SSH
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
-------------- | ------------
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
