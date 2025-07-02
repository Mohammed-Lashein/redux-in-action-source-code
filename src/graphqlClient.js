const BASE_URL = "http://localhost/redux-in-action-book-api/graphql"

export const graphqlClient = async ({ query, variables }) => {
	const queryAfterRemovingUnnecessaryCharacters = query.replaceAll(/\t|\n/g, " ")
	try {
		let res = await fetch(BASE_URL, {
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
		})
		// console.log("this is res!")
		// console.log(res)

		res = await res.json()
		// console.log(res)

		return {
			data: res.data,
			error: null,
		}
	} catch (error) {
		console.log(error)
		return {
			data: null,
			error: {
				message: error.message,
			},
		}
	}
}
