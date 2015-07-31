# The Egelance Pelican Theme
Simple, minimalistic, welli readble [pelican][pelican_official_site] theme.


## Dowloading theme
To download and install just theme only, then go to `bin/` folder to download archive,
unpack to `<pelican-site>/theme/egelance`,
set  :)

## Development

Download repository

    git clone --recursive https://github.com/egel/egelance-pelican-theme.git


Install mandatory software

> Comend `npm install` **should work without** `sudo` !!!
> If not fix this with [this article](http://stackoverflow.com/questions/16151018/npm-throws-error-without-sudo).

    $ sudo apt-add-repository ppa:chris-lea/node.js \
      && sudo apt-get update \
      && sudo apt-get install -y nodejs build-essential libssl-dev zlib1g-dev \
      && \curl -sSL https://get.rvm.io | bash -s stable \
      && rvm install ruby --default \
      && gem update --system \
      && gem install sass compass

then instal and bulid project:

    $ cd ~/workspace/ \
      && git clone git@bitbucket.org:egel/j3template-mseweryn.git \
      && cd j3template-mseweryn/ \
      && sudo npm -g install grunt-cli bower \
      && npm install \
      && bower install \
      grunt watch

> You can also link fresh build to your pelican theme folder. To do so just:
> 1. go througth development proces then build project with command: `grunt`
> 2. Link theme to your site:
>     ln -s <path to egelance repository>/build <path to pelican site>/theme/egelance
> 3. Add `THEME="theme/egelance"` to your **pelicanconf.py** file
> 4. Done! It was that simple :)

Enjoy hacking!

## License
MIT 2015 Maciej Sypień

[pelican_official_site]: http://blog.getpelican.com/
