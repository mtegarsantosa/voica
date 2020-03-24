module.exports = function (plop) {
  plop.setGenerator('router', {
      description: 'make a router',
      prompts: [{
          type: 'input',
          name: 'name',
          message: 'your router name'
      }],
      actions: [
        {
            type: 'add',
            path: 'routers/{{name}}Router.js',
            templateFile: 'templates/Router.hbs'
        },
    ]
  })
}
