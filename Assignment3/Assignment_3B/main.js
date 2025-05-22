// IIFE
(() => {

	//Choose an array method to implement for each of the incomplete functions.
	//FOR/WHILE LOOPS OF ANY KIND ARE FORBIDDEN! You must use the available array functions to accomplish your goal.

	//Remember, you can chain together array function calls to attain your goals.
	// Ex: array.filter().map()

	//Get data for the TV Show "Friends"
	fetch('http://api.tvmaze.com/shows/431?embed[]=episodes&embed[]=cast')
    .then((response) => response.json())
    .then((json) => {

        //DO NOT MODIFY THE CODE IN HERE...check the console for your functions' output

        //1 - Create a function called getGuntherCount() which returns the total number of episodes 
        // where the character Gunther is mentioned in the episode summary.

        function getGuntherCount(json) {

            // filtering the episodes played by Gunther         
            let guntherEpisodes = json._embedded.episodes.filter(episode => 
                episode.summary.includes('Gunther'));
            
            // accumulatin to know the number of Gunther's episodes
            let guntherCount = guntherEpisodes.reduce((total, episode) => total + 1, 0);

            return guntherCount;
        }
        console.log('--------------------------------');
        console.log(`Gunther Count: ${getGuntherCount(json)}`);


        //2 - Create a function called getTotalRuntimeMinutes() that totals all runtime minutes for all episodes
        function getTotalRuntimeMinutes(json) {

            // reducing / accumulating the runtime value to the totRuntime variable         
            let totRuntime = json._embedded.episodes.reduce((total, episode) => 
                total + episode.runtime, 0);
            
            return totRuntime;
        }       
        console.log('--------------------------------');
        console.log(`Total Runtime Minutes: ${getTotalRuntimeMinutes(json)}`);


        //3 - Create a function called getDateRangeEpisodeCount() that returns the number of episodes that aired in the year 2000
        function getTotalEpisodesInYear(json, year) {

            // filtering the episodes played at the year passed as a parameter
            // reducing the runtime to the runtimeTotal variable             
            let yearEpisodes = json._embedded.episodes.filter(episode => 
                episode.airdate.includes(year)).reduce((total, episode) => 
                total + 1,0);

            // reducing the runtime to the runtimeTotal variable         
            //let totEpisodes = yearEpisodes.reduce((total, episode) => 
            //    total + 1,0);
            
            return yearEpisodes;
        }       

        console.log('--------------------------------');
        console.log(`Total episodes airing in year 2000: ${getTotalEpisodesInYear(json, "2000")}`);

        //4 - Create a function called getFemaleCastMembers() that returns an array of the names of the female cast members.
        function getFemaleCastMembers(json) {

            // filtering only the female cast and 
            // getting the name of the female cast
            let femaleCast = json._embedded.cast.filter(cast => 
                cast.person.gender === 'Female').map(cast => cast.person.name);
       
            // getting the name of the female cast
            // let femaleNames = femaleCast.map(cast => cast.person.name);

           return femaleCast;
        }       
        console.log('--------------------------------');
        console.log(`Female Cast Members:`);
        console.log(getFemaleCastMembers(json));


        //5 - Create a function called getEpisodeTitles() which returns a list of episode
        //    where the argument string is found in the episode summary.
        function getEpisodeTitles(json, title) {

            // filtering the episodes which contains the piece of information passed by the parameter
            // getting the episodes name with the map method
            let titleEpisodes = json._embedded.episodes.filter(episode => 
                episode.summary.includes(title)).map(episode => episode.name);
            
            //let listEpisodes = titleEpisodes.map(episode => episode.name);

            return titleEpisodes;
        }             
        console.log('--------------------------------');
        console.log(`Episodes that mention Ursula:`);
        console.log(getEpisodeTitles(json, 'Ursula'));

        //6 - Create a function called getCastMembersOver55() which returns a list of cast members
        //    who are currently older than 55 years of age.
        function getCastMembersOver55(json) {

            // filtering the cast person over 55
            let over55Cast = json._embedded.cast.filter(cast => 
            {
                let castBirthday = new Date(cast.person.birthday);
                let today = new Date();
                let castAge = today.getFullYear() - castBirthday.getFullYear();

                return castAge > 55;
            });              
       
            // getting the cast person name
            let castNames = over55Cast.map(cast => cast.person.name);

           return castNames;
        }       
        console.log('--------------------------------');
        console.log(`Cast Members over 55:`);
        console.log(getCastMembersOver55(json));

        //7 - Create a function called getTotalRuntimeMinutesExcludingSeasonSix that gets the total 
        //    runtime minutes for all episodes excluding episodes in season 6
        function getTotalRuntimeMinutesExcludingSeasonSix(json) {
  
            // filtering to remove the season six
            let removeSeasonSix = json._embedded.episodes.filter(episode => episode.season != 6);    

            // reducing to accumulate the total number of episodes
            let totRuntime = removeSeasonSix.reduce((total, episode) => 
                total + episode.runtime, 0);
            
            return totRuntime;
        }         
        console.log('--------------------------------');
        console.log(`Total runtime in minutes excluding Season 6: ${getTotalRuntimeMinutesExcludingSeasonSix(json)}`);


        //8 - Create a function called getFirstFourSeasons that gets the episodes for the first four seasons 
        //    but only return an array of JSON objects containing the season number and episode name
        function getFirstFourSeasons(json) {
  
            // filtering the episodes from seasons 1, 2, 3, and 4.
            let only4Seasons = json._embedded.episodes.filter(episode => episode.season <= 4);  
            
            // getting only the number of the season and the episode name
            let infoSeasons = only4Seasons.map(episode => 
                {return {season: episode.season, name: episode.name}});
            
            return infoSeasons;
        }         
        console.log('--------------------------------');
        console.log(`Episode JSON for first four seasons:`)
        console.log(getFirstFourSeasons(json));


        //9 - Create a function called getEpisodeTallyBySeason that returns an object containing the season name and the total episodes as key:value pairs for each season
        function getEpisodeTallyBySeason(json) {
  
         // map the episodes into an array which contains the season number
        const seasons = json._embedded.episodes.map(episode => episode.season);

        // filtering to remove the duplicate values
        const uniqueSeasons = [...new Set(seasons)];

        // reducing to accumulate the number of episodes for each season
        const episodeTallyBySeason = uniqueSeasons.reduce((tally, season) => {

        // filtering the episodes of the current season.
        const seasonEpisodes = json._embedded.episodes.filter(episode => episode.season === season);

        // getting the number of episodes and set to the tally object
        tally[season] = seasonEpisodes.length;
        
        return tally;

        }, {});

        return episodeTallyBySeason;

        }        
        console.log('--------------------------------');
        console.log(`Tally of episodes by season:`);
        console.log(getEpisodeTallyBySeason(json));

        //10 - Create a funtion called capitalizeTheFriends that transforms the episode JSON data by capitalizing the words Joey, Chandler, Monica, Rachel, Phoebe, and Ross in both 
        //the name and summary of the episodes.
        function capitalizeTheFriends(json) {
  
        // map the episodes and capitalize the words in the episode name and the episode summary
        let episodes = json._embedded.episodes.map(episode => {

            // capitalize the name words
            const capitalizedTitle = episode.name.replace(/\b(Joey|Chandler|Monica|Rachel|Phoebe|Ross)\b/g, match => match.toUpperCase());

            // capitalize the summary words
            const capitalizedSummary = episode.summary.replace(/\b(Joey|Chandler|Monica|Rachel|Phoebe|Ross)\b/g, match => match.toUpperCase());

            // return the episode name and the episody summary
            return {
                //...episode,
                name: capitalizedTitle,
                summary: capitalizedSummary
            };
        });
            
            return episodes;
        } 
        console.log('--------------------------------');
        console.log('Capitalized Friends');
        console.log(capitalizeTheFriends(json));

    })

	// COMPLETE THE FOLLOWING FUNCTIONS BY IMPLEMENTING MAP, REDUCE, OR FILTER 
	// (or a combination) ON THE PROVIDED JSON DATA

	// Define the required ten functions below this line...

})();

