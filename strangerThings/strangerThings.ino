#include "FastLED.h"
#define NUM_LEDS 50
#define DATA_PIN 6

CRGB leds[NUM_LEDS];
uint8_t lightLocations[] = { 46, 45, 44, 43, 42, 41, 40, 39, 21, 22, 23, 24, 25, 26, 27, 28, 29, 11, 10, 9, 8, 7, 6, 5, 4, 3 };

void setup() {
  Serial.begin(9600);
  FastLED.addLeds<WS2811, DATA_PIN>(leds, NUM_LEDS);
}

void loop() {
  if (Serial.available()) {
    char letter = Serial.read();
    char maskedLetter = letter | 0x20;
    
    if (maskedLetter >= 'a' && maskedLetter <= 'z') {
      blinkLight(lightLocations[maskedLetter - 'a']);
    }
    else if (letter == ' ') {
      delay(800);
    }
    else if (letter == '!') {
      flash();
    }
  }
}

void blinkLight(int light) {
  for (int j = 0; j <= 255; j += 8) {
    leds[light] = CHSV(light * 51, j, j);
    FastLED.show();
  }
  delay(1000);
  for (int j = 255; j >= 0; j -= 8) {
    leds[light] = CHSV(light * 51, j, j);
    FastLED.show();
  }
  leds[light] = CRGB::Black;
  FastLED.show();
}

void flash() {
  for (int i = 0; i < 2000; i++) {
    long light1 = random(0, NUM_LEDS);
    long light2 = random(0, NUM_LEDS);
    leds[light1] = CHSV(light1 * 51, 255, 255);
    leds[light2] = CHSV(light2 * 51, 255, 255);
    FastLED.show();
    leds[light1] = CRGB::Black;
    leds[light2] = CRGB::Black;
  }
  FastLED.show();
}
