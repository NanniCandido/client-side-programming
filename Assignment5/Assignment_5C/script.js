function fetchData() {
    const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dez'];
    let holidaysPerMonthCA = {};
    let holidaysPerMonthBR = {};
    let holidaysPerMonthUS = {};
    let holidaysTypesCA = {};
    let holidaysTypesBR = {};
    let holidaysTypesUS = {};    
  
    // Fetch data for Canada
    const fetchCA = fetch('https://date.nager.at/api/v3/publicholidays/2024/CA')
      .then(response => response.json())
      .then(dataCA => {
//        console.log('Data Canada:', dataCA);
        dataCA.forEach(holiday => {
            const month = new Date(holiday.date).getMonth() + 1;
            holidaysPerMonthCA[month] = (holidaysPerMonthCA[month] || 0) + 1;

            const type = holiday.types || 'Unknown';
            holidaysTypesCA[type] = (holidaysTypesCA[type] || 0) + 1;            
          });
      });
  
    // Fetch data for Brazil
    const fetchBR = fetch('https://date.nager.at/api/v3/publicholidays/2024/BR')
      .then(response => response.json())
      .then(dataBR => {
//        console.log('Data Brazil:', dataBR);
        dataBR.forEach(holiday => {
            const month = new Date(holiday.date).getMonth() + 1;
            holidaysPerMonthBR[month] = (holidaysPerMonthBR[month] || 0) + 1;

            const type = holiday.types || 'Unknown';
            holidaysTypesBR[type] = (holidaysTypesBR[type] || 0) + 1;             
          });
      });
  
    // Fetch data for the United States
    const fetchUS = fetch('https://date.nager.at/api/v3/publicholidays/2024/US')
      .then(response => response.json())
      .then(dataUS => {
//        console.log('Data United States:', dataUS);
        dataUS.forEach(holiday => {
            const month = new Date(holiday.date).getMonth() + 1;
            holidaysPerMonthUS[month] = (holidaysPerMonthUS[month] || 0) + 1;

            const type = holiday.types || 'Unknown';
            holidaysTypesUS[type] = (holidaysTypesUS[type] || 0) + 1;             
          });
      });
  
    // Wait for all fetch requests to complete
    Promise.all([fetchCA, fetchBR, fetchUS])
      .then(() => {
        // Log the JSON data of all fetches outside the function
        console.log('Data Brazil:', holidaysPerMonthBR);        
        console.log('Data Canada:', holidaysPerMonthCA);
        console.log('Data United States:', holidaysPerMonthUS);

        const holidayCountsBR = months.map((month, index) => holidaysPerMonthBR[index + 1] || 0);
        const holidayCountsCA = months.map((month, index) => holidaysPerMonthCA[index + 1] || 0);
        const holidayCountsUS = months.map((month, index) => holidaysPerMonthUS[index + 1] || 0);
/*
        console.log('Data Count Canada:', holidayCountsBR);
        console.log('Data Count Brazil:', holidayCountsCA);
        console.log('Data Count United States:', holidayCountsUS);

        console.log('Data per Type Canada:', holidaysTypesBR);
        console.log('Data per Type Brazil:', holidaysTypesCA);
        console.log('Data per Type United States:', holidaysTypesUS);  
 
        console.log(Object.entries(holidaysTypesBR));
        console.log(Object.entries(holidaysTypesCA));
        console.log(Object.entries(holidaysTypesUS));
 */     
       // =====>>>> Create the BAR chart using Billboard.js   
        const barChart = bb.generate ({
          data: {
              columns: [
               // Add the y values as a data series
               ['Brazil'].concat(holidayCountsBR),
               ['Canada'].concat(holidayCountsCA), 
               ['United States'].concat(holidayCountsUS)
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

//------------------------------------------------------------------------------------
     // =====>>>> Create the LINE chart using Billboard.js
     const lineChart = bb.generate({
        data: {
          columns: [
            // Add the y values as a data series
            ['Brazil'].concat(holidayCountsBR),
            ['Canada'].concat(holidayCountsCA), 
            ['United States'].concat(holidayCountsUS)            
          ]
        },
        axis: {
          // Set x axis categories
          x: {
            type: 'category',
            categories: months
          }
        },
        // Set chart type to line
        type: 'line',
        // Specify the target element for the chart
        bindto: '#lineChart'
      });

//------------------------------------------------------------------------------------
      const typesNameBR = Object.keys(holidaysTypesBR);
      const typesValueBR = Object.values(holidaysTypesBR);      
      typesValueBR.unshift("BR Holidays Types"); 
      
      // =====>>>> Create the BAR chart using Billboard.js        
      const barChart1 = bb.generate ({
        data: {
            columns: [typesValueBR],                                                       
            type: "bar"                  
        },  
        axis: {
            x: {
                type: "category",
                categories: typesNameBR 
             }
          },
          bar: {
            width: {
              ratio: 0.5
            }
          },         
        bindto: "#barChartBR"
      });

      const typesNameCA = Object.keys(holidaysTypesCA);
      const typesValueCA = Object.values(holidaysTypesCA);      
      typesValueCA.unshift("CA Holidays Types"); 
      
      // =====>>>> Create the BAR chart using Billboard.js        
      const barChart2 = bb.generate ({
        data: {
            columns: [typesValueCA],                                                       
            type: "bar"               
        },  
        axis: {
            x: {
                type: "category",
                categories: typesNameCA 
             }
          },
          bar: {
            width: {
              ratio: 0.5
            }
          },         
        bindto: "#barChartCA"
      });

      const typesNameUS = Object.keys(holidaysTypesUS);
      const typesValueUS = Object.values(holidaysTypesUS);      
      typesValueUS.unshift("US Holidays Types"); 
      
      // =====>>>> Create the BAR chart using Billboard.js        
      const barChart3 = bb.generate ({
        data: {
            columns: [typesValueUS],                                                       
            type: "bar"              
        },  
        axis: {
            x: {
                type: "category",
                categories: typesNameUS 
             }
          },
          bar: {
            width: {
              ratio: 0.5
            }
          },         
        bindto: "#barChartUS"
      });


      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });    
            
  }
  
  // Call the function to start the fetches
  fetchData();
  