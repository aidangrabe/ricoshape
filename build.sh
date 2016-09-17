
SRC_FILES=$(egrep -o "[^\"]*.js" index.html)
OUTPUT=

for srcFile in ${SRC_FILES[@]}; do
	OUTPUT=$OUTPUT$(cat "$srcFile")
done

echo "$OUTPUT" > build/game.js