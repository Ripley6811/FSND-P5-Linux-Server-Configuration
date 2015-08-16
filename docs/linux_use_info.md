##Commands

`exit` : Logout from user or (root) disconnect from ssh (**Ctrl+D**)

`pwd` : Show current directory

`ls` : list current directory

`ls -a` : List current dir with hidden files

`ls -al` : List current dir with hidden files in long format

`cd /home` : Change to home directory

`echo $PATH` : The path the system uses to find a command or program

`sudo` : Run as root user

`cat /etc/apt/sources.list` : Show packages list for distribution

`sudo apt-get update` : Make system aware of updates

`sudo apt-get upgrade` : Update system files

`man` : Show manual

`man apt-get` : Show manual for "apt-get" command

`sudo apt-get install finger` : Install a package called "finger"

`cat /etc/passwd` : Information about each user

`sudo adduser grader` : Add a new user called "grader" and answer following questions

`su - grader` : Switch to "grader" user

`man passwd` : See manual for "passwd" command

`sudo passwd -e grader` : Immediately expire "grader" password, will need to reset

`sudo service ssh restart` : Restarts the ssh system (for login process changes)

`chmod 765 ...` : Change permission for `...` file to 765 (rwxrw-r-x)

`chgrp root ...` : Change group to root

`chown root ...` : Change owner to root

##Terms

`bin` : Files available to all users

`sbin` : Files available only to root user

`etc` : Configuration files

`var` : Files that typically grow over time

`sudo` : Do as substitute user
