const elastic = require("./elastic");
const sunucu  = require("./sunucu");
const veri    = require("./veri");
                require("dotenv").config();


(async function main() {

  const elasticHazirmi = await elastic.baglantiKontrol();

  if (elasticHazirmi) {

    const elasticIndeks = await elastic.elasticIstemci.indices.exists({index: elastic.indeks});

    if (!elasticIndeks.body) {
      await elastic.indeksOlustur(elastic.indeks);
      await elastic.sozlerMappingAyarla();
      await veri.veritabaniOlustur()
    }

    sunucu.start();

  }

})();