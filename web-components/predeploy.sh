
# remove the version hash from our base javascript file for a stable URL
find build/static/js -name "main.*.js" -exec mv '{}' build/static/js/main.js \;