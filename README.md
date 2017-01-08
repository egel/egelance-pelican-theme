# The Egelance Pelican Theme
Modern, minimalistic and well readable theme for
[Pelican][pelican_official_site], Python Static Files Generator.

<img src="http://i.imgur.com/k3v695l.png" width="100%" />

## Hot to use it?

> You will need have `npm` + `yarn` installed. If not install it via [`nvm`](https://github.com/creationix/nvm)

Clone theme to your workspace dir

```shell
cd <your-pelican-blog>/theme # folder with themes for you pelican blog
mkdir -p egelance
wet https://github.com/egel/egelance-pelican-theme/blob/master/bin/egelance_pelican_theme_official.zip?raw=true 
unzip egelance_pelican_theme_official.zip -d ./egelance
```
Now you should have unpacked egelance theme into your `<your-pelican-blog>/theme/egelance` folder. 

Next:
 
1.  add `THEME="theme/egelance"` to your **pelicanconf.py** file, and 
1.  compile your blog with: `pelican content --autoreload`


## Development
If you want to **build theme from the groud** or **find more about development
process** visit our [dev wiki page][wiki-dev] to find more info how to achieve
this.


## License
MIT 2015 Maciej Sypień

[pelican_official_site]: http://blog.getpelican.com/
[wiki-dev]: https://github.com/egel/egelance-pelican-theme/wiki/Development
