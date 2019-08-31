<h1 align="center">FlaskChan</h1>

### Features

* Real-time content updates - 4chanX / Discord like content flow
* Fully-featured REST API
* Full Markdown support
* Theme support - use a night theme (or anyother variation your want)
* Excellent attachment support - attach text, every kind of video under the sun, and most image formats
  you can think of, WebM included.

### Planned

* ...


Installation
------------

### With Docker - standalone development image

In this directory, run the following to build a development Docker image:

	docker build -t <<file>> --target dev .
	
To run your new instance, then type:

	docker run -p 5000:5000 <<file>>

And browser url to: http://127.0.0.1:5000

### Without Docker

Note that building without Docker takes a lot less time but is less straightforward and does
not simulate a production environment. If you're interested in working on FlaskChan, this is
a good setup option, but otherwise you're probably better off using Docker to test or deploy
flask applications.

Python 3.4+ in addition to Pipenv and npm are required for installation. 
To install everything save for `ffmpeg` (see the following "Notes on ffmpeg"
section for more), run the following commands in this directory:

	pipenv install
	npm install
	npm run gulp
	
You'll also want to initialize a database with some initial options; so run:

	pipenv run python bootstrap.py

