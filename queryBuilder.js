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

          console.log("HELLO");
          $.getJSON('demo_data.json', function(data) {
            var demoData = JSON.stringify(data);
            console.log('demoData', demoData);
            demoData.forEach(function(item) {
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

  $('#btn-reset').on('click', function() {
    $('#builder-basic').queryBuilder('reset');
  });

});