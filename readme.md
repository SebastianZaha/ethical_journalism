# Journalistic ethics

See template.html file for a succint and clear expression of the goals of this little page. (Only in romanian for now. Will translate project soon.)

# How to update the database

1. A file with the date & optionally the time of the advertising broadcast should be added to the db folder. Names of the products should be simply written one per line.

2. run `node index.js`

3. Open db.json and fill out the urls for unseen / new products as reported by the previous command, if any. 

4. run `node index.js` again to check all is ok

5. commit & pull request

# To deploy

1. `wget -O index.html https://raw.githubusercontent.com/SebastianZaha/ethical_journalism/master/index.html`
2. there is no 2.

# TODO
    [] ? scrollable div to restrict table height
    [] references 
        [x] links to similar things (see bottom of readme)
        [] links with arguments for the bias, independent bodies for press correctness?
    [] ? is meta info in the header needed for seo
    [] english translation?
        contact links would be wrong cause they point to romanian pages

# References

   	https://en.wikipedia.org/wiki/Journalism_ethics_and_standards

    http://blog.tides.org/2010/10/15/dear-fox-advertiser/
    
    http://www.aktual24.ro/campanie-initiata-de-un-cunoscut-ong-facem-apel-la-intreruperea-contractelor-de-publicitate-cu-antena-3-rtv-si-b1-tv/
    
    http://www.aktual24.ro/dezinformarile-de-la-antena-3-si-romania-tv-sunt-taxate-dur-trei-branduri-puternice-isi-retrag-reclamele-de-la-cele-doua-posturi-mincinoase/
