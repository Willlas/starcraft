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
    this.apm = new ReactiveVar();
    this.apm.set(0);

});

Template.starcraft.onRendered(function(){
    this.find('textarea').focus();
});

Template.starcraft.helpers({
    table: function () {
        return Template.instance().table.get('table');
    },
    hello: function () {
        return Template.instance().hello.get('hello');
    },
    APM: function(){
        return Template.instance().apm.get('apm');
    }
});

Template.starcraft.events({
    'keydown textarea': function (e) {

        //allow tabing in textarea
        if(e.which == 9){
            e.preventDefault();
        }
        let clonedTable = Template.instance().table.get('table');

        clonedTable.push({
                'key': e.which,
                'moment': Date.now() - clonedTable[0].moment
            });

        Template.instance().table.set(clonedTable);

        //var clonedAPM = Template.instance().apm.get('apm');

        Template.instance().apm.set(
            (clonedTable.length /
                ((clonedTable[clonedTable.length -1].moment - clonedTable[1].moment + 1)/1000))
                * 60
        );
        console.log(e.which, Date.now());
    }
});