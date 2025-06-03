const BASE_URL = "http://localhost/redux-in-action-book-api/graphql"

export const graphqlClient = async ({ query, variables }) => {
	const queryAfterRemovingUnnecessaryCharacters = query.replaceAll(/\t|\n/g, " ")
	const response = await fetch(BASE_URL, {
		method: "POST",
		/* 
      A very naive mistake that costed me 30mins of debugging: 
      I wrote the headers object like so: 
      
      headers: {
          body: JSON.stringify({query, variables})
      }
      Totally wrong, totally awful(very bad or unpleasant!
    */
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ query: queryAfterRemovingUnnecessaryCharacters, variables }),
	}).catch((e) => {
		console.log(e)
	})
	// console.log(JSON.stringify({ query }))
	const json = await response.json()
	// console.log(json)

	return json
}
