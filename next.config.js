
const path = require('path')

/** @type {import('next').NextConfig} */
const nextConfig = {
    sassOptions: {
        includePaths: [path.join(__dirname, 'styles')],
    },
    // compiler: {
    //     styledComponents: true
    // }
}



 
module.exports = {
  
}


module.exports = nextConfig