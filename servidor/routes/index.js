var express = require('express');
var router = express.Router();
// incluyendo el módulo axios
var axios = require('axios')


router.get('/api/items', function (req, res, next) {
  const search = req.query.search
  axios.get('https://api.mercadolibre.com/sites/MLA/search?q=' + search + '&limit=4')
    .then(function (response) {
      // la informacion (el json) que responde el servidor lo saco de response.data

      const productos = response.data.results.map((producto) => {
        return {
          id: producto.id,
          title: producto.title,
          price: {
            currency: producto.currency_id,
            amount: String(producto.price).split('.')[0],
            decimal: String(producto.price).split('.')[1] || '0',
          },

          picture: producto.thumbnail,
          condition: producto.condition,
          free_shipping: producto.shipping.free_shipping,
          location: producto.address.state_name
        }

      })
      const result = {
        // [o] porque es un array de objetos.
        categories: response.data.filters[0].values[0].path_from_root.map(c => c.name),
        items: productos
      }
      res.json(result)
    })
});

router.get('/api/items/:id', function (req, res) {
  let id = req.params.id
  let resultProduct = {};
  let resultDescription = {};
  let detalle = {}
  axios.get('https://api.mercadolibre.com/items/' + id)
    .then(result => {
      resultProduct = result;
      return axios.get('https://api.mercadolibre.com/items/' + id + '/description')
    })
    .then(result => {
      resultDescription = result;
      const category = resultProduct.data.category_id;
      return axios.get('https://api.mercadolibre.com/categories/' + category)
    })
    .then(resultCategory => {



      detalle = {
        categories: resultCategory.data.path_from_root.map(r => r.name),
        item: {
          id: resultProduct.data.id,
          title: resultProduct.data.title,
          price: {
            currency: resultProduct.data.currency_id,
            amount: String(resultProduct.data.price).split('.')[0],
            decimal: String(resultProduct.data.price).split('.')[1] || '0',
          },

          picture: resultProduct.data.pictures[0].url,
          condition: resultProduct.data.condition,
          free_shipping: resultProduct.data.shipping.free_shipping,
          sold_quantity: resultProduct.data.sold_quantity,
          description: resultDescription.data.plain_text,
        }
      }

      res.json(detalle)

    })
  
})

module.exports = router;
