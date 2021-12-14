const handleGetProfile  = (req, res, db) => {
    const { id } = req.params;

    db.select('*').from('users').where({ id }) //ES6
        .then(user => {
            if (user.length)
                res.json(user[0])
            else
                res.status(400).json('User not found')
        })
        .catch(err => {
            res.status(400).json('Error getting user')
        })
}

module.exports = {
    handleGetProfile : handleGetProfile
}

//with ES6
//module.exports = {
//    handleGetProfile : handleGetProfile
//}