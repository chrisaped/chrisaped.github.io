$(document).ready(function() {
  $.getJSON('https://chrisaped.github.io/demo_data.json', function(data) {
    data.forEach(function(user) {
      $('#users-table').append(`<tr><th scope="row">${user.id}</th><td>${user.name}</td></tr>`);
    });
  });


  $('#builder-basic').queryBuilder({
    filters: [{
      id: 'something',
      label: 'Something',
      type: 'string'
    },
    {
      id: 'event',
      label: 'Event',
      type: 'string',
      plugin: 'selectize',
      plugin_config: {
        valueField: 'name',
        labelField: 'name',
        searchField: 'name',
        sortField: 'name',
        create: true,
        maxItems: 1,
        plugins: ['remove_button'],
        onInitialize: function() {
          var that = this;

          $.getJSON('https://chrisaped.github.io/demo_data.json', function(data) {
            data.forEach(function(user) {
              user.events.forEach(function(event) {
                that.addOption(event);
              });
            });
          });
        }
      },
      valueSetter: function(rule, value) {
        rule.$el.find('.rule-value-container input')[0].selectize.setValue(value);
      }
    }]
  });

  // Fix for Selectize
  $('#builder-basic').on('afterCreateRuleInput.queryBuilder', function(e, rule) {
    if (rule.filter.plugin == 'selectize') {
      rule.$el.find('.rule-value-container').css('min-width', '200px')
        .find('.selectize-control').removeClass('form-control');
    }
  });

  // Fix for Bootstrap Datepicker
  $('#builder-basic').on('afterUpdateRuleValue.queryBuilder', function(e, rule) {
    if (rule.filter.plugin === 'datepicker') {
      rule.$el.find('.rule-value-container input').datepicker('update');
    }
  });

  $('#btn-reset').on('click', function() {
    $('#builder-basic').queryBuilder('reset');
  });

  // $('#btn-get-sql').on('click', function() {
  //   var result = $('#builder-import_export').queryBuilder('getSQL', 'question_mark');

  //   if (result.sql.length) {
  //     alert(result.sql + '\n\n' + JSON.stringify(result.params, null, 2));
  //   }
  // });

});