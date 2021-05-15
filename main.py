def motorACoast():
    pins.digital_write_pin(DigitalPin.P0, 0)
    pins.digital_write_pin(DigitalPin.P1, 0)
def setMotorASpeed(speed: number):
    if speed < 0:
        pins.analog_write_pin(AnalogPin.P0, (0 - speed) * 10)
        pins.digital_write_pin(DigitalPin.P1, 0)
    elif speed == 0:
        motorACoast()
    else:
        # speed has to be positive to get here
        pins.digital_write_pin(DigitalPin.P0, 0)
        pins.analog_write_pin(AnalogPin.P1, speed * 10)

def on_button_pressed_a():
    global Speed_Left
    Speed_Left= +1

input.on_button_pressed(Button.A, on_button_pressed_a)

def on_button_pressed_ab():
    global speed
    Speed_Right =+1
    Speed_Left  =+1
    pins.digital_write_pin(DigitalPin.P0, 1)
    pins.digital_write_pin(DigitalPin.P1, 1)
input.on_button_pressed(Button.AB, on_button_pressed_ab)

def on_button_pressed_b():
    global Speed_Right
    Speed_Right= +1
input.on_button_pressed(Button.B, on_button_pressed_b)

speed = 0
Speed_Right = 0
Speed_Left = 0
motorACoast()

def on_forever():
    basic.show_number(speed)
    setMotorASpeed(speed)
basic.forever(on_forever)
