###Instructions for SSH access to the instance

1. Download Private Key below
2. Move the private key file into the folder `~/.ssh` (where ~ is your
    environment's home directory). So if you downloaded the file to the
    Downloads folder, just execute the following command in your terminal.

        mv ~/Downloads/udacity_key.rsa ~/.ssh/

3. Open your terminal and type in

        chmod 600 ~/.ssh/udacity_key.rsa

4. In your terminal, type in

        ssh -i ~/.ssh/udacity_key.rsa root@52.25.36.217

5. After changing port from 22 to 2200, must specify port to connect

        ssh -i ~/.ssh/udacity_key.rsa root@52.25.36.217 -p 2200


###Development Environment Information

Public IP Address

        52.25.36.217
