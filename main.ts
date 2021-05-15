function motorACoast() {
    pins.digitalWritePin(DigitalPin.P0, 0)
    pins.digitalWritePin(DigitalPin.P1, 0)
}

function setMotorASpeed(speed: number) {
    if (speed < 0) {
        pins.analogWritePin(AnalogPin.P0, (0 - speed) * 10)
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
    
    Speed_Left = +1
})
input.onButtonPressed(Button.AB, function on_button_pressed_ab() {
    
    let Speed_Right = +1
    let Speed_Left = +1
    pins.digitalWritePin(DigitalPin.P0, 1)
    pins.digitalWritePin(DigitalPin.P1, 1)
})
input.onButtonPressed(Button.B, function on_button_pressed_b() {
    
    Speed_Right = +1
})
let speed = 0
let Speed_Right = 0
let Speed_Left = 0
motorACoast()
basic.forever(function on_forever() {
    basic.showNumber(speed)
    setMotorASpeed(speed)
})
