#!/bin/bash

# Script to upload the website.

# Upload - not complete
#aws s3 sync --include '*.html' s3://gaskellball.com --profile toms3cli
aws s3 sync  .  s3://gaskellball.com --exclude '*' --include '*.html' --profile toms3cli 

# Only once, set the policy for the bucket
#aws s3api put-bucket-policy --bucket gaskellball.com --policy file://policy.json --profile toms3cli
