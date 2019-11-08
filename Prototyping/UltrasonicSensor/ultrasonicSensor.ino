/*
 * This code detects whether or not a chair is occupied. If an object is within <DIST_THRESHOLD>cm of 
 * the sensor it is considered occupied and will light up an LED.
 * 
 */

#include <Wire.h>

const int TRIG_PIN = 9;
const int ECHO_PIN = 10;
const int LED_PIN = 4;

long dur;
int dist;
const int DIST_THRESHOLD = 40;

bool occupied = false;

void setup() 
{   
    pinMode(TRIG_PIN, OUTPUT);
    pinMode(ECHO_PIN, INPUT);
    pinMode(LED_PIN, OUTPUT);

    Serial.begin(9600);
    delay(1000);
}

void loop() 
{
    digitalWrite(TRIG_PIN, HIGH);
    delayMicroseconds(10);
    digitalWrite(TRIG_PIN, LOW);

    dur = pulseIn(ECHO_PIN, HIGH);
    dist = dur*0.034/2;

    if (dist > DIST_THRESHOLD) {
      occupied = false;
    } else {
      occupied = true;
    }

    if (occupied) {
      digitalWrite(LED_PIN, HIGH);
    } else {
      digitalWrite(LED_PIN, LOW);
    }
    
    Serial.print("Distance: ");
    Serial.println(dist);

    delay(1000);
}

