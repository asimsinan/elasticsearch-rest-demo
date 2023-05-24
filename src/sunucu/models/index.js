const { elasticIstemci, indeks, tur } = require("../../elastic");

async function sozleriGetir(req) {
//Tek alanda sorgu
  const sorgu = {
    query: {
      match: {
        soz: {
          query: req.text,
          operator: "and",
          fuzziness: "auto"
        }
      }
    }
  }
  //Çok alanda sorgu
  const cokluSorgu = {
    query: {
      multi_match: {
        query: req.text,
        fields: ["soz","yazar"]
      },
    }
  }
  const { body: { hits } } = await elasticIstemci.search({
    from:  req.page  || 0,
    size:  req.limit || 100,
    index: indeks, 
    type:  tur,
    body:  cokluSorgu
  });

  const toplamSonuc = hits.total.value;
  const bulunanlar  = hits.hits.map((hit) => {
    return {
      id:     hit._id,
      soz:  hit._source.soz,
      yazar: hit._source.yazar,
      puan:  hit._score
    }
  });

  return {
    toplamSonuc,
    bulunanlar
  }

}

async function yeniSozEkle(soz, yazar) {
  return elasticIstemci.index({
    index: indeks,
    type: tur,
    body: {
      soz: soz,
      yazar: yazar
    }
  })
}

module.exports = {
  sozleriGetir,
  yeniSozEkle
}