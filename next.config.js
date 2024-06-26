
const path = require('path')

/** @type {import('next').NextConfig} */
const nextConfig = {
    sassOptions: {
        includePaths: [path.join(__dirname, 'styles')],
    },
    webpack(config) {
      config.module.rules.push({
        test: /\.svg$/,
        use: ["@svgr/webpack"]
      });
  
      return config;
    },
    
    
    redirects: async ()=>[
        {
          source: '/',
          destination: '/analysis', // Matched parameters can be used in the destination
          permanent: true,
        },
        {
          source: '/analysis',
          destination: '/analysis/channel-performance', // Matched parameters can be used in the destination
          permanent: true,
        },
        {
          source: '/auth',
          destination: '/auth/login', // Matched parameters can be used in the destination
          permanent: true,
        },
      ]

    // compiler: {
    //     styledComponents: true
    // }
}



 
// module.exports = {
  
// }


module.exports = nextConfig