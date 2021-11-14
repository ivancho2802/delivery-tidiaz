import { 
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    HttpLink,
    from
} from "@apollo/client";

import {onError}from "@apollo/client/link/error"

const errorLink = onError(({graphQLErrors, networkError})=>{
    if(graphQLErrors){
        graphQLErrors.map(({ message }, i, locations) => {
            alert("graphQLErrors"+JSON.stringify(message))
        })
    }
})
const link = from ([
    errorLink,
    new HttpLink({uri: "https://delivery-graphql-tidiaz.herokuapp.com/graphql"})
]);

const client = new ApolloClient({
    cache: new InMemoryCache(),
    link:link
});

function Graphqlindex(){
    return <ApolloProvider client={client}>
        {" "}
        <getUser/>
    </ApolloProvider>; 
}

export default Graphqlindex;


