$(document).ready(function() {
  var rules_widgets = {
    condition: 'OR',
    rules: [{
      id: 'event',
      operator: 'equal',
      value: 'event'
    }]
  };

  // Fix for Selectize
  $('#builder-widgets').on('afterCreateRuleInput.queryBuilder', function(e, rule) {
    if (rule.filter.plugin == 'selectize') {
      rule.$el.find('.rule-value-container').css('min-width', '200px')
        .find('.selectize-control').removeClass('form-control');
    }
  });

  // Fix for Bootstrap Datepicker
  $('#builder-widgets').on('afterUpdateRuleValue.queryBuilder', function(e, rule) {
    if (rule.filter.plugin === 'datepicker') {
      rule.$el.find('.rule-value-container input').datepicker('update');
    }
  });

  $('#builder-widgets').queryBuilder({
    filters: [{
      id: 'date',
      label: 'Date',
      type: 'date',
      validation: {
        format: 'YYYY/MM/DD'
      },
      plugin: 'datepicker',
      plugin_config: {
        format: 'yyyy/mm/dd',
        todayBtn: 'linked',
        todayHighlight: true,
        autoclose: true
      }
    },
    {
      id: 'event',
      label: 'Event',
      type: 'string',
      plugin: 'selectize',
      plugin_config: {
        valueField: 'id',
        labelField: 'name',
        searchField: 'name',
        sortField: 'name',
        create: true,
        maxItems: 1,
        plugins: ['remove_button'],
        onInitialize: function() {
          var that = this;

          if (localStorage.demoData === undefined) {
            $.getJSON('demo_data.json', function(data) {
              localStorage.demoData = JSON.stringify(data);
              data.forEach(function(item) {
                that.addOption(item);
              });
            });
          }
          else {
            JSON.parse(localStorage.demoData).forEach(function(item) {
              that.addOption(item);
            });
          }
        }
      },
      valueSetter: function(rule, value) {
        rule.$el.find('.rule-value-container input')[0].selectize.setValue(value);
      }
    }],

    rules: rules_widgets
  });

  $('#btn-reset').on('click', function() {
    $('#builder-widgets').queryBuilder('reset');
  });

  $('#btn-set').on('click', function() {
    $('#builder-widgets').queryBuilder('setRules', rules_widgets);
  });

  $('#btn-get').on('click', function() {
    var result = $('#builder-widgets').queryBuilder('getRules');

    if (!$.isEmptyObject(result)) {
      alert(JSON.stringify(result, null, 2));
    }
  });
});