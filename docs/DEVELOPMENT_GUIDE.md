# How to set up the Kibana plugin development environment

This tutorial will provide step-by-step instructions on how to set up the Kibana plugin development environment using a Debian-based Linux distribution.

## Step 1: Install tools

### git

apt-get update && apt-get install git

### nvm

Download install script:

wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash

Load nvm:

export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

### yarn

npm install --global yarn


## Step 2: Clone Kibana's source code

git clone https://github.com/elastic/kibana.git

cd kibana

NOTE: By default, the version of the Kibana is latest. If you would like to work on a specific version of Kibana, make sure to run git checkout <version_number>

## Step 3: Install Kibana's dependencies

Switch to the correct version of Node.js:

nvm use

Bootstrap Kibana and install all the dependencies:

yarn kbn bootstrap


## Step 4: Elasticsearch

In a new terminal window, run the latest Elasticsearch snapshot with the optional license flag:

yarn es snapshot --license trial


## Step 5: Kibana

In a new terminal window, start up Kibana:

yarn start


## Step 6: Clone this repo
cd plugins

git clone https://github.com/lizozom/custom-kibana-logo.git

NOTE: In Kibana plugin development environment, it will monitor the plugins folder for any file change and will update Kibana accordingly


## Step 7: Kibana endpoint

In a browser, navigate to http://localhost:5601  


---

References: Developer guide - [Getting started](https://www.elastic.co/guide/en/kibana/current/development-getting-started.html#_install_dependencies)