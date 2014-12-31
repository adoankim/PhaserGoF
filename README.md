PhaserGoF
=========

Yet another Game of Life test in Phaser.io

Solution
--------
To calculate which cells lives or dies: a directed Graph is built 
and the inbound grade of each vertex is used at the rule matching process to 
calculate next generation cells.

Basic commands
--------------

###init
In order to configure the project dependencies: **npm run init**

###serve
Run http-server instance with default configurations (working dir: public/, port: 8080): **npm run serve**

###clean
To clean all third party dependencies: **npm run clean**

Directory structure
-------------------

| Directory         | Description                         | 
| ----------------- |-----------------------------------  |
| public/           | where all the client code lives     |
| public/css/       | -                                   |
| public/js/        | -                                   |
| public/js/states/ | State classes screen directory      |
| public/js/unit/   | Model classes directory             |
| public/js/utils/  | -                                   |
| test/             | -                                   |