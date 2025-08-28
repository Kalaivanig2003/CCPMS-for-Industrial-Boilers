function fetchData() {
    fetch('https://sheetdb.io/api/v1/5kvfd572kpljb')
      .then(response => response.json())
      .then(data => {
        const sensorData = data[0];

        // Update node values
        $('#node1-value').text(sensorData.Node1 +" °C");
        $('#node2-value').text(sensorData.Node2 + "°C");
        $('#node3-value').text(sensorData.Node3 + "°C");

        // Update warnings if any
        const warnings = $('#warnings');
        const warningMessages = [];

        if (sensorData.Node1 > 40) {
          warningMessages.push('Node1 too high!');
        }
        if (sensorData.Node2 > 40) {
          warningMessages.push('Node2 too high!');
        }
        if (sensorData.Node3 > 40) {
          warningMessages.push('Node3 too high!');
        }

        if (warningMessages.length > 0) {
          warnings.html(warningMessages.join('<br>'));
        } else {
          warnings.text('No warnings');
        }
      })
      .catch(error => console.error('Error fetching data:', error));
  }

  $(document).ready(function() {
    fetchData();
    setInterval(fetchData, 5000); // Refresh data every 5 seconds
  });

