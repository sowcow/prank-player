#
# gotta find a way to put a checklist for any step here
#

Feature: Main app usage scenario

  Scenario: User uploads files
    Given initial state
    And this state is "some initial"
    #####
    Given user has a directory:
      """
      name: phrases
      files:
        - greeting.mp3
        - bait.mp3
        - punch.mp3
      """
    When user uploads the directory "phrases"
    Then user sees new entry "greeting"
    Then user sees new entry "bait"
    Then user sees new entry "punch"
    And this state is "after upload"

  @wip @deltas
  Scenario: User previews audios
    Given the state "after upload"
    When user clicks "new entry: greeting"
    Then it should play "greeting.mp3"

  @next
  Scenario: User arranges soundboard
    Given the state "after upload"
    When user clicks "greeting"
    Then it should play "greeting.mp3"
    And this state is "after arrangement"

  @next
  Scenario: User saves changes
    Given the state "after arrangement"
    When user chooses "save" in the menu
    Then it should download "soundboard.json"
    And this state is "after saving"

   # OMG: compose files and add soundboard.json to them...
   # are files are part of the named state?
   # then also you add more files
   # and upload and see new buttons...
