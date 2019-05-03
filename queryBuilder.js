$(document).ready(function() {
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
            data.forEach(function(item) {
              that.addOption(item);
            });
          });
        }
      },
      valueSetter: function(rule, value) {
        rule.$el.find('.rule-value-container input')[0].selectize.setValue(value);
      }
    }]
  });

  $('#builder-basic').on('afterCreateRuleInput.queryBuilder', function(e, rule) {
    if (rule.filter.plugin == 'selectize') {
      rule.$el.find('.rule-value-container').css('min-width', '200px')
        .find('.selectize-control').removeClass('form-control');
    }
  });

  $('#btn-reset').on('click', function() {
    $('#builder-basic').queryBuilder('reset');
  });

});