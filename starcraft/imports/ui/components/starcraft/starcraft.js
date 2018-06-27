import { Meteor } from 'meteor/meteor';
import { ReactiveVar } from 'meteor/reactive-var'

import './starcraft.html';

Template.starcraft.onCreated(function () {
    this.table = new ReactiveVar([{
        key : 0,
        moment : Date.now()
    }]);
    this.hello = new ReactiveVar();
    this.hello.set('hello there');

});

Template.starcraft.helpers({
    table: function () {
        return Template.instance().table.get('table');
    },
    hello: function () {
        return Template.instance().hello.get('hello');
    }
});

Template.starcraft.events({
    'keydown textarea': function (e) {
        var clonedTable = Template.instance().table.get('table');
        clonedTable.push({
                'key': e.which,
                'moment': Date.now() - clonedTable[0].moment
            });
        Template.instance().table.set(clonedTable);
        console.log(e.which, Date.now());
    }
});