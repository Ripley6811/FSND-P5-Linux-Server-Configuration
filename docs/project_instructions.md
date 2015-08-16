[How will I complete this project?](https://www.udacity.com/course/viewer#!/c-nd004/l-3573679011/m-3620328723)

1. Launch your Virtual Machine with your Udacity account
2. Follow the instructions provided to SSH into your server
3. Create a new user named grader
4. Give the grader the permission to sudo
5. Update all currently installed packages
6. Change the SSH port from 22 to 2200
7. Configure the Uncomplicated Firewall (UFW) to only allow incoming connections for SSH (port 2200), HTTP (port 80), and NTP (port 123)
8. Configure the local timezone to UTC
9. Install and configure Apache to serve a Python mod_wsgi application
10. Install and configure PostgreSQL:
    - Do not allow remote connections
    - Create a new user named catalog that has limited permissions to your catalog application database
11. Install git, clone and setup your Catalog App project (from your GitHub repository from earlier in the Nanodegree program) so that it functions correctly when visiting your server’s IP address in a browser. Remember to set this up appropriately so that your .git directory is not publicly accessible via a browser!
