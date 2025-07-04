#!/bin/bash
# Rename lowercase files to PascalCase (first letter capital)

for file in $(find ./src -type f -name "*.jsx"); do
  dir=$(dirname "$file")
  base=$(basename "$file")
  pascal=$(echo "${base:0:1}" | tr '[:lower:]' '[:upper:]')${base:1}
  if [ "$base" != "$pascal" ]; then
    git mv -f "$file" "$dir/$pascal"
  fi
done
