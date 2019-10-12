#include "FastLED.h"
#define NUM_LEDS 50
#define DATA_PIN 6

CRGB leds[NUM_LEDS];

void setup() {
  Serial.begin(9600);
  FastLED.addLeds<WS2811, DATA_PIN>(leds, NUM_LEDS);
}

void loop() {
  if (Serial.available()) {
    char letter = Serial.read();
    int light = (letter | 0x20) - 'a';
    if (light >= 26 || light < 0) {
      if (letter == ' ') {
        delay(1000);
      }
      if (letter == '!') {
        flash();
      }
      return;
    }
    
    blinkLight(light);
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
    long light = random(0, NUM_LEDS);
    leds[light] = CHSV(light * 51, 255, 255);
    FastLED.show();
    leds[light] = CRGB::Black;
  }
  FastLED.show();
}
