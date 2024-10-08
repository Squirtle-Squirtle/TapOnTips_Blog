// API_NOTIFICATION_MESSAGES

export const API_NOTIFICATION_MESSAGES =
{
    loading: {
        title: 'Loading...',
        message: 'Data is being loaded, Please wait...'
    },
    success: {
        title: 'success',
        message: 'Data sucessfully loaded'
    },
    responseFailure: {
        title: 'Error',
        message: 'An Error occured while fetching response from the server, Please try again!'
    },
    requestFailure: {
        title: 'Error',
        message: 'An error occured while parsing a request data'
    },
    networkError: {
        title: 'Error',
        message: 'Unable to connect with the server, Please check the internet connectivity and try again'
    }

}

//API SERVICE CALL
//SAMPLE REQUEST
//NEED SERVICE CALL: {url: '\', method: POST/GET/PUT/DELETE params: true/false, query:true/false} 

export const SERVICE_URLS = {
    userSignup: { url: '/signup', method: 'POST' ,responseType: 'json'},
    userLogin: { url: '/login', method: 'POST' ,responseType: 'json'}
}