import type { AstroIntegration } from 'astro';
import { Plugin, registerPlugin } from '@recogito/studio-sdk';

const GeoTaggerPlugin: Plugin = {

  name: 'GeoTagger',

  module_name: '@recogito/plugin-geotagging',

  description: 'Tag annotations with geographical references from a gazetteer.',

  author: 'Pelagios Network',

  homepage: 'https://pelagios.org',

  thumbnail: 'thumbnail.jpg',

  extensions: [{
    name: 'geotagger-admin',

    component_name: 'AdminExtension',
    extension_point: 'admin'
  },{
    name: 'geotagger-editor',
    component_name: 'EditorExtension',
    extension_point: 'annotation:*:annotation-editor'
  },{
    name: 'geotagger-editor',
    component_name: 'DocumentMapExtension',
    extension_point: 'annotation:*:toolbar'
  }],

  options: {
    basemap_presets: [
      {
        name: 'OpenStreetMap', 
        attribution: '&copy; <a href=\"http://www.openstreetmap.org/copyright\">OpenStreetMap</a>', 
        url: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      }, { 
        name: 'Consortium of Ancient World Mappers', 
        attribution: '&copy; <a href=\"https://cawm.lib.uiowa.edu/index.html\">CAWM (CC-BY-4.0)</a>', 
        url: 'https://cawm.lib.uiowa.edu/tiles/{z}/{x}/{y}.png'
      }, { 
        name: 'Digital Atlas of the Roman Empire', 
        attribution: '&copy; <a href=\"https://imperium.ahlfeldt.se/\">DARE</a>', 
        url: 'https://dh.gu.se/tiles/imperium/{z}/{x}/{y}.png'
      }
    ],
    formats: {
      'www.wikidata.org': {
        shortcode: 'wikidata',
        uri_pattern: 'http://www.wikidata.org/entity/{{id}}'
      },
      'pleiades.stoa.org': {
        shortcode: 'pleiades',
        uri_pattern: 'https://pleiades.stoa.org/places/{{id}}'
      },
      'whgazetteer.org': {
        shortcode: 'whg',
        uri_pattern: 'https://whgazetteer.org/places/{{id}}/portal'
      }
    },
    geojson_presets: [{
      preset_id: 'pleiades',
      preset_name: 'Pleiades', 
      file_url: 'https://raw.githubusercontent.com/recogito/geotagger/main/gazetteers/pleiades-all-places.lp.json'
    }],
    core_data_config: {
      host: 'my-typesense-host.typesense.net',
      port: 443,
      api_key: 'my-typesense-api-key',
      collection_name: 'my-collection',
      query_by: 'title,names',
      limit: 100
    }
  }

};

const plugin = (): AstroIntegration => ({
  name: 'geotagger',
  hooks: {
    'astro:config:setup': ({ config, logger }) => {
      registerPlugin(GeoTaggerPlugin, config, logger);
    }
  }
})

export default plugin;