import picamera
import time
import os
# import send_sms
import image_processor
import aws_rek
from firebase import firebase

def main():
    camera = picamera.PiCamera()
    fb = firebase.FirebaseApplication('https://benchme-df59a.firebaseio.com', None)
    image_pth = 'image{}.jpg'
    img_proc = image_processor.image_processor()
    counter = 0
    try:
        while True:
            occupied = False
            send_to_aws = False
            counter_itter = counter%5
            camera.capture(image_pth.format(counter_itter))
            print('Taking picture number {} at {}:{}'.format(counter_itter, time.gmtime().tm_min, time.gmtime().tm_sec))
            img_proc.add_image(image_pth.format(counter_itter))
            if counter%5 == 0:
                send_to_aws = img_proc.make_decision()
                print('Should I send this to aws?', send_to_aws)
            if send_to_aws:
                print('Sending to aws')
                occupied = aws_rek.check_human(image_pth.format(3))
                print('Is it occupied?', occupied)
                if not occupied:
                    fb.put('https://benchme-df59a.firebaseio.com/', name='key', data='no')
                    print('Sending out text')
                    # send_sms.send()
                else:
                    fb.put('https://benchme-df59a.firebaseio.com/', name='key', data='yes')

            counter += 1
            # time.sleep(.01)
    except KeyboardInterrupt:
        print('interrupted!')

main()
