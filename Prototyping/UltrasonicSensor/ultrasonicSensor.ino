/*
 * This code detects objects distance using an ultrasonic sensor and displays it on an LCD display
 */

#include <Wire.h>
#include "rgb_lcd.h"

rgb_lcd lcd;

const int colorR = 155;
const int colorG = 155;
const int colorB = 155;

const int trigPin = 9;
const int echoPin = 10;

long dur;
int dist;

void setup() 
{
    // set up the LCD's number of columns and rows:
    lcd.begin(16, 2);
    lcd.setRGB(colorR, colorG, colorB);
    
    pinMode(trigPin, OUTPUT);
    pinMode(echoPin, INPUT);

    Serial.begin(9600);
    delay(1000);
}

void loop() 
{
    digitalWrite(trigPin, HIGH);
    delayMicroseconds(10);
    digitalWrite(trigPin, LOW);

    dur = pulseIn(echoPin, HIGH);
    dist = dur*0.034/2;

    lcd.clear();
    lcd.setCursor(0, 0);
    lcd.print("Distance (cm): ");
    lcd.setCursor(0, 1);
    lcd.print(dist);

    Serial.print("Distance: ");
    Serial.println(dist);

    delay(100);
}
