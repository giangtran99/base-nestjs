export default function (plop) {
  // controller generator
  plop.setGenerator('controller', {
    description: 'application controller logic',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Type model name :',
      },
    ],
    actions: [
      {
        type: 'modify',
        path: 'src/{{name}}/{{name}}.controller.ts',
        templateFile: 'plop-templates/resource/controller.hbs',
      },
      {
        type: 'modify',
        path: 'src/{{name}}/{{name}}.service.ts',
        templateFile: 'plop-templates/resource/service.hbs',
      },
    ],
  });
}
