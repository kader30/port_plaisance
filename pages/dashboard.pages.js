const authJWT = require("../middleware/authJWT");

router.get('/dashboard', (req, res) => {
    res.render('dashboard', authJWT,
        { title: "Tableau de bord" })
});