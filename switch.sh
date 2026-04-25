#!/bin/bash
# Usage: ./switch.sh 1   or   ./switch.sh 2

EXAMPLE="example-$1"

if [ -z "$1" ]; then
  echo "Usage: ./switch.sh 1   or   ./switch.sh 2"
  exit 1
fi

if [ ! -d "$EXAMPLE" ]; then
  echo "Folder '$EXAMPLE' not found."
  exit 1
fi

rm -rf src public
cp -r "$EXAMPLE/src" src
cp -r "$EXAMPLE/public" public

echo "✓ Switched to $EXAMPLE — run 'npm run dev' to start."
