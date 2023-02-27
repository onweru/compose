+++
description = "Use github actions with compose theme"
title = "Leverage Github actions"
weight = 11
+++

This theme ships with 2 github actions inside the exampleSite folder:

1. AWS CI
2. Algolia CI

## AWS CI

  This helps you to autodeploy your hugo website from github to an AWS s3 bucket. Set the secrets in the action accordingly and voila.

## Algolia CI

  This action will automatically update your algolia search index. No extra npm manual setup will be needed.

These actions are customizable to fire off under your specified set of circumstances.

By default, the actions will be off, so be sure to turn them on, and set the github actions secrets appropriately.

```shell
name: Update Algolia Search Index

off: # change to `on:` to turn on
```