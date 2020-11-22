'use strict';
const Generator = require('yeoman-generator');
const homedir = require('os').homedir();
const path = require('path');
const yosay = require('yosay');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
    this.argument("state-path", { type: String, required: true });
  }

  initializing() {
    this.log("Reading home directory .yo-rc.json");
    const homedirYoRc = path.join(homedir, ".yo-rc.json");
    this.homedirConfig = this.createStorage(homedirYoRc);
  }

  async prompting() {
    this.log(
      yosay('Adrienne would like to share some Terraform with you!')
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
        choices: [
          {
            name: '0.14.0-rc1',
            value: '14',
            checked: true
          },
          {
            name: '0.13',
            value: '13'
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
    var homeDirValues = this.homedirConfig.get("generator-tf-module")

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
      this.destinationRoot(), {
        tfVersion: this.answers.tfVersion,
        backendGcsBucket: homeDirValues.backendGcsBucket,
        backendGcsPrefix: this.options["state-path"]
      }
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
