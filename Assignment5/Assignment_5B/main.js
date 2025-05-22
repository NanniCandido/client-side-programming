(() => {
fetch('http://api.tvmaze.com/shows/431?embed[]=episodes&embed[]=cast')
.then(reponse => reponse.json())
.then(json => {

  // ===================== CHART NUMBER 1 ==>> PIE CHART =======================================
    function getGuntherCount(json) {

        // filtering the episodes played by Gunther         
        let guntherEpisodes = json._embedded.episodes.filter(episode => 
            episode.summary.includes('Gunther'));
        let noGuntherEpisodes = json._embedded.episodes.filter(episode => 
            !episode.summary.includes('Gunther') );          
        
        // accumulatin to know the number of Gunther's episodes
        let guntherCount = guntherEpisodes.reduce((total, episode) => total + 1, 0);
        let noGuntherCount = noGuntherEpisodes.reduce((total, episode) => total + 1, 0);      

      // =====>>>> Create the PIE chart using Billboard.js        
        const pieChart = bb.generate ({
            data: {
                columns: [
                    ["Gunther Episodes", guntherCount],
                    ["no-Gunther Episodes", noGuntherCount]                    
                ],
                type: "pie",
            },
            bindto: "#pieChart"
        })

        return guntherCount, noGuntherCount;
    }
    console.log('--------------------------------');
    console.log(`Gunther Count: ${getGuntherCount(json)}`);

// ===================== CHART NUMBER 2 ==>> BAR CHART =======================================    
    function getEpisodeTallyBySeason(json) {
  
        // map the episodes into an array which contains the season number
       const seasons = json._embedded.episodes.map(episode => episode.season);

       // filtering to remove the duplicate values
       const uniqueSeasons = [...new Set(seasons)];

       // starting the block of code >> =======================================  
       // reducing to accumulate the number of episodes for each season
       const episodeTallyBySeason = uniqueSeasons.reduce((tally, season) => {

       // filtering the episodes of the current season.
       const seasonEpisodes = json._embedded.episodes.filter(episode => episode.season === season);

       // getting the number of episodes and set to the tally object
       tally[season] = seasonEpisodes.length;
       return tally;
       }, {}) 
       // ending the block of code >> ======================================= 

       const xList = Object.keys(episodeTallyBySeason);
       const yList = Object.values(episodeTallyBySeason);
     
       yList.unshift("Episodes by Season");    

      // =====>>>> Create the BAR chart using Billboard.js
       const barChart = bb.generate ({
        data: {
            columns: [
               yList                
            ],
            type: "bar",
        },
        axis: {
            x: {
                type: "category",
                categories: xList 
             }
          },
          bar: {
            width: {
              ratio: 0.5
            }
          },
        bindto: "#barChart"
       });    

       return episodeTallyBySeason;

       }        
       console.log('--------------------------------');
       console.log(`Tally of episodes by season:`);
       console.log(getEpisodeTallyBySeason(json));  

// ===================== CHARTS NUMBER 3 AND 4 ==>> LINE CHART AND BAR CHART ================        
       function getMembersNumEpisodes(json) {

//-------------------------------------------------------------------------------------------
        // Rachel Data
        const episodesRachel = Object.entries(json._embedded.episodes.reduce((count, episode) => {
            const seasonNumber = episode.season;
            count[seasonNumber] = (count[seasonNumber] || 0) + (episode.summary.includes('Rachel') ? 1 : 0);
            return count;
        }, {}));

        const getDataRachel = episodesRachel.map(([x, y]) => { 
            return { x: x, y: y };
          });


        // get the number of seasons to be shown for all members
        const xListSeasons = getDataRachel.map(entry => entry.x);

        // get the number of episodes for Rachel
        const yListRachel = getDataRachel.map(entry => entry.y);          
//-------------------------------------------------------------------------------------------
        // Monica Data
        let episodesMonica = Object.entries(json._embedded.episodes.reduce((count, episode) => {
            const seasonNumber = episode.season;
            count[seasonNumber] = (count[seasonNumber] || 0) + (episode.summary.includes('Monica') ? 1 : 0);
            return count;
        }, {}));

        const getDataMonica = episodesMonica.map(([x, y]) => { 
            return { x: x, y: y };
          });

        // get the number of episodes for Monica
        const yListMonica = getDataMonica.map(entry => entry.y);  
//-------------------------------------------------------------------------------------------
        // Phoebe Data        
        let episodesPhoebe = Object.entries(json._embedded.episodes.reduce((count, episode) => {
            const seasonNumber = episode.season;
            count[seasonNumber] = (count[seasonNumber] || 0) + (episode.summary.includes('Phoebe') ? 1 : 0);
            return count;
        }, {}));

        const getDataPhoebe = episodesPhoebe.map(([x, y]) => { 
            return { x: x, y: y };
          });

        // get the number of episodes for Phoebe
        const yListPhoebe = getDataPhoebe.map(entry => entry.y);  
//-------------------------------------------------------------------------------------------
        // Joey Data
        let episodesJoey = Object.entries(json._embedded.episodes.reduce((count, episode) => {
            const seasonNumber = episode.season;
            count[seasonNumber] = (count[seasonNumber] || 0) + (episode.summary.includes('Joey') ? 1 : 0);
            return count;
        }, {}));

        const getDataJoey = episodesJoey.map(([x, y]) => { 
            return { x: x, y: y };
          });

        // get the number of episodes for Joey
        const yListJoey = getDataJoey.map(entry => entry.y);  
//-------------------------------------------------------------------------------------------
        // Chandler Data
        let episodesChandler = Object.entries(json._embedded.episodes.reduce((count, episode) => {
            const seasonNumber = episode.season;
            count[seasonNumber] = (count[seasonNumber] || 0) + (episode.summary.includes('Chandler') ? 1 : 0);
            return count;
        }, {}));

        const getDataChandler = episodesChandler.map(([x, y]) => { 
            return { x: x, y: y };
          });

        // get the number of episodes for Chandler
        const yListChandler = getDataChandler.map(entry => entry.y);  
//-------------------------------------------------------------------------------------------
        // Ross Data
        let episodesRoss = Object.entries(json._embedded.episodes.reduce((count, episode) => {
            const seasonNumber = episode.season;
            count[seasonNumber] = (count[seasonNumber] || 0) + (episode.summary.includes('Ross') ? 1 : 0);
            return count;
        }, {}));      
   
        const getDataRoss = episodesRoss.map(([x, y]) => { 
            return { x: x, y: y };
          });

        // get the number of episodes for Ross
        const yListRoss = getDataRoss.map(entry => entry.y);                         


      // =====>>>> Create the LINE chart using Billboard.js
      const lineChart = bb.generate({
        data: {
          columns: [
            // Add the y values as a data series
            ['Rachel', ...yListRachel], 
            ['Monica',...yListMonica], 
            ['Phoebe',...yListPhoebe], 
            ['Joey',...yListJoey], 
            ['Chandler',...yListChandler], 
            ['Ross',...yListRoss]
          ]
        },
        axis: {
          // Set x axis categories
          x: {
            type: 'category',
            categories: xListSeasons
          }
        },
        // Set chart type to line
        type: 'line',
        // Specify the target element for the chart
        bindto: '#lineChart'
      });
   
      // =====>>>> Create the BAR chart using Billboard.js      
      const barChart = bb.generate ({
       data: {
           columns: [
            // Add the y values as a data series
            ['Rachel', ...yListRachel], 
            ['Monica',...yListMonica], 
            ['Phoebe',...yListPhoebe], 
            ['Joey',...yListJoey], 
            ['Chandler',...yListChandler], 
            ['Ross',...yListRoss]
          ],
           type: "bar",
       },
       axis: {
           x: {
               type: "category",
               categories: xListSeasons 
            }
         },
         bar: {
           width: {
             ratio: 0.5
           }
         },
       bindto: "#barChart4"
      });   

          setTimeout(function() {
              lineChart.load({
                  columns: [
                    // Add the y values as a data series
                    ['Rachel', ...yListRachel], 
                    ['Monica',...yListMonica], 
                    ['Phoebe',...yListPhoebe], 
                    ['Joey',...yListJoey], 
                    ['Chandler',...yListChandler], 
                    ['Ross',...yListRoss]
                  ]
              });
          }, 5000);  
          
        return xListSeasons;

    }             
    console.log('--------------------------------');
    console.log(`Episodes that mention each character:`);
    console.log(getMembersNumEpisodes(json));  
    
// ===================== CHART NUMBER 5 ==>> BAR CHART =======================================     
    function getCastMembersAges(json) {

        // filtering the cast info
        let castInfo = json._embedded.cast.map(cast => ({
            name: cast.person.name,
            // Calculate age based on birthday
            age: calculateAge(cast.person.birthday)
          }));

        // get the number of seasons to be shown for all members
        const xListNames = castInfo.map(entry => entry.name);

        // get the number of episodes for Rachel
        const yListAges = castInfo.map(entry => entry.age);        
        
        yListAges.unshift("Cast Members Ages");         
         
      // =====>>>> Create the BAR chart using Billboard.js
        const barChart = bb.generate ({
        data: {
            columns: [yListAges],
            type: "bar",
        },
        axis: {
            x: {
                type: "category",
                categories: xListNames 
             }
          },
          bar: {
            width: {
              ratio: 0.5
            }
          },
        bindto: "#barChart2"
       });    

     return castInfo;

    }       
    console.log('--------------------------------');
    console.log(`Cast Members Ages:`);
    console.log(getCastMembersAges(json));

    // Function to calculate age from birthday
    function calculateAge(birthday) {

    const today = new Date();
    const birthDate = new Date(birthday);
    let castAge = today.getFullYear() - birthDate.getFullYear();

    return castAge;
  }

// ===================== CHART NUMBER 6 ==>> BAR CHART ======================================= 
  function getCastMembersGender(json) {

    const castMembers = json._embedded.cast;

    // Use reduce to count male and female members and calculate total count
    const { maleCount, femaleCount, totalCount } = castMembers.reduce((counts, cast) => {
        if (cast.person.gender === 'Male') {
          counts.maleCount++;
        } else if (cast.person.gender === 'Female') {
          counts.femaleCount++;
        }
        return counts;
      }, { maleCount: 0, femaleCount: 0, totalCount: 6 });

    // Calculate the percentage of male and female members
    const malePerc = (maleCount / totalCount) * 100;
    const femalePerc = (femaleCount / totalCount) * 100;
              
    // =====>>>> Create the BAR chart using Billboard.js
    const barChart = bb.generate ({
    data: {
        columns: [
            ['% Female', femalePerc],
            ['% Male', malePerc]            
                ],
        type: "bar",
    },
      bar: {
        width: {
          ratio: 0.5
        }
      },
    bindto: "#barChart3"
   });    

 return castMembers;
}       
console.log('--------------------------------');
console.log(`Cast Members Gender:`);
console.log(getCastMembersGender(json));

   })

})();