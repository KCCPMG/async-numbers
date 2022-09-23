const BASE_URL = 'http://numbersapi.com/'

/*
Make a request to the Numbers API (http://numbersapi.com/) to get a fact about your favorite number. (Make sure you get back JSON by including the json query key, specific to this API. Details).
*/
async function oneNumber() {
  let res = await axios.get(BASE_URL + '7?json')
  console.log(res.data)
  $("#one-fact-one-number").text(res.data.text)
}

oneNumber();

/*
Figure out how to get data on multiple numbers in a single request. Make that request and when you get the data back, put all of the number facts on the page.
*/

async function multipleNumbers() {
  let res = await axios.get(BASE_URL + '7,11,18,2,10001,2000,6500?json')
  console.log(res.data);
  for (let key of Object.keys(res.data)) {
    $("#one-fact-several-numbers").append(`<p>${res.data[key]}</p>`)
  }

}

multipleNumbers();


/*
Use the API to get 4 facts on your favorite number. Once you have them all, put them on the page. It’s okay if some of the facts are repeats.
*/

async function fourFactsOneNumber() {
  let responses = await Promise.all([
    axios.get(BASE_URL + '7?json'),
    axios.get(BASE_URL + '7?json'),
    axios.get(BASE_URL + '7?json'),
    axios.get(BASE_URL + '7?json')
  ])

  console.log(responses);

  for (let res of responses) {
    $("#four-facts-one-number").append(`<p>${res.data.text}</p>`)
  }
}

fourFactsOneNumber();