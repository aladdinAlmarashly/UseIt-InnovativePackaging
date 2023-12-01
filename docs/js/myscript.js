document.getElementById('scan').addEventListener('click', () => {
    $('#barcode-scanner').show();
    const element = document.getElementById("scan");
    element.scrollIntoView({ behavior: 'smooth', block: 'end' });

    Quagga.init({
        inputStream: {
            name: "Live",
            type: "LiveStream",
            target: document.querySelector('#barcode-scanner'),
            // constraints: {
            //   facingMode: "environment" // Use the rear camera (if available)
            // }
        },
        decoder: {
            readers: ["ean_reader", "code_128_reader", "upc_reader"]
        }
    }, function (err) {
        if (err) {
            console.log(err);
            return
        }
        Quagga.start();
    });

    Quagga.onDetected(function (result) {
        var code = result.codeResult.code;
        console.log(code);
        $('#barcode-scanner').hide();
        $('#rform').show();
        const element = document.getElementById("rform");
        element.scrollIntoView({ behavior: 'smooth', block: 'end' });
        // fetchData(code);
        Quagga.stop();
    });
});

  // function fetchData(barcode) {
  //   fetch('data.json')
  //     .then(response => response.json())
  //     .then(data => {
  //       const resultElement = document.getElementById('result');
  //       if (data[barcode]) {
  //         resultElement.innerHTML = `Product: ${data[barcode].name}`;
  //       } else {
  //         resultElement.innerHTML = "Product not found.";
  //       }
  //     })
  //     .catch(error => console.error('Error:', error));
  // }