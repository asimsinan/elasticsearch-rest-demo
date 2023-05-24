const { Client } = require("@elastic/elasticsearch");
require("dotenv").config();

const elasticBaglantiAdresi = process.env.ELASTIC_URL || "http://localhost:9200";
const elasticIstemci = new Client({ node: elasticBaglantiAdresi });
const indeks = "sozler";
const tur = "_doc";

/**
 * @function indeksOlustur
 * @returns {void}
 * @description ElasticSearch içinde indeks oluşturur.
 */

async function indeksOlustur(indeks) {
  try {
    await elasticIstemci.indices.create({ index: indeks });
  } catch (err) {
    console.error(`${indeks} indeksini oluştururken hata oluştu`);
    console.error(err);
  }
}

/**
 * @function sozlerMappingAyarla,
 * @returns {void}
 * @description Veritabanında sözler eşleştirmesi/mapping oluşturur.
 */

async function sozlerMappingAyarla() {
  try {
    const sozlerSema = {
      soz: {
        type: "text",
      },
      yazar: {
        type: "text",
      },
    };

    await elasticIstemci.indices.putMapping({
      index: indeks,
      type: tur,
      include_type_name: true,
      body: {
        properties: sozlerSema,
      },
    });

    console.log("Sozler mapping oluşturuldu");
  } catch (err) {
    console.error("Mapping oluşturulurken hata oluştu");
    console.error(err);
  }
}

/**
 * @function baglantiKontrol
 * @returns {Promise<Boolean>}
 * @description İstemcinin ElasticSearch'e bağlanıp bağlanmadığını kontrol eder
 */

function baglantiKontrol() {
  return new Promise(async (resolve) => {
    console.log("Bağlantı sağlanıyor..");
    let baglandiMi = false;

    while (!baglandiMi) {
      try {
        await elasticIstemci.cluster.health({});
        console.log("ElasticSearch'e bağlandı");
        baglandiMi = true;
      } catch (_) {}
    }
    resolve(true);
  });
}

module.exports = {
  elasticIstemci,
  sozlerMappingAyarla,
  baglantiKontrol,
  indeksOlustur,
  indeks,
  tur,
};
