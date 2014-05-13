/**
 * Creature
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {
  schema: true,
  attributes: {

    name: {
      type: 'string',
      required: true
    },

    hp: {
      type: 'integer',
      required: true
    },

    type: {
      type: 'string',
      required: true
    },

    attacks: {
      type: 'array',
      required: true
    },

    accuracy: {
      type: 'float'
    }

    /* e.g.
  	nickname: 'string'
  	*/

  }

};