grunt build
git add dist
git commit -m 'release dist'
git push origin master
git push origin :gh-pages
git subtree push --prefix dist origin gh-pages

