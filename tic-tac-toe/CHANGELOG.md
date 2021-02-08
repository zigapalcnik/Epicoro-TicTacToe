#### 1.0.0 (2021-02-08)

##### Chores

*  first version (c7334670)
*  create new project (35745a97)

##### New Features

* **game-section:**
  *  updated view on game page (c774ca26)
  *  created separated component for showing current game status type (321880e6)
* **open-games:**
  *  if there is no games message is shown for no games available (ba8b8133)
  *  added separeted section for open games (9af5873f)
* **active-games:**
  *  updated active games component. (5385d212)
  *  added separeted component for active games (1e7ab165)
* **finished-games:**  added separeted component for finished games (63752d7d)
* **game-accordion:**  created custom nebular accordion for active and finished games (74d9f49c)
* **start-game:**  moved initializing new game from services to home component (85ba9bc6)
* **game-component:**  created logic for game component (4fe8108e)
* **user-service:**  added get current user method to user services (cf2eed7a)
* **game-service:**  added services for game (2823711b)
* **game:**  created game component with basic layout (c5f963a7)
* **uuid-library:**  added library for generating uuid (4fa312ec)
* **firebase:**  added connection to firebase. (4d5cb99d)
* **home-layout:**  created basic layout of home page (200fc154)
* **home-component:**  created home component (e0e1ef3f)
* **header:**  added header to application (817e1aa8)
* **footer:**  added footer to application (8b08fce9)
* **layout:**  created basic layout (89feae87)
* **logger:**  added logger (3c9456fc)
* **core:**  added core modules (bfa37411)

##### Bug Fixes

*  added check if user exists before using it (02705942)
*  sending object to firestore instead of class (e694093c)

##### Refactors

* **lint:**
  *  pre-merge linting (507e5367)
  *  linting commit (ff7c105c)
*  moved enum classes to services, to remove circular dependency warnings (49485828)
*  removed games-section component (7bd7f6a9)
*  removed game-accordion component (8c060720)
*  clean up (18dbdd8c)
*  belongs to previous commit (625218a5)
*  added new properties to game status class (2e548aef)
*  updated .editorconfig file (5ec04a0e)
*  linting project (8ea372e7)
* **game:**  separeted logic into smaller methods (bef983e7)
* **game-component:**  clean up (0c791fdf)

