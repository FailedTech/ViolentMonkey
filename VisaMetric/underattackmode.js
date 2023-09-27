let url = 'https://it-ir-appointment.visametric.com/en/appointment-form';



async function sendFetchRequest() {
  let startTime = Date.now(); 

  // Use the fetch API with a timeout
  let responsePromise = fetch(url);

  // Create a timeout promise that resolves after 500ms
  let timeoutPromise = new Promise((resolve) => {
    setTimeout(() => resolve({ timedOut: true }), 500);
  });

  // Wait for either the fetch to complete or the timeout to occur
  let result = await Promise.race([responsePromise, timeoutPromise]);

  // Check if the result is a timeout
  if (result.timedOut) {
    console.log('Fetch request timed out after 500ms. Performing a task...');
    // Perform your task here
      $("#checkCardListBtn").trigger("click")
	$("#sendDate").trigger("click")
      $("#calenderNext").trigger("click")
      $("#btnAppServicesNext").trigger("click")
      $('#personalForm').submit();
          console.log("Request Sent")
      
          console.log("Request Sent")
  } else {
    // The fetch request completed within 500ms
    let response = await result; // Get the fetch response
    console.log('Fetch request completed:', response);

    // Check if the response status is 405
    if (response.status === 405) {
      console.log('Received a 405 status code. Stopping further requests.');
      // You can choose to stop further requests or continue with additional logic
    } else {
      // Continue with the next fetch request (if needed)
      sendFetchRequest();
    }
  }
}

// Start the fetch request
sendFetchRequest()
  .then(() => {
    console.log('Fetch request finished or timed out.');
  })
  .catch(error => {
    console.error('Error:', error.message);
  });