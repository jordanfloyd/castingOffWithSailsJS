/**
 * CreatureController
 *
 * @module      :: Controller
 * @description	:: A set of functions called `actions`.
 *
 *                 Actions contain code telling Sails how to respond to a certain type of request.
 *                 (i.e. do stuff, then send some JSON, show an HTML page, or redirect to another URL)
 *
 *                 You can configure the blueprint URLs which trigger these actions (`config/controllers.js`)
 *                 and/or override them with custom routes (`config/routes.js`)
 *
 *                 NOTE: The code you write here supports both HTTP and Socket.io automatically.
 *
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

module.exports = {
    
  show: function (req, res, next) {
    Creature.findOne({name: req.param('name')}, function foundCreature(err, creature) {
      if (err) return next(err);
      
      console.log(creature);
      res.view({
        creature: creature
      });
    });
  },
  
  battle: function (req, res, next) {
    Creature.find()
    .where({id: [req.param('creature1'), req.param('creature2')]})
    .sort('hp ASC')
    .exec(function foundCreatures(err, creatures) {
      if (err) return next(err);
      
      console.log(creatures);
      res.view({
        creatures: creatures
      });
    });
  },
  
  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to CreatureController)
   */
  _config: {}

  
};
