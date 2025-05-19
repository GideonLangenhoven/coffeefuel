#!/bin/bash
# Script to remove all reference numbers from LearnSolar.js

FILE_PATH="/Users/user/Miles/coffeefuel/src/Components/LearnSolar/LearnSolar.js"
TEMP_FILE="/Users/user/Miles/coffeefuel/src/Components/LearnSolar/LearnSolar.js.tmp"

# Use sed to remove all <sup>X</sup> patterns
sed 's/<sup>[0-9]\+<\/sup>//g' "$FILE_PATH" > "$TEMP_FILE"

# Replace the original file with the modified one
mv "$TEMP_FILE" "$FILE_PATH"

echo "All reference numbers have been removed from LearnSolar.js"
