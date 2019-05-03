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

          if (localStorage.demoData === undefined) {
            $.getJSON('demo_data.json', function(data) {
              localStorage.demoData = JSON.stringify(data);
              console.log('data', data);
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
    }]
  });

  $('#btn-reset').on('click', function() {
    $('#builder-basic').queryBuilder('reset');
  });

});