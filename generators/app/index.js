'use strict';
const Generator = require('yeoman-generator');
const yosay = require('yosay');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
  }

  async prompting() {
    this.log(
      yosay('Welcome to the tf-module generator v0.4.0!')
    );

    this.answers = await this.prompt([{
        type: 'input',
        name: 'name',
        message: 'Enter name for the new terraform module : ',
      },
      {
        type: 'input',
        name: 'description',
        message: 'Enter description for the new terraform module : ',
      },
      {
        type: 'input',
        name: 'author',
        message: 'Enter author name : ',
      },
      {
        type: 'list',
        name: 'tfVersion',
        message: 'Choose terraform version',
        choices: [{
            name: '0.12',
            value: '12',
            checked: true
          },
          {
            name: '0.11',
            value: '11'
          },
        ]
      },
      {
        type: 'list',
        name: 'testFramework',
        message: 'Choose test framework',
        choices: [{
            name: 'Terratest',
            value: '1',
            checked: true
          },
          {
            name: 'kitchen-terraform',
            value: '2'
          },
        ]
      }
    ]);
  }

  writing() {
    this.destinationRoot(this.answers.name);

    this.fs.copyTpl(
      `${this.templatePath()}/.!(gitignorefile|gitattributesfile|pre-commit-config|terraform-version)*`,
      this.destinationRoot(),
      this.props
    );

    this.fs.copyTpl(
      this.templatePath('.gitignorefile'),
      this.destinationPath(`.gitignore`), {
        testFramework: this.answers.testFramework
      }
    );

    this.fs.copyTpl(
      this.templatePath('.gitattributesfile'),
      this.destinationPath(`.gitattributes`), {
        testFramework: this.answers.testFramework
      }
    );

    this.fs.copyTpl(
      this.templatePath('.pre-commit-config.yaml'),
      this.destinationPath(`.pre-commit-config.yaml`), {
        testFramework: this.answers.testFramework
      }
    );

    this.fs.copyTpl(
      this.templatePath('.terraform-version'),
      this.destinationPath(`.terraform-version`), {
        tfVersion: this.answers.tfVersion
      }
    );

    this.fs.copyTpl(
      `${this.templatePath()}/**/*.tf`,
      this.destinationRoot()
    );

    if (this.answers.testFramework === '1') {
      this.fs.copyTpl(
        `${this.templatePath()}/test/terratest/*.go`,
        `${this.destinationRoot()}/test`
      );
    } else {
      this.fs.copyTpl(
        `${this.templatePath()}/test/kitchen-terraform/.*`,
        this.destinationRoot()
      );
      this.fs.copyTpl(
        `${this.templatePath()}/test/kitchen-terraform/**/*`,
        this.destinationRoot()
      );
    }

    this.fs.copyTpl(
      this.templatePath('_README.md'),
      this.destinationPath('README.md'), {
        name: this.answers.name,
        description: this.answers.description,
        author: this.answers.author,
        testFramework: this.answers.testFramework
      }
    );
  }
};