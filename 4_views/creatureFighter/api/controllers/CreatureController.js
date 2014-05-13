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
  
  index: function (req, res, next) {
    Creature.find(function foundCreatures (err, creatures) {
      if (err) console.log(err);
      
      console.log(creatures);
      res.view({
        creatures: creatures
      });
    });
  },
  
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
  
  attack: function (req, res, next) {
    
    Creature.findOne()
    .where({id: req.param('violentOffender')})
    .exec(function foundCreature(err, violentOffender) {
      if (err) return next(err);
      
      Creature.findOne()
      .where({id: req.param('victim')})
      .exec(function foundCreature(err, victim) {
        if (err) return next(err);
        
        var attackDamage = violentOffender.attacks[req.param('attackIndex')].damage;
        var attackName = violentOffender.attacks[req.param('attackIndex')].name;
        
        victim.hp = req.param('victimHP') - attackDamage;
        
        if (victim.hp <= 0) {
          victim.dead = true;
          req.session.winner = violentOffender.name;
          req.session.loser = victim.name;
          res.redirect('/creature/battleOver');
        } else {
          victim.dead = false;
        }
        
        var attack = violentOffender.name + " attacked " + victim.name + " with " + attackName + " for a total of " + attackDamage + " damage!";
        
        violentOffender.hp = req.param('violentOffenderHP');
        res.view('creature/battle', {
          victim: victim,
          violentOffender: violentOffender,
          attack: attack
        });
      });
    });
  },
  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to CreatureController)
   */
  _config: {}

  
};
