//This utility is for cleaning up data received from the firstwatch.gov fish API. Axios will send JSON-like data object from index.js. This object is made up of key:value pairs. The value that is paired with each key is often comprised of junk HTML used to format the First Watch webpage. cleanFish.js strips away that junk html and returns an object of validated and scrubbed data ready for server side consumption.

const cleanfish = function(fishData){
  const {Habitat, Location, Population} = fishData;
  const nodes = [];
  nodes.push(Habitat,Location,Population);
  const strings = [];
  
    nodes.forEach(node => {
      var newString = (node.replace(/<[^>]*>/g, '')).replace(/\r?\n|\r/g, '');
      strings.push(newString);
    });
  
  const fishFacts = {habitat : strings[0], location : strings[1], population : strings[2]};

  return(fishFacts);
  
}
  

module.exports = cleanfish;
