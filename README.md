# remote-control-experiment


**Developer: Forbes Hawkins, Museums Victoria, Australia**

This experiment is a simple demonstration of how [websockets](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API) and the [DeviceOrientationEvent](https://developer.mozilla.org/en-US/docs/Web/Events/deviceorientation) can be applied to enable a mobile device to be used as a remote "pointer" to control an interactive running on a second screen/projection.

## Background

We at [Museums Victoria](https://museumsvictoria.com.au/) are thinking about different ways for our visitors to control an interactive using their phone. We're imagining:

1.  The visitor approaches a screen/projection interactive (the *screen*)
2.  The interactive somehow directs the visitor to open a web page on their mobile device (the *device*)
3.  The visitor aims their device at the screen and use it to point to and select different areas

There are several [experiments](https://www.awwwards.com/6-examples-of-desktop-sites-synced-with-mobile-devices.html) and [installations](https://www.theguardian.com/culture/2017/aug/08/british-museum-first-to-showcase-interactive-display-with-wifi-link) already playing with this sort of thing. The experimental code here demonstrates the fundamental principles. Feel free to use it and please submit a pull request or get in touch if you have any thoughts or ideas.

## Other Possibilities

This basic experiment doesn't currently demonstrate some potential applications such as:

- multi-user control of an interactive
- split interaction with some content appearing on the device synced up with content on the screen 
- multi-step interaction - the visitor points at the screen and selects and plays a video; when the video ends, the interactive opens a feedback form on your phone

## UX Considerations

We can see a few UX challanges in creating a visitor experience that applies these ideas, including:

### (i) Managing user connections 
How do you get the user to load up the remote page so they can begin interacting? Get them to scan a QR Code? Tiny URL? Google's solution is to ask  the user to connect to a wi-fi network and then load the webpage via [captive portal](https://en.wikipedia.org/wiki/Captive_portal)- any of these options could be a barrier to engagement.

Once a visitor has used the interactive, there needs to be a way to bump them off smoothly so that other users can use it. Auto-timeout could work but could be tricky if the interactive didn't rely on constant user interaction (eg. when the visitor watches a video).

### (ii) Device Orientation flakiness
The reliance on device orientation event data may not be robust enough for a gallery space - for example, it wouldn't work well if the device compass required calibration.

Therefore in this example we're using relative rather than absolute orientation. Whilst this requires an extra calibration step ("point your phone at the centre of the screen and press the button to begin"), it's less likely to go wrong if the compass is out of whack or if the interactive is repositioned.

Obviously another way around this would be to design a remove interface that uses buttons, swipes etc, rather than device orientation.

### (iii) Multiple instances
If you have several installations in the same space, you need a way to pair a device with the screen you happen to be standing in front of

## How it works
The 'interactive' browser-interface has two primary pages: (1) the screen page to display the main interactive and (2) the remote control page that runs on the mobile device.

Thte visitor opens the device page. As the mobile device is moved around, the device page streams [device orientation](https://developer.mozilla.org/en-US/docs/Web/API/Detecting_device_orientation) data to the [websocket server](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API), which in turn broadcasts those messages to anything listening in.

The screen page is listening in to these websocket broadcasts. When it receives a device orientation message, it converts the data to cursor x/y coordinates and displays a pointer at that location. Device rotation data is also received so you can rotate the cursor for added joy and amusement.

## Technologies/concepts

- [Node.js](https://nodejs.org/en/)
- [Angular](https://angular.io/), [Angular CLI](https://cli.angular.io/)
- [websockets](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API)
- [DeviceOrientationEvent](https://developer.mozilla.org/en-US/docs/Web/Events/deviceorientation) 

## Prerequisites
You'll need
- a Mac/PC with [Node.js](https://nodejs.org/en/) installed,
- a mobile device

The mobile device needs to be able to browse to the pc's IP address on port 4200 so it will need to be on the same network or tethered.

### Running
1. Clone this repo
2. cd into the folder and enter `npm install -s` from the command line to get all dependencies.
3. enter `npm run serve-dev`

This command does two things: it (a) starts a web server to serve the app pages on port 4200 and (b) starts a socket.io server on port 8100 to handle the communication between the device and screen page instances

Okay, so now it's going, just cross your fingers and: 
- on the desktop, open http://localhost:4200 and click on 'screen'
- on the mobile device, open http://[desktop-ip-address]:4200 and tap "device"