# project-app

A megoldandó feladat egy **Angular CRUD frontend létrehozása Dockerizált környezetben** meglévő API szerverrel. 
Az API szerver egy Strapi headless CMS, a mögötte található adatbázis egy PostgreSQL.
Előbbi helye az `api`, utóbbi helye a `database` mappában található.
Mindkettő Docker környezetben van, `docker compose up` paranccsal indíthatóak.

A `frontend` mappa egy openapi.yaml fájl kivételével üres. **Ebbe a mappába szeretnénk kérni az Angular alkalmazást, illetve a Docker-specifikus fájlokba az oda vonatkozó részeket**.
A cél, hogy egyetlen `docker compose up` paranccsal a teljes projekt elinduljon (adatbázis, API és frontend). 

Az API szerver segítségével **projektek** hozhatók létre, listázhatók, módosíthatók, illetve törölhetők. 
A mellékelt `frontend/openapi.yaml` fájl tartalmazza a lehetséges végpontokat a projektek kezeléséhez. Az adatbázis induláskor egyetlen projektet tartalmaz.

Amennyiben szeretnél belépni a Strapi felületére, azt a [http://localhost:1337/admin](http://localhost:1337/admin) url-en teheted meg. A default felhasználó email címe: `testadmin@dkfkft.hu`, jelszava `3*nFcNCT3iqvyqabejS5y3Xk&kf#!gH5B68Dyn4i^%`
(A feladat megoldásához nem szükséges a Strapi felületre való belépés.)

A felület kialakításába, kinézetébe nem szeretnénk beleszólni, a következő funkciókat szeretnénk kérni:
- lehessen látni a projektek listáját
- lehessen új projektet létrehozni
- lehessen meglévő projektet módosítani (a projekt címét)
- lehessen meglévő projektet törölni

Amennyiben belefér, nagyon örülnénk, ha a következő megoldásokat is látnánk:
- NgRx state management használata
- "sima" HTTP hívások helyett [OpenAPI generátor](https://openapi-generator.tech/) által előállított kód felhasználása, az API ilyen módon történő meghívása. (Ezzel kapcsolatban fontos, hogy a 'delete' metódus az openapi generátor egy ismert hibájából kikerült az openapi.yaml fájlból, vagyis ezt az egy metódust a hagyományos módon, a HttpClient közvetlen meghívásával oldd meg.)

A teljesen fakultatív feladat pedig:
- pre-commit hook használata (husky), amely linter-ezi a módosult (lint-staged) frontend kódot ESLint és/vagy Stylelint segítségével

A megoldást egy fork-olt GitHub privát repository-ba várjuk.

Ha bármilyen kérdésed van, vagy valami nem akar úgy működni ahogy kéne, kérlek jelezd!

Előre is köszönjük a munkádat!



