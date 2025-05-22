function fetchData() {
    const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dez'];
    let holidaysPerMonthCA;
    let holidaysPerMonthBR;
    let holidaysPerMonthUS;
  
    // Fetch data for Canada
    const fetchCA = fetch('https://date.nager.at/api/v3/publicholidays/2024/CA')
      .then(response => response.json())
      .then(dataCA => {
        console.log('Data Canada:', dataCA);
        holidaysPerMonthCA = dataCA.reduce((count, holiday) => {
          const month = new Date(holiday.date).getMonth() + 1;
          count[month] = (count[month] || 0) + 1;
          return count;
        }, {});
      });
  
    // Fetch data for Brazil
    const fetchBR = fetch('https://date.nager.at/api/v3/publicholidays/2024/BR')
      .then(response => response.json())
      .then(dataBR => {
        console.log('Data Brazil:', dataBR);
        holidaysPerMonthBR = dataBR.reduce((count, holiday) => {
          const month = new Date(holiday.date).getMonth() + 1;
          count[month] = (count[month] || 0) + 1;
          return count;
        }, {});
      });
  
    // Fetch data for the United States
    const fetchUS = fetch('https://date.nager.at/api/v3/publicholidays/2024/US')
      .then(response => response.json())
      .then(dataUS => {
        console.log('Data United States:', dataUS);
        holidaysPerMonthUS = dataUS.reduce((count, holiday) => {
          const month = new Date(holiday.date).getMonth() + 1;
          count[month] = (count[month] || 0) + 1;
          return count;
        }, {});
      });
  
    // Wait for all fetch requests to complete
    Promise.all([fetchCA, fetchBR, fetchUS])
      .then(() => {
        // Log the JSON data of all fetches outside the function
        console.log('Data Canada:', holidaysPerMonthCA);
        console.log('Data Brazil:', holidaysPerMonthBR);
        console.log('Data United States:', holidaysPerMonthUS);

        const xListBR = Object.keys(holidaysPerMonthBR);
        const yListBR = Object.values(holidaysPerMonthBR);
  
        const xListCA = Object.keys(holidaysPerMonthCA);
        const yListCA = Object.values(holidaysPerMonthCA);
  
        const xListUS = Object.keys(holidaysPerMonthUS);
        const yListUS = Object.values(holidaysPerMonthUS);
  
        const barChart = bb.generate ({
          data: {
              columns: [
               // Add the y values as a data series
               ['Brazil', ...yListBR], 
               ['Canada', ...yListCA], 
               ['United States', ...yListUS]
             ],
              type: "bar",
          },
          axis: {
              x: {
                  type: "category",
                  categories: months 
               }
            },
            bar: {
              width: {
                ratio: 0.5
              }
            },
          bindto: "#barChart"
         }); 

      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
      // =====>>>> Create the BAR chart using Billboard.js  

                    
  }
  
  // Call the function to start the fetches
  fetchData();
  