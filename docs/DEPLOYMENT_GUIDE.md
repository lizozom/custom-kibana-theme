# How to create, install and remove a Kibana plugin

This tutorial will provide step-by-step instructions on how to create, install and remove a Kibana plugin.

## Step 1: Create plugin

In the top level of your plugin folder, run the following command:

node ../../scripts/plugin_helpers

NOTE ONE: When it asks for version, the format should be as follows: major.minor.patch (e.g. 8.2.0) and this plugin will only work for this version.

NOTE TWO: The plugin is a zip file located in the build folder.


## Step 2: Install or remove plugin

To install the plugin:
sudo bin/kibana-plugin install file:///Some/Path/customKibanaLogo-8.2.0.zip

To check your installed plugins:
sudo bin/kibana-plugin list

To remove the plugin:
sudo bin/kibana-plugin remove customKibanaLogo

## Step 3: Restart Kibana
sudo systemctl restart kibana.service
