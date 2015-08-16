###I. Setting up project and environment

1. Set up new project folder using GitHub for Windows and selecting the "Node"
    **Git ignore** option. Selecting "Node" adds `.git*` files and `npm*` files
    and `node_modules` folder to the `.gitignore` file and will not be queued
    for commiting to repository.

2. Downloaded ssh private key for online *development environment* through
    Udacity at https://www.udacity.com/account#!/development_environment

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
