/*global require,describe,module,beforeEach,inject,it,expect*/

define(function(require) {
    'use strict';

    var View = require('ng-admin/Main/component/service/config/view/View'),
        Action = require('ng-admin/Main/component/service/config/Action'),
        Field = require('ng-admin/Main/component/service/config/Field'),
        ReferenceMany = require('ng-admin/Main/component/service/config/ReferenceMany'),
        Reference = require('ng-admin/Main/component/service/config/Reference');

    describe("Service: View config", function() {

        it('should returns it\'s name.', function() {
            var view = new View('view-abx');

            expect(view.name()).toEqual('view-abx');
        });

        it('should returns a title and description from a function.', function() {
            var view = new View();
            view.title(function() {
                return 'my-title';
            });
            view.description(function() {
                return 'my desc';
            });

            expect(view.getTitle()).toEqual('my-title');
            expect(view.getDescription()).toEqual('my desc');
        });

        it('should add a return field types.', function() {
            var view = new View();
            var refMany = new ReferenceMany('refMany');
            var ref = new Reference('myRef');

            var field = new Field('body');

            view.addField(ref).addField(refMany).addField(field);

            expect(view.getFieldsOfType('ReferenceMany')['refMany'].name()).toEqual('refMany');
            expect(view.getReferences()['refMany'].name()).toEqual('refMany');
            expect(view.getReferences()['myRef'].name()).toEqual('myRef');
            expect(view.getFields()['body'].order()).toEqual(2);
        });

        it('should add actions.', function() {
            var view = new View();
            var action = new Action('doSomething');
            view.addAction(action);

            expect(view.getActions()['doSomething'].order()).toEqual(0);
        });

        it('should returns the identifier.', function() {
            var view = new View();
            var field1 = new Field('post_id').identifier(true);
            var field2 = new Field('name').identifier(false);
            view.addField(field1).addField(field2);

            expect(view.getIdentifier().name()).toEqual('post_id');
            expect(view.isNew()).toEqual(true);
        });

    });
});
