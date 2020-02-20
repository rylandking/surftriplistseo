let ssDescriptions = document.querySelector('#spot-descriptions');
let surfSpotRef = db.collection('surf-spot').doc('pipeline');

const setSurfSpotNote = doc => {
  let data = doc.data();
  let ssName = doc.id
    .replace(/-/g, ' ')
    .toLowerCase()
    .split(' ')
    .map(s => s.charAt(0).toUpperCase() + s.substring(1))
    .join(' ');
  let ssNameContraction;
  let skill = data.skill;
  let waveDir = data.direction;
  let waveType = data.type;
  let period = data.period;
  let swellDir = data.swellDir;
  let waveSize = data.size;
  let windDir = data.wind;
  let tide = data.tide;
  let stars = data.quality;
  let starDesc;
  let jan = data.jan;
  let feb = data.feb;
  let mar = data.mar;
  let apr = data.apr;
  let may = data.may;
  let jun = data.jun;
  let jul = data.jul;
  let aug = data.aug;
  let sep = data.sep;
  let oct = data.oct;
  let nov = data.nov;
  let dec = data.dec;
  let bestMonths = [];
  let bestMonthsPhrase;
  let video = data.video;
  let youTubeID;
  let videoEmbed;
  let videoSearchURL;
  let videoPhrase;
  let surfReport = data.forecast;

  // Set surf spot contraction
  if (ssName.endsWith('s')) {
    ssNameContraction = `${ssName}'`;
  } else {
    ssNameContraction = `${ssName}'s`;
  }

  // Set skill phrase
  if (skill === 'beginner') {
    skillPhrase = `a ${skill}`;
  } else {
    skillPhrase = `an ${skill}`;
  }

  // Set waveDir phrase
  if (waveDir === 'both') {
    waveDir = `right and left `;
  }

  // Set period phrase
  if (period === '7-10 sec') {
    period = '7 to 10 second';
  } else if (period === '10-13 sec') {
    period = '10 to 13 second';
  } else if (period === '13-16 sec') {
    period = '13 to 16 second';
  } else {
    period = '16+ seconds';
  }

  // Set period phrase
  if (swellDir === 'W') {
    swellDir = 'West';
  } else if (swellDir === 'SW') {
    swellDir = 'Southwest';
  } else if (swellDir === 'S') {
    swellDir = 'South';
  } else if (swellDir === 'SE') {
    swellDir = 'Southeast';
  } else if (swellDir === 'E') {
    swellDir = 'East';
  } else if (swellDir === 'NE') {
    swellDir = 'Northeast';
  } else if (swellDir === 'N') {
    swellDir = 'North';
  } else if (swellDir === 'NW') {
    swellDir = 'Northwest';
  }

  // Set wave size phrase
  if (waveSize === '2-4 ft') {
    waveSize = '2 to 4 feet';
  } else if (waveSize === '3-5 ft') {
    waveSize = '3 to 5 feet';
  } else if (waveSize === '5-7 ft') {
    waveSize = '5 to 7 feet';
  } else if (waveSize === '8-10 ft+') {
    waveSize = '8 to 10 feet and bigger';
  } else if (waveSize === '8-10+ ft') {
    waveSize = '8 to 10 feet and bigger';
  }

  // Set wind phrase
  if (windDir === 'W') {
    windDir = 'West';
  } else if (windDir === 'SW') {
    windDir = 'Southwest';
  } else if (windDir === 'S') {
    windDir = 'South';
  } else if (windDir === 'SE') {
    windDir = 'Southeast';
  } else if (windDir === 'E') {
    windDir = 'East';
  } else if (windDir === 'NE') {
    windDir = 'Northeast';
  } else if (windDir === 'N') {
    windDir = 'North';
  } else if (windDir === 'NW') {
    windDir = 'Northwest';
  }

  // Set tide phrase
  if (tide === 'all') {
    tide = 'any';
  }

  // Set stars phrase
  if (stars === '1 star') {
    stars = '1';
    starDesc = 'for the desperate';
  } else if (stars === '2 Stars') {
    stars = '2';
    starDesc = 'a good time if you need to get wet';
  } else if (stars === '3 Stars') {
    stars = '3';
    starDesc = 'pretty fun';
  } else if (stars === '4 Stars') {
    stars = '4';
    starDesc = 'insanely fun';
  } else if (stars === '5 Stars') {
    stars = '5';
    starDesc = 'world class';
  }

  // Set best months phrase
  if (jan === 100) {
    jan = 'January';
    bestMonths.push(jan);
  } else {
    jan = '';
  }

  if (feb === 100) {
    feb = 'Febuary';
    bestMonths.push(feb);
  } else {
    feb = '';
  }

  if (mar === 100) {
    mar = 'March';
    bestMonths.push(mar);
  } else {
    mar = '';
  }

  if (apr === 100) {
    apr = 'April';
    bestMonths.push(apr);
  } else {
    apr = '';
  }

  if (may === 100) {
    may = 'May';
    bestMonths.push(may);
  } else {
    may = '';
  }

  if (jun === 100) {
    jun = 'June';
    bestMonths.push(jun);
  } else {
    jun = '';
  }

  if (jul === 100) {
    jul = 'July';
    bestMonths.push(jul);
  } else {
    jul = '';
  }

  if (aug === 100) {
    aug = 'August';
    bestMonths.push(aug);
  } else {
    aug = '';
  }

  if (sep === 100) {
    sep = 'September';
    bestMonths.push(sep);
  } else {
    sep = '';
  }

  if (oct === 100) {
    oct = 'October';
    bestMonths.push(oct);
  } else {
    oct = '';
  }

  if (nov === 100) {
    nov = 'November';
    bestMonths.push(nov);
  } else {
    nov = '';
  }

  if (dec === 100) {
    dec = 'December';
    bestMonths.push(dec);
  } else {
    dec = '';
  }

  if (bestMonths.length === 0) {
    bestMonthsPhrase = 'is not available';
  } else if (bestMonths.length === 1) {
    bestMonthsPhrase = `is in ${bestMonths[0]}`;
  } else if (bestMonths.length === 2) {
    bestMonthsPhrase = `is in ${bestMonths[0]} or ${bestMonths[1]}`;
  } else if (bestMonths.length === 3) {
    bestMonthsPhrase = `is in ${bestMonths[0]}, ${bestMonths[1]}, or ${bestMonths[2]}`;
  } else if (bestMonths.length === 4) {
    bestMonthsPhrase = `is in ${bestMonths[0]}, ${bestMonths[1]}, ${bestMonths[2]}, or ${bestMonths[3]}`;
  } else if (bestMonths.length === 5) {
    bestMonthsPhrase = `is in ${bestMonths[0]}, ${bestMonths[1]}, ${bestMonths[2]}, ${bestMonths[3]} or ${bestMonths[4]}`;
  } else if (bestMonths.length === 6) {
    bestMonthsPhrase = `is in ${bestMonths[0]}, ${bestMonths[1]}, ${bestMonths[2]}, ${bestMonths[3]}, ${bestMonths[4]} or ${bestMonths[5]}`;
  } else if (bestMonths.length === 7) {
    bestMonthsPhrase = `is in ${bestMonths[0]}, ${bestMonths[1]}, ${bestMonths[2]}, ${bestMonths[3]}, ${bestMonths[4]}, ${bestMonths[5]} or  ${bestMonths[6]}`;
  } else if (bestMonths.length === 8) {
    bestMonthsPhrase = `is in ${bestMonths[0]}, ${bestMonths[1]}, ${bestMonths[2]}, ${bestMonths[3]}, ${bestMonths[4]}, ${bestMonths[5]}, ${bestMonths[6]} or ${bestMonths[7]}`;
  } else if (bestMonths.length === 9) {
    bestMonthsPhrase = `is in ${bestMonths[0]}, ${bestMonths[1]}, ${bestMonths[2]}, ${bestMonths[3]}, ${bestMonths[4]}, ${bestMonths[5]}, ${bestMonths[6]}, ${bestMonths[7]} or ${bestMonths[8]}`;
  } else if (bestMonths.length === 10) {
    bestMonthsPhrase = `is in ${bestMonths[0]}, ${bestMonths[1]}, ${bestMonths[2]}, ${bestMonths[3]}, ${bestMonths[4]}, ${bestMonths[5]}, ${bestMonths[6]}, ${bestMonths[7]}, ${bestMonths[8]} or ${bestMonths[9]}`;
  }

  // Set video phrase
  if (video) {
    if (video.includes('youtu.be')) {
      youTubeID = video.split('.be/')[1];
      youTubeID = youTubeID.split('?')[0];
    } else {
      youTubeID = video.split('v=')[1];
    }

    videoEmbed = `<iframe class="mb-2" width="560" height="315" src="https://www.youtube-nocookie.com/embed/${youTubeID}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>`;

    videoSearchURL = `https://www.google.com/search?q=${ssName}&tbm=vid`;

    videoPhrase = `
      <p class="mb-2">Watch this video of ${ssNameContraction} surf to get a better feel for what the waves are like.</p>
      ${videoEmbed}
      <p class="mb-2"> Remember, this is just one day. Always check the surf report before going. You can <a href="${videoSearchURL}" target="_blank">watch other videos of ${ssNameContraction} surf here</a>.</p>
    `;
  } else {
    videoSearchURL = `https://www.google.com/search?q=${ssName}&tbm=vid`;

    videoPhrase = `
      <p class="mb-2">You can <a href="${videoSearchURL}" target="_blank">watch videos of ${ssName}'s surf here</a>.</p>
    `;
  }

  ssDescription = `
    <h2 class="text-xl mb-5"><strong>${ssName}</strong></h2>
    
    <p class="mb-2">${ssNameContraction} surf is ${skillPhrase} ${waveDir} ${waveType} break.</p>
    
    <p class="mb-2">The waves are at their best with a ${period} ${swellDir} swell at around ${waveSize}. If you get it with a light ${windDir} wind at ${tide} tide, it’ll be close to as good as it gets. It’s a ${stars} star surf spot, so that means the surf would be ${starDesc} for ${skill} surfers.</p>
    
    <p class="mb-2">The best time to surf ${ssName} ${bestMonthsPhrase}.</p>

    <p class="mb-2">${videoPhrase}</p>

    <p class="mb-2">You can <a href="${surfReport}" target="_blank">find ${ssNameContraction} surf report and surf forecast here.</a></p>

    <p class="mb-2">To learn where to surf in ${ssNameContraction} line up, check out our surf map below which shows all of ${ssNameContraction} surf spots or breaks.</p>

    <p class="mb-2">Get Google Maps directions right to ${ssNameContraction} parking lot by clicking the “Get Directions” button.
    </p>
    <p class="mb-2">Get information about the surf spots nearby ${ssName} in the sidebar (below on mobile) or on our surf map page.</p>
  `;

  ssDescriptions.innerHTML = `${ssDescription}`;
};

// Get Surf Spot
surfSpotRef
  .get()
  .then(function(doc) {
    if (doc.exists) {
      setSurfSpotNote(doc);
    } else {
      console.log('No such document!');
    }
  })
  .catch(function(error) {
    console.log('Error getting document:', error);
  });
