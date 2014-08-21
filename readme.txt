To jest aplikacja kliencka dla Admina, stworzona z uzyciem Yeoman.

Aby wystartowac projekt musisz miec zainstalowany:
 * Nodejs & npm (http://nodejs.org/)
 * Yeaoman (http://yeoman.io/)
	npm install -g yo

Uruchom projekt wykonujac po kolei polecenia:

npm install
bower update
grunt serve

nastepnie otworz w przegladarce:
http://localhost:9000/#/create 

Ten URL sluzy do tworzenia definicji nowego glowania preferencyjnego, po subnmitowaniu formularza zostaniesz przekierowany na strone edycji.

Narazie nie ma zapisu do Mongo DB, dane sa przechowane w przegladarce i po refreshu stronki wszystko wraca do stanu wyjsciowego.

Instalacja na serwerze
------------------------
Strony sa instalowane na github.io
http://piczmar.github.io/glosowaniepreferencyjne-admin

W repozytorium jest branch gh-pages gdzie musza sie znajdowac aktualne zrodla stron.
Budowanie i update stron na serwerze odbywa sie nastepujaco:
1. grunt build
2. git add dist
3. git commit -m 'release dist'
4. git push origin master
5. git push origin :gh-pages
6. git subtree push --prefix dist origin gh-pages

Wiecej informacji o buildach: http://yeoman.io/learning/deployment.html

