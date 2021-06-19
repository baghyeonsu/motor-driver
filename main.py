def motorBCoast():
    pins.digital_write_pin(DigitalPin.P2, 0)
    pins.digital_write_pin(DigitalPin.P3, 0)
def motorACoast():
    pins.digital_write_pin(DigitalPin.P0, 0)
    pins.digital_write_pin(DigitalPin.P1, 0)
def setMotorASpeed(speed: number):
    if speed < 0:
        pins.analog_write_pin(AnalogPin.P0, -1 * speed * 10)
        pins.digital_write_pin(DigitalPin.P1, 0)
    elif speed == 0:
        motorACoast()
    else:
        # speed has to be positive to get here
        pins.digital_write_pin(DigitalPin.P0, 0)
        pins.analog_write_pin(AnalogPin.P1, speed * 10)
def setMotorBSpeed(speed: number):
    if speed < 0:
        pins.analog_write_pin(AnalogPin.P2, -1 * speed * 10)
        pins.digital_write_pin(DigitalPin.P3, 0)
    elif speed == 0:
        motorBCoast()
    else:
        # speed has to be positive to get here
        pins.digital_write_pin(DigitalPin.P2, 0)
        pins.analog_write_pin(AnalogPin.P3, speed * 10)

def on_received_value(name, value):
    global Speed_Left
    if name == "left":
        Speed_Left = value * 1000
    elif name == "right":
        pass
radio.on_received_value(on_received_value)

def dummy():
    # basic.show_number(Speed_Right)
    setMotorASpeed(Speed_Left)
    setMotorBSpeed(Speed_Right)
    motorACoast()
    motorBCoast()
Speed_Left = 0
Speed_Right = 0
radio.set_group(1)
# disable led screen so that p3 is available for motor control
led.enable(True)
Speed_Right = 0
Speed_Left = 0

def on_forever():
    basic.show_number(Speed_Right)
basic.forever(on_forever)
