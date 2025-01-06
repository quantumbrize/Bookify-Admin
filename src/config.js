let env = 'dev'

export const config = {
   frontEndBaseUrl : env === 'prod' ? '' : 'http://localhost:3000/',
   backEndBaseUrl : env === 'prod' ? '' : 'http://localhost:5000/',
   placeHolderImage : 'uploads/placeholder/placeholder.jpg'
}