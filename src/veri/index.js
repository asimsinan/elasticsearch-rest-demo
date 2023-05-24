const elastic = require("../elastic");
const sozler  = require(`./sozler.json`);

/**
 * @function createESAction
 * @returns {{index: { _index: string, _type: string }}}
 * @description Dökümanları doğru bir şekilde indekslemek için bir ElasticSearch Eylemi döndürür.
 */

const esAction = {
  index: {
    _index: elastic.indeks,
    _type: elastic.type
  }
};

/**
 * @function veritabaniOlustur
 * @returns {void}
 * @description Söz,yazar dizisiyle topluca (bulk) bilgi ekler.
 */

async function veritabaniOlustur() {

  const belgeler = [];

  for (const soz of sozler) {
    belgeler.push(esAction);
    belgeler.push(soz);
  }

  return elastic.elasticIstemci.bulk({ body: belgeler });
}

module.exports = {
  veritabaniOlustur
};