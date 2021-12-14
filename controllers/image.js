const Clarifai = require('clarifai');

//You must add your own API key here from Clarifai. 
const app = new Clarifai.App({
 apiKey: 'db6b2736663146b3b006a0c9898c8dfb' 
});

const handleApiCall = (req, res) => {
    //console.log('imageUrl = ' + req.body.input);
    app.models      
      .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
      .then(data => {
        //console.log(data);
        res.json(data);
      })
      .catch(err => res.status(400).json('unable to work with API'))
  }

const handleImage = (req, res, db) => {
    //console.log('in put->image')
    const { id } = req.body;

    db('users')
        .where('id', '=', id)
        .increment('entries', 1)
        .returning('entries')
        .then(entries => {
            res.json(entries[0]);
        })
        .catch(err => res.status(400).json('Unable to get user entries'))
}

//ES6
module.exports = {
    handleImage,
    handleApiCall
}