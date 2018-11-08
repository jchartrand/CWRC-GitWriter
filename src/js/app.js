let CWRCWriterStorageDialogs = require('cwrc-git-dialogs')['default'];

// only continue loading the cwrcWriter if the user has authenticated with github
if (CWRCWriterStorageDialogs.authenticate()) {

    let viaf = require('viaf-entity-lookup')
    let dbpedia = require('dbpedia-entity-lookup');
    let wikidata = require('wikidata-entity-lookup');
    let getty = require('getty-entity-lookup');
    let geonames = require('geonames-entity-lookup');
    let CWRCWriterDialogs = require('cwrc-public-entity-dialogs');

    CWRCWriterDialogs.showNoLinkButton(true);
    CWRCWriterDialogs.showCreateNewButton(false);
    CWRCWriterDialogs.showEditButton(false);
    CWRCWriterDialogs.registerEntitySources({
        person: (new Map()).set('viaf', viaf).set('wikidata', wikidata).set('getty', getty).set('dbpedia', dbpedia),
        place: (new Map()).set('geonames', geonames).set('viaf', viaf).set('dbpedia', dbpedia).set('wikidata', wikidata),
        organization: (new Map()).set('viaf', viaf).set('wikidata', wikidata).set('dbpedia', dbpedia),
        title: (new Map()).set('viaf', viaf).set('wikidata', wikidata).set('dbpedia', dbpedia)
    })
    let config = require('./config.js');
    config.container = 'cwrcWriterContainer';
    config.modules = {
        west: [ 'structure', 'entities', 'relations' ],
        south: [ 'selection', 'validation' ],
        east: [ 'imageViewer' ]
    };
    config.entityLookupDialogs = CWRCWriterDialogs;
    config.storageDialogs = CWRCWriterStorageDialogs;
    
    let CWRCWriter = require('cwrc-writer-base');
    var writer = new CWRCWriter(config);
    writer.event('writerInitialized').subscribe(function() {
        writer.showLoadDialog();
    });
}