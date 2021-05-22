//  disable led screen so that p3 is available for motor control
led.enable(false)
function motorBCoast() {
    pins.digitalWritePin(DigitalPin.P2, 0)
    pins.digitalWritePin(DigitalPin.P3, 0)
}

function motorACoast() {
    pins.digitalWritePin(DigitalPin.P0, 0)
    pins.digitalWritePin(DigitalPin.P1, 0)
}

function setMotorASpeed(speed: number) {
    if (speed < 0) {
        pins.analogWritePin(AnalogPin.P0, -1 * speed * 10)
        pins.digitalWritePin(DigitalPin.P1, 0)
    } else if (speed == 0) {
        motorACoast()
    } else {
        //  speed has to be positive to get here
        pins.digitalWritePin(DigitalPin.P0, 0)
        pins.analogWritePin(AnalogPin.P1, speed * 10)
    }
    
}

input.onButtonPressed(Button.A, function on_button_pressed_a() {
    
    Speed_Right = Speed_Right + 1
})
input.onButtonPressed(Button.AB, function on_button_pressed_ab() {
    
    speed = 0
    Speed_Right = 0
    Speed_Left = 0
    motorACoast()
    motorBCoast()
})
input.onButtonPressed(Button.B, function on_button_pressed_b() {
    
    Speed_Right = Speed_Right - 1
})
function setMotorBSpeed(speed: number) {
    if (speed < 0) {
        pins.analogWritePin(AnalogPin.P2, -1 * speed * 10)
        pins.digitalWritePin(DigitalPin.P3, 0)
    } else if (speed == 0) {
        motorBCoast()
    } else {
        //  speed has to be positive to get here
        pins.digitalWritePin(DigitalPin.P2, 0)
        pins.analogWritePin(AnalogPin.P3, speed * 10)
    }
    
}

let Speed_Left = 0
let speed = 0
let Speed_Right = 0
motorACoast()
basic.forever(function on_forever() {
    //  basic.show_number(Speed_Right)
    setMotorBSpeed(Speed_Right)
})
