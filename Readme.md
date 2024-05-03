## Setup and use

1. Download repo from github
2. npm i
3. Launch three servers from one terminal each using the script: "npm run node-1" "npm run node-2" "npm run node-3"
4. Use postman to communicate with the blockchain:

[POST] http://localhost:500X/api/v1/members/register-node

{
"nodeUrl": "http://localhost:500X"
}

[GET] http://localhost:500X/api/v1/members

[GET] http://localhost:500X/api/v1/blockchain

[POST] http://localhost:500X/api/v1/blockchain/mine

{
"productName": "Råglimpa"
}

[GET] http://localhost:500X/api/v1/blockchain/consensus

(X = 1, 2 or 3 depening on server/node)

## Dependancies

- express
- dotenv
- uuid

## Development dependancies

- nodemon
- vitest
- @vitest/ui

### Instructions for assignment

Inlämningsuppgift
I den första inlämningen ska ni skapa en node.js applikation som ska efterlikna en blockkedje applikation. Valet av namn och syfte är upp till er själva.

Godkänt krav
Applikationen ska byggas som ett REST API med endpoints för att kunna skapa block i en blockkedja. Det ska dessutom gå att lista alla block i en blockkedja samt hämta ut ett valfritt block ur blockkedjan.

Krav:

Applikationen ska vara uppbyggd kring design mönstret MVC.
Felhantering enligt “best practice” ska användas(det som vi gått igenom)
Blockkedjan ska skrivas till en json fil så att den finns även efter omstart av servern.
Loggning av fel ska skrivas till en fysisk fellogg
ES6 moduler ska användas istället för CommonJS moduler.
Skapandet av block ska ske test drivet(TDD)
Varje block måste verifieras och valideras(“Proof Of Work”)

Väl godkänt krav
För väl godkänt ska data i blocket vara av typen “complex object”, det vill säga antingen en instans av en klass eller ett anonymt objekt.
Centraliserad felhantering måste användas
Centraliserad loggning av applikationen måste användas

Klient

Räcker med Postman

…………………………...

Inlämningsuppgiften examinerar följande läranderesultat från kursplanen:

API-utveckling med Node.js
proof-of-work-baserade system
skapa BackEnd Node.JS-servrar, med ett express-API och TDD
VG-mål för uppgiften:

Den studerande har nått samtliga lärandemål för kursen. Den studerande kan dessutom:

skapa blockchain-objekt som hanterar komplexa objekt
förstå när du ska använda midleware och använda det på ett korrekt sätt
Med högre kvalitet än för betyget G.
