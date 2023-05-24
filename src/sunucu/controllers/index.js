const model = require("../models");

/**
 * @function sozleriGetir
 * @param {Object} req Express request  nesnesi
 * @param {Object} res Express response nesnesi
 * @returns {void}
 */

async function sozleriGetir(req, res) {
  const sorgu = req.query;

  if (!sorgu.text) {
    res.status(422).json({
      hata: true,
      sonuc: "Arama metni esik",
    });

    return;
  }

  try {
    const sonuc = await model.sozleriGetir(req.query);
    res.json({ basarili: true, sonuc: sonuc });
  } catch (err) {
    res.status(500).json({ basarili: false, sonuc: "Hata oluştu." });
  }
}

/**
 * @param {Object} req Express request nesnesi
 * @param {Object} res Express response nesnesi
 * @returns {void}
 */

async function yeniSozEkle(req, res) {
  const body = req.body;

  if (!body.soz || !body.yazar) {
    res.status(422).json({
      hata: true,
      sonuc: "Yazar ya da söz eksik",
    });
    return;
  }

  try {
    const sonuc = await model.yeniSozEkle(body.soz, body.yazar);
    res.json({
      basarili: true,
      sonuc: {
        id: sonuc.body._id,
        yazar: body.yazar,
        soz: body.soz,
      },
    });
  } catch (err) {
    res.status(500).json({ basarili: false, hata: "Hata oluştu." });
  }
}

module.exports = {
  sozleriGetir,
  yeniSozEkle,
};
