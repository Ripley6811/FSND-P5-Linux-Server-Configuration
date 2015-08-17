# FSND-P5-Linux-Server-Configuration

> Take a baseline installation of a Linux distribution on a virtual machine and prepare it to host web applications, to include installing updates, securing it from a number of attack vectors and installing/configuring web and database servers.

Project managed by Jay William Johnson.

* [How to connect](#how-to-connect)
* [Overview](#overview)
* [Project Walkthrough](#project-walkthrough)
* [References](#references)


## How to connect
####Public IP address: `52.25.36.217`

####SSH port: `2200`

        ssh -i ~/.ssh/udacity_key.rsa root@52.25.36.217 -p 2200

####Application URL




## Overview


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

2. Install `finger`.

        # sudo apt-get install finger

3. Add new user called "grader" and fill in some user info.

        # sudo adduser grader

4. Give the *grader* the permission to sudo
    - Open a new file with nano editor

            # nano /etc/sudoers.d/grader
    - Add permissions line to file in `sudoers.d` directory

            grader ALL=(ALL) NOPASSWD:ALL

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


        $ sudo service ssh restart

####III. Installing Apache, PostgreSQL and Python
> This section walks through the process of installing the website and software
to run it.



####IV. Adding Completely Udacious Extras
> This section walks through the process of adding more security features like
blocking unusual activity with the firewall and keeping all packages up-to-date.




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


