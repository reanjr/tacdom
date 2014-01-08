When Lemmings Attack
====================
When Lemmings Attack is the first installment in the game Tactical Domination.
The goal is an ambitious, multi-platform, mass multi-player online (MMO) game of
strategy and tactics.  Additional installments will be themed after different
animal species and playable with one another.

When Lemmings Attack - Tactical Domination has passed the initial design stage
and is now entering development.  Initial development is targeting Chrome.
Future development is roughly expected to target Chrome Web Store, WebKit, and
Android, in that order.

The game software (Tactical Domination or tacdom) will be free and open source.
Engagement Mode will be free to play on all platforms.  This serves as a demo.
Campaign Mode and Chronicle Mode will only be freely available in the browser.
Additional themes and modes will be available for purchase in the Chrome Web
Store and Play Store.

Dependencies
------------
 * Node - the game server is developed in node
 * Mustache for templates - chosen over Handlebars because it promotes templates
   free of logic
 * Require.js for dependency injection - if needed, may be used in node to
   facilitate code reuse between client and server
 * Famo.us - once engine is released, web client will be ported to it

Alpha
-----
For initial testing, the game will target the following features.  This will
serve to provide some baseline feedback on the game mechanics.

 * Authentication by session id (no player accounts)
 * Session associated to a named Commander unit
 * Statistics tracked for Commander and other units
 * Create Engagement
   - N/S/E/W deployment tiles (4 players max, [W/E 2 players?])
   - map size 4 (deployment at 4W, 4E, 4N, 4S, around origin O)
   - turn-based deployment (one turn per unit)
   - 1 of each unit
     * Commander (Command action)
     * Archer (Range 2-5)
     * Infantry (Attack++, Defense++)
     * Irregular (Speed++)
   - deployment turn may be skipped
   - deployment stops after 4 turns
   - start game
 * Initiative
   - each unit is assigned an initial order randomly
   - place units in circular doubly linked list
   - unit gets 2 actions on their turn
   - each skipped action moves uit intiative forward one place
 * Actions
   - Attack - physically attack another unit
   - Move - move number of tiles up to unit speed
   - Command - give action to another unit
 * Engagement ends when one band defeats the other

Engagement Mode
---------------
 - standalone quick game or part of a campaign
 - start with gold (post-alpha)
 - hire mercenaries

Campaign Mode
-------------
 - standalone series of engagements or part of a chronicle
 - start with small number of combat units
 - each turn triggers engagement or provides options

Chronicle Mode
--------------
 - persistent MMO game
 - start as small hunter gatherer tribe
 - breed, research, train
 - build forces and send them on campaigns for rewards
 - lasts as long as the player desires

Technical Notes
---------------

### Markup/CSS Conventions
 - dynamically-generated (but not dynamically injected) content should use class
   names beginning with a hyphen (ex.: -foo-thing)

### Script Conventions
 - use "t" prefix for AMD loaded templates
   require(["stache!foo"], function(tFoo) {})

### UI Architecture
Games - ResourceCollection
 - .on("create", function(res) {
      EngagementSetup.bind(res)
      GameSpace.select("engagementSetup")
    })
Game - Resource
GameSpace - Space
 - <virtual> dynamic; dialogs, interrupts, etc.
    - login
       - Dialog
          - <form>
 - engagements
    - CreateEngagement - Button
       - .wire(Games, "post")
    - Engagements - List
       - .bind(Games, engagement.tpl)
 - engagementSetup
    - EngagementSetup - EngagementView
       - Size - IntegerView
          - .bind("size")
       - IncreaseSize - Button
          - .wire(IntegerView, "increment")
       - DecreaseSize - Button
          - .wire(IntegerView, "decrement")
