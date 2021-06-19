function motorBCoast () {
    pins.digitalWritePin(DigitalPin.P2, 0)
    pins.digitalWritePin(DigitalPin.P3, 0)
}
function motorACoast () {
    pins.digitalWritePin(DigitalPin.P0, 0)
    pins.digitalWritePin(DigitalPin.P1, 0)
}
function setMotorASpeed (speed: number) {
    if (speed < 0) {
        pins.analogWritePin(AnalogPin.P0, -1 * speed * 10)
        pins.digitalWritePin(DigitalPin.P1, 0)
    } else if (speed == 0) {
        motorACoast()
    } else {
        // speed has to be positive to get here
        pins.digitalWritePin(DigitalPin.P0, 0)
        pins.analogWritePin(AnalogPin.P1, speed * 10)
    }
}
function setMotorBSpeed (speed: number) {
    if (speed < 0) {
        pins.analogWritePin(AnalogPin.P2, -1 * speed * 10)
        pins.digitalWritePin(DigitalPin.P3, 0)
    } else if (speed == 0) {
        motorBCoast()
    } else {
        // speed has to be positive to get here
        pins.digitalWritePin(DigitalPin.P2, 0)
        pins.analogWritePin(AnalogPin.P3, speed * 10)
    }
}
radio.onReceivedValue(function (name, value) {
    if (name == "left") {
        Speed_Left = value
    } else if (name == "right") {
        Speed_Right = value
    }
})
let Speed_Left = 0
let Speed_Right = 0
radio.setGroup(1)
// disable led screen so that p3 is available for motor control
led.enable(false)
Speed_Right = 0
Speed_Left = 0
motorACoast()
motorBCoast()
basic.forever(function () {
    // basic.show_number(Speed_Right)
    setMotorASpeed(Speed_Left)
    setMotorBSpeed(Speed_Right)
})
