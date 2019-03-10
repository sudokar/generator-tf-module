'use strict';
const Generator = require('yeoman-generator');
const yosay = require('yosay');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
  }
  start() {
    this.log(
      yosay('Welcome to the terraform-module generator!')
    );

    this.prompt([{
      type: 'input',
      name: 'name',
      message: 'Enter a name for the terraform module : ',
      validate: input => input.length > 0
    }]).then((answers) => {
      this.destinationRoot(answers.name);
    }).then(() => {
      this.fs.copy(
        this.templatePath('**/*'),
        this.destinationRoot()
      );

      this.fs.copy(
        this.templatePath('.*'),
        this.destinationRoot()
      );
    });
  }
};