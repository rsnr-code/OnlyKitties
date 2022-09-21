

module.exports = {
  getProfile: async (req, res) => {
    try {

      res.render("profile.ejs");
    } catch (err) {
      console.log(err);
    }
  },
 
};
