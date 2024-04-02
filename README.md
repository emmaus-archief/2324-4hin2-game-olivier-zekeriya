Deze game is gebaseerd op het template voor 4HV van het Emmauscollege Rotterdam

## Mijn spel: *naam van het spel*
Gemaakt door: *naam van leerling*

### Beschrijving
Dit spel is een shooter. 
De speler moet vijanden ontwijken. 
Vijanden kunnen worden neergeschoten. 
Als de speler een vijand raakt dan verliest de speler health. 
Als de health op is, dan ben je af. 
Hoe langer je het volhoudt, hoe meer punten je krijgt.
Het doel is om zoveel mogelijk punten te halen.

## Mijn planning
Werk de planning af van boven naar beneden<br>
Geef aan met [x] welke onderdelen af zijn

### Basisstappen
Optioneel: extra onderdelen, je kunt die overslaan<br>
- [x] 1. maak index.html, style.css en script.js met canvas
- [ ] 2. teken speler
        - Maak de afmeting van de speler 50x50 pixels
        - Gebruik variabalen spelerX en spelerY als middelpunt van de speler
- [ ] 3. beweeg speler met pijltjetoetsen
        - Gebruik de functie keyIsDown() om te kijken welke toets is ingedrukt
- [ ] 4. beperk beweging tot schermranden
- [ ] 5. tekenVijand
        - De afmeting van de vijand is 50x50 pixels
        - Gebruik twee variabelen vijandX en vijandY die het midden van de vijand aanwijzen
- [ ] 6. beweegVijand vallend
- [ ] 7. zet vijand bovenaan als gevallen
    De afmeting van het scherm vind je in de setup() functie
- [ ] 8. console-bericht bij botsing speler-vijand
    Gebruikt console.log om iets op de console te schrijven
- [ ] 9. toon HP, elke botsing is lagere HP
- [ ] 10. toon punten, elke seconde 1 punt erbij
- [ ] 11. game over scherm met punten als HP op is
- [ ] 12. optioneel: intro scherm met speluitleg, enter is start
- [ ] 13. maak 3 vijanden op een rij
        - Kopieer de code die de vijanden beweegt en tekent
        - Gebruik variabelen vijandX1, vijandX2 enzovoort
        - Zet de vijanden op dezelfde hoogte op de y-as
        - Gebruik een afstand van 150 pixels op de x-as tussen twee vijanden
- [ ] 14. maak 3 vijanden op een rij met een loop
    Verander de code zodat er een loop gebruikt wordt
- [ ] 15. maak 8 vijanden op een rij met een loop
        - Verander het aantal keer dat de loop wordt herhaald
- [ ] 16. optioneel: maak 8 vijanden op willekeurige plekken met een loop en array
- [ ] 17. tekenKogel ergens
- [ ] 18. zet kogel bij speler als spatie wordt ingedrukt
- [ ] 19. beweegKogel omhoog
- [ ] 20. console-bericht bij botsing kogel-vijand
- [ ] 21. verwijder kogel en vijand als geraakt
- [ ] 22. optioneel: maak 10 kogels met loop en array
- [ ] 23. optioneel: schiet maar 1 kogel telkens als spatie wordt ingedrukt

### Uitbreidingen
Kies de uitbreidingen die je leuk vindt en maak je game nog mooier
- [ ] Gebruik plaatjes voor de vijanden
- [ ] Animeer speler
- [ ] Laat badges vallen die extra's aan speler geven
- [ ] Maak spel steeds moeilijker door toenemend aantal vijanden met tekenVijand
- [ ] Maak andere vijanden bij toenemen tekenVijand
- [ ] Laat vijanden bewegen in patronen
- [ ] Maak bediening met touch of bewegen van telefoon mogelijk (zorg dat toetsenbordbediening ook blijft werken)
- [ ] ...

## Documentatie
- Khan Academy cursus JavaScript met p5js library 
https://www.khanacademy.org/computing/computer-programming/programming
- p5js reference 
https://p5js.org/reference/
- informatie van Emmauscollege over game opdracht
https://emmauscollege.github.io/informatica/game/

## Credits
- Game template van het Emmauscollege Rotterdam https://github.com/emmauscollege/4HV-game-template
- manifest.json https://codelabs.developers.google.com/codelabs/your-first-pwapp/#3
- icon http://www.iconarchive.com/show/android-lollipop-icons-by-dtafalonso/Play-Games-icon.html
- ...
