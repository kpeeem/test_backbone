    window.TEST = {
        Models: {},
        Views: {},
        Utils: {},
        Env: {
            'answers': [1, 2, 3]
        },
        Collections: {},
        Router: {},
        Auth: {},
        Modules: {}
    };



    TEST.Router = Backbone.Router.extend({
        initialize: function() {

        },
        routes: {
            '': 'testModule',
            '*path(/)': 'testModule'
        },

        testModule: function() {
            console.info('testModule-LOADED===============================================');
            TEST.Models.testmodel = Backbone.Model.extend({
                initialize: function(options) {
                    this.options = options;
                    // this.id = options.id;
                    console.info("init: Model test");
                    this.on('change', function() {});
                },
                // url: function() {
                //     return 'api/test/' + this.id;
                // },
                defaults: function() {
                    return {
                        'questions': [{
                            'value': 'Согласиться работать без вывески, не вступать в конфликт с арендодателем.',
                            'pk': 1
                        }, {
                            'value': 'Проведение переговоров с арендодателем для прояснения сложившейся ситуации и объяснения последствий нарушения договорных обязательств: штрафные санкции, арбитражный суд',
                            'pk': 2
                        }, {
                            'value': 'Расторжение договора с арендодателем, отказ от открытия точки в данном торговом центре.',
                            'pk': 3
                        }, {
                            'value': 'Привлечение юристов для подготовки претензионных документов',
                            'pk': 4
                        }, {
                            'value': 'Поиск альтернативных временных решений: размещение на входе промоутеров, размещение баннера и ролл-апа рядом с входной группой.',
                            'pk': 5
                        }, {
                            'value': 'Привлечение юристов для подготовки претензионных документов',
                            'pk': 6
                        }]
                    }
                }
            });

            //#View###########################################################

            //testView
            TEST.Views.testview = Backbone.View.extend({
                el: "#insert",
                events: {
                    "click .sendbutton": "send"
                        // "click #btn-signin" : "submit"
                },
                initialize: function(options) {
                    this.options = options;
                    this.id = options.id;
                    this.model.bind('change', this.render, this);
                    // this.model.bind("error", this.error);
                    this.model.bind("all", this.DebugAllEvent);
                    // this.model.fetch();
                    this.render();
                },

                DebugAllEvent: function(e) {
                    console.log("event viewTest:" + e);
                },
                error: function(model, error) {
                    console.log("error viewCompanies:" + error.responseJSON);
                },
                render: function(options) {
                    console.log("render view test ################");
                    console.log(this.model.toJSON());
                    console.log("render view test ################");
                    var template = _.template($("#testTemplate").html(), {});
                    this.$el.html(template(this.model.toJSON()));
                    $('.sendbutton').on('click', this.send);
                    setTimeout(function() {
                        alert("Тест завершен");
                        location.reload();
                    }, 60000);
                    return this;
                },
                // timer: {
                //     this.sec = 0;

                //     function pad(val) {
                //         return val > 9 ? val : "0" + val; }
                //     setInterval(function() {
                //         $("#seconds").html(pad(++this.sec % 60));
                //     }, 1000);
                // },
                send: function(options) {
                    var i = 0;
                    var $checkboxes = $('.checkbox input[type=checkbox]:checked');
                    if ($checkboxes.length == 3) {
                        $checkboxes.each(function() {

                            if (TEST.Env.answers.indexOf(parseInt($(this).val())) != -1 && i == 2) {
                                alert('Вы правильно ответили');
                                return
                                // location.reload();
                            } else if (i == 2) {
                                alert('Попробуйте еще раз');
                                // location.reload();
                            }
                            i++;
                        })
                    }


                }
            });

            TEST.Modules.test = function() {
                var testModel = new TEST.Models.testmodel({
                    // id: pk
                });
                var testViewEdit = new TEST.Views.testview({
                    model: testModel,
                    // template: TcompanyEdit
                });
            }();
        },
        notFound: function() {
            document.write('notFound')
        },
    });


    new TEST.Router();

    $(function() {
        Backbone.history.start();
    })
