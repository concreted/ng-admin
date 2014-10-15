/*global require,describe,module,beforeEach,inject,it,expect*/

define(function(require) {
    'use strict';

    var Application = require('ng-admin/Main/component/service/config/Application'),
        Entity = require('ng-admin/Main/component/service/config/Entity'),
        DashboardView = require('ng-admin/Main/component/service/config/view/DashboardView'),
        FormView = require('ng-admin/Main/component/service/config/view/FormView');

    describe("Service: Application config", function() {

        describe('entity', function() {
            it('should store entity by name.', function() {
                var app = new Application(),
                    entity = new Entity('myEntity');
                app.addEntity(entity);

                expect(app.getEntity('myEntity').name()).toBe('myEntity');
                expect(app.getEntity('myEntity').order()).toBe(0);
                expect(app.hasEntity('myEntity')).toBe(true);
            });

            it('should return all entity names.', function() {
                var app = new Application();
                app.addEntity(new Entity('myEntity1'));
                app.addEntity(new Entity('myEntity2'));

                expect(app.getEntityNames()).toEqual(['myEntity1', 'myEntity2']);
            });
        });

        describe('view', function() {
            it('should returns all view of a certain type.', function () {
                var app = new Application(),
                    entity1 = new Entity('myEntity1'),
                    entity2 = new Entity('myEntity2'),
                    dashboard = new DashboardView('dashboard'),
                    dashboard2 = new DashboardView('dashboard2'),
                    formView = new FormView('form1');

                entity1.addView(dashboard);
                entity2.addView(dashboard2);
                entity2.addView(formView);
                app.addEntity(entity1);
                app.addEntity(entity2);

                var dashboards = app.getViewsOfType('DashboardView'),
                    forms = app.getViewsOfType('FormView'),
                    lists = app.getViewsOfType('ListView');

                expect(dashboards.length).toBe(2);
                expect(forms.length).toBe(1);
                expect(lists.length).toBe(0);

                expect(dashboards[0].getEntity().name()).toBe('myEntity1');
                expect(dashboards[1].getEntity().name()).toBe('myEntity2');
            });

        });

    });
});
