module.exports = {
  apps : [{
    name: 'api-area',
    script: 'dist/src/server.js',
    watch: ['dist/src/'],
    ignore_watch: ['./server.log', './server-combined.log']
  }], 
  deploy : {
    production : {
      user : 'nero_f',
      host : '34.107.103.52',
      ref  : 'origin/master',
      repo : 'git@github.com:EpitechIT2020/B-YEP-500-BDX-5-1-area-fahad.assoumani.git',
      path : '/home/nero_f',
      'pre-deploy-local': '',
      'post-deploy' : 'npm install --production && pm2 reload ecosystem.config.js --env production',
      'pre-setup': ''
    }
  }
};
