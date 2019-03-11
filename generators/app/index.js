'use strict';
const Generator = require('yeoman-generator');
const yosay = require('yosay');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
  }

  async prompting() {
    this.log(
      yosay('Welcome to the tf-module generator!')
    );

    this.answers = await this.prompt([{
      type: 'input',
      name: 'name',
      message: 'Enter name for the new terraform module : ',
    }]);
  }

  writing() {
    this.destinationRoot(this.answers.name);

    this.fs.copyTpl(
      `${this.templatePath()}/**/.!(gitignore)*`,
      this.destinationRoot(),
      this.props
    );

    this.fs.copyTpl(
      this.templatePath('.gitignorefile'),
      this.destinationPath(`.gitignore`),
    );

    this.fs.copyTpl(
      `${this.templatePath()}/**/*.tf`,
      this.destinationRoot()
    );

    this.fs.copyTpl(
      `${this.templatePath()}/**/*.go`,
      this.destinationRoot()
    );

    this.fs.copyTpl(
      this.templatePath('_README.md'),
      this.destinationPath('README.md'), {
        name: this.answers.name
      }
    );
  }
};